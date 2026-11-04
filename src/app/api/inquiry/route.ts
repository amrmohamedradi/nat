import { Resend } from "resend";
import { z } from "zod";
import { buildInquiryEmail } from "@/lib/email/inquiry-email";
import {
  HONEYPOT_FIELD,
  FILL_MS_FIELD,
  MIN_FILL_MS,
  inquirySchema,
  type InquiryField,
  type InquiryResponse,
} from "@/lib/inquiry-schema";
import { createRateLimiter } from "@/lib/rate-limit";

// POST /api/inquiry — validates an inquiry and emails it to Nat via Resend.
// Runs on the Node.js runtime (the default; `export const runtime` is not
// allowed with cacheComponents).

const MAX_BODY_BYTES = 20 * 1024;
const SUBJECT = "New Client Inquiry — Nat.";

// Best-effort, per server instance (in-memory; not shared across instances,
// reset on restart). Counts only valid submissions that would send an email.
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

function reply(body: InquiryResponse, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

// Site-wide backstop so spoofed IPs can't flood the inbox / Resend quota.
const globalLimiter = createRateLimiter({ limit: 30, windowMs: 10 * 60 * 1000 });

// x-real-ip is set by the platform (Vercel, most proxies) and can't be forged by
// the client. Otherwise use the right-most X-Forwarded-For entry — the one added
// by the proxy closest to us — never the client-controlled left-most entry.
function clientIp(request: Request) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",").map((s) => s.trim()).filter(Boolean);
  return forwarded?.at(-1) || "unknown";
}

/** Reads the body as text, aborting once it exceeds `limit` bytes (covers chunked bodies too). */
async function readBodyLimited(request: Request, limit: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

export async function POST(request: Request) {
  // 1. Size + JSON parsing.
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return reply({ ok: false, error: "That message is too large to send." }, 413);
  }

  let raw: string | null;
  try {
    raw = await readBodyLimited(request, MAX_BODY_BYTES);
  } catch {
    return reply({ ok: false, error: "We couldn't read your request. Please try again." }, 400);
  }
  if (raw === null) {
    return reply({ ok: false, error: "That message is too large to send." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return reply({ ok: false, error: "Invalid request. Please refresh the page and try again." }, 400);
  }

  // 2. Spam checks. A filled honeypot gets a silent fake success so bots learn nothing.
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return reply({ ok: true });
  }

  const fillMs = Number(body[FILL_MS_FIELD]);
  if (!Number.isFinite(fillMs) || fillMs < MIN_FILL_MS) {
    return reply(
      { ok: false, error: "That was a little too quick — please take a moment and try sending again." },
      400,
    );
  }

  // 3. Validation (authoritative; the client runs the same schema).
  const result = inquirySchema.safeParse(body);
  if (!result.success) {
    const flat = z.flattenError(result.error).fieldErrors as Partial<Record<InquiryField, string[]>>;
    const fieldErrors: Partial<Record<InquiryField, string>> = {};
    for (const [field, messages] of Object.entries(flat) as [InquiryField, string[] | undefined][]) {
      if (messages?.[0]) fieldErrors[field] = messages[0];
    }
    return reply({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, 400);
  }

  // 4. Configuration (checked before rate limiting so a misconfigured site doesn't burn slots).
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "[inquiry] Email is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
    );
    return reply(
      { ok: false, error: "Email service is not configured yet. Please reach out on Instagram." },
      500,
    );
  }

  // 5. Rate limit (per IP, then site wide).
  const limit = limiter.check(clientIp(request));
  const global = limit.ok ? globalLimiter.check("all") : limit;
  if (!global.ok) {
    return reply(
      { ok: false, error: "You've sent a few inquiries already. Please wait a few minutes and try again." },
      429,
      { "Retry-After": String(Math.max(1, Math.ceil(global.retryAfterMs / 1000))) },
    );
  }

  // 6. Send.

  const inquiry = result.data;
  const { html, text } = buildInquiryEmail(inquiry, new Date());

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      replyTo: inquiry.email,
      subject: SUBJECT,
      html,
      text,
    });
    if (error) {
      console.error("[inquiry] Resend error:", error.name, error.message);
      return reply(
        { ok: false, error: "We couldn't send your inquiry right now. Please try again shortly or reach out on Instagram." },
        502,
      );
    }
  } catch (err) {
    console.error("[inquiry] Failed to reach Resend:", err);
    return reply(
      { ok: false, error: "We couldn't send your inquiry right now. Please try again shortly or reach out on Instagram." },
      502,
    );
  }

  return reply({ ok: true });
}
