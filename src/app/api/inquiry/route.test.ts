import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Resend is the external boundary: mock it so no real email is ever sent.
const send = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn(function Resend() {
    return { emails: { send } };
  }),
}));

const validBody = {
  fullName: "Test Client",
  instagram: "@test.client",
  email: "test@example.com",
  service: "branding-packaging",
  message: "Hi Nat",
  fillMs: 9000,
};

let ipCounter = 0;

function post(body: unknown, init: { raw?: string; ip?: string; headers?: Record<string, string> } = {}) {
  return new Request("http://localhost/api/inquiry", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // A fresh IP per request so tests don't trip the per-IP rate limit.
      "x-real-ip": init.ip ?? `10.0.0.${++ipCounter}`,
      ...init.headers,
    },
    body: init.raw ?? JSON.stringify(body),
  });
}

async function loadRoute() {
  vi.resetModules(); // fresh in-memory rate limiters per test
  return import("./route");
}

describe("POST /api/inquiry", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({ data: { id: "email_1" }, error: null });
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("CONTACT_TO_EMAIL", "nat@example.com, team@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Nat. Website <hello@example.com>");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("sends a valid inquiry to Nat and returns ok", async () => {
    const { POST } = await loadRoute();

    const res = await POST(post(validBody));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    const email = send.mock.calls[0][0];
    expect(email.subject).toBe("New Client Inquiry — Nat.");
    expect(email.to).toEqual(["nat@example.com", "team@example.com"]);
    expect(email.from).toBe("Nat. Website <hello@example.com>");
    expect(email.replyTo).toBe("test@example.com");
    expect(email.text).toContain("Instagram: @test.client");
  });

  it("returns field errors and sends nothing when the data is invalid", async () => {
    const { POST } = await loadRoute();

    const res = await POST(post({ ...validBody, email: "nope", service: "unknown" }));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.fieldErrors).toMatchObject({
      email: "Please enter a valid email address.",
      service: "Please choose a service.",
    });
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects a body that is not JSON", async () => {
    const { POST } = await loadRoute();

    const res = await POST(post(null, { raw: "hello" }));

    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects a body larger than 20 KB", async () => {
    const { POST } = await loadRoute();

    const res = await POST(post({ ...validBody, message: "x".repeat(25_000) }));

    expect(res.status).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });

  it("silently accepts but never sends when the honeypot is filled", async () => {
    const { POST } = await loadRoute();
    const { HONEYPOT_FIELD } = await import("@/lib/inquiry-schema");

    const res = await POST(post({ ...validBody, [HONEYPOT_FIELD]: "https://spam.example" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    ["filled in too quickly", 100],
    ["missing the fill time", undefined],
  ])("rejects a submission %s", async (_label, fillMs) => {
    const { POST } = await loadRoute();

    const res = await POST(post({ ...validBody, fillMs }));

    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/too quick/);
    expect(send).not.toHaveBeenCalled();
  });

  it("never fakes success when email is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const { POST } = await loadRoute();

    const res = await POST(post(validBody));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      ok: false,
      error: "Email service is not configured yet. Please reach out on Instagram.",
    });
    expect(send).not.toHaveBeenCalled();
  });

  it("returns a friendly 502 without leaking details when Resend reports an error", async () => {
    send.mockResolvedValue({ data: null, error: { name: "validation_error", message: "secret detail" } });
    const { POST } = await loadRoute();

    const res = await POST(post(validBody));
    const body = await res.json();

    expect(res.status).toBe(502);
    expect(body.ok).toBe(false);
    expect(JSON.stringify(body)).not.toContain("secret detail");
  });

  it("returns 502 when Resend cannot be reached", async () => {
    send.mockRejectedValue(new Error("network down"));
    const { POST } = await loadRoute();

    const res = await POST(post(validBody));

    expect(res.status).toBe(502);
    expect(JSON.stringify(await res.json())).not.toContain("network down");
  });

  it("rate limits a sixth send from the same IP within ten minutes", async () => {
    const { POST } = await loadRoute();
    for (let i = 0; i < 5; i++) {
      expect((await POST(post(validBody, { ip: "203.0.113.9" }))).status).toBe(200);
    }

    const res = await POST(post(validBody, { ip: "203.0.113.9" }));

    expect(res.status).toBe(429);
    expect(Number(res.headers.get("retry-after"))).toBeGreaterThan(0);
    expect(send).toHaveBeenCalledTimes(5);
  });

  it("keys the rate limit on the proxy-added IP, not a spoofable X-Forwarded-For entry", async () => {
    const { POST } = await loadRoute();
    const spoofed = (n: number) => ({
      headers: { "x-real-ip": "", "x-forwarded-for": `1.1.1.${n}, 198.51.100.7` },
    });
    for (let i = 0; i < 5; i++) await POST(post(validBody, spoofed(i)));

    const res = await POST(post(validBody, spoofed(99)));

    expect(res.status).toBe(429);
  });
});
