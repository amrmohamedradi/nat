"use client";

import { ArrowRight, Check, CircleAlert, LoaderCircle } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/Button";
import { NOT_SURE_ID, NOT_SURE_TITLE, getServiceTitle, services, type ServiceAccent } from "@/data/services";
import {
  HONEYPOT_FIELD,
  FILL_MS_FIELD,
  inquirySchema,
  normalizeInstagram,
  type InquiryField,
  type InquiryResponse,
} from "@/lib/inquiry-schema";
import { site } from "@/data/site";
import { SELECT_SERVICE_EVENT } from "@/lib/select-service";

type TextField = Exclude<InquiryField, "services">;
type Values = Record<TextField, string> & { services: string[] };
type Errors = Partial<Record<InquiryField, string>>;
type Status = "idle" | "submitting" | "success";

const MESSAGE_MAX = 3000;
const FIELD_ORDER: InquiryField[] = ["fullName", "instagram", "email", "services", "message"];
const EMPTY: Values = { fullName: "", instagram: "", email: "", services: [], message: "" };

const isEmpty = (v: string | string[]) => (Array.isArray(v) ? v.length === 0 : !v);

/**
 * Toggle one service in a selection. "Not sure yet" stands alone: choosing it clears the
 * others, and choosing any service clears it.
 */
function toggleService(current: string[], id: string, on: boolean): string[] {
  if (id === NOT_SURE_ID) return on ? [NOT_SURE_ID] : [];
  const rest = current.filter((s) => s !== id && s !== NOT_SURE_ID);
  return on ? [...rest, id] : rest;
}
const GENERIC_ERROR = "Something went wrong while sending. Please try again, or reach out on Instagram.";

function validate(values: Values): Errors {
  const result = inquirySchema.safeParse(values);
  if (result.success) return {};
  const errors: Errors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as InquiryField;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}

// Shared control styles: 16px+ text (no iOS zoom), 52px tall, brand focus ring.
const control =
  "w-full rounded-xl bg-field text-base text-ink caret-pink-deep placeholder:text-ink-soft/80 ring-1 ring-inset ring-ink/60 " +
  "transition-[box-shadow,background-color] duration-200 ease-(--ease-out-quart) outline-none " +
  "hover:ring-ink/80 focus-visible:ring-2 focus-visible:ring-pink-deep focus-visible:shadow-halo " +
  "aria-invalid:ring-pink-deep/70 aria-invalid:bg-pink/[0.04]";

const label = "mb-2 block text-sm font-medium text-ink";

// Selected service chips take that service's pastel (static class names so Tailwind sees them).
const accentChecked: Record<ServiceAccent, string> = {
  butter: "has-checked:bg-butter",
  lime: "has-checked:bg-lime",
  sky: "has-checked:bg-sky",
  lilac: "has-checked:bg-lilac",
};
const accentDot: Record<ServiceAccent, string> = {
  butter: "bg-butter",
  lime: "bg-lime",
  sky: "bg-sky",
  lilac: "bg-lilac",
};

// One service choice as a pill: a real checkbox (keyboard, screen readers) under a styled label.
const chip =
  "group/chip relative inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full bg-field py-2 pr-4 pl-3 " +
  "text-left text-[0.95rem] leading-snug text-ink ring-1 ring-inset ring-ink/45 " +
  "transition-[background-color,box-shadow,transform] duration-300 ease-(--ease-out-quart) " +
  "hover:ring-ink/60 active:scale-[0.97] has-checked:ring-ink has-focus-visible:ring-2 has-focus-visible:ring-pink-deep has-focus-visible:shadow-halo";

export function InquiryForm() {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<InquiryField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  // Brief highlight on the chip an "Inquire" button elsewhere just added.
  const [serviceFlash, setServiceFlash] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  const inFlight = useRef(false);

  // Spam timing starts when the form mounts (and again after "send another").
  useEffect(() => {
    startedAt.current = performance.now();
  }, []);

  function startOver() {
    startedAt.current = performance.now();
    setStatus("idle");
  }

  // "Inquire" buttons elsewhere on the page add their service to the selection.
  useEffect(() => {
    function onSelect(event: Event) {
      const serviceId = (event as CustomEvent<string>).detail;
      const title = getServiceTitle(serviceId);
      if (!title) return;
      setStatus((s) => {
        if (s !== "success") return s;
        startedAt.current = performance.now();
        return "idle";
      });
      setValues((v) => ({ ...v, services: toggleService(v.services, serviceId, true) }));
      setErrors((e) => ({ ...e, services: undefined }));
      setAnnouncement(`Service selected: ${title}.`);
      setServiceFlash(serviceId);
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (!serviceFlash) return;
    const t = window.setTimeout(() => setServiceFlash(null), 1800);
    return () => window.clearTimeout(t);
  }, [serviceFlash]);

  function commit(field: InquiryField, next: Values) {
    setValues(next);
    // Once a field has been checked, keep its message in sync as the user fixes it.
    if (touched[field] || errors[field]) setErrors((e) => ({ ...e, [field]: validate(next)[field] }));
  }

  function update(field: TextField, value: string) {
    commit(field, { ...values, [field]: value });
  }

  function pickService(id: string, on: boolean) {
    commit("services", { ...values, services: toggleService(values.services, id, on) });
  }

  function blur(field: InquiryField) {
    setTouched((t) => ({ ...t, [field]: true }));
    // Show a pasted profile link as the plain handle it will be sent as.
    if (field === "instagram" && values.instagram) {
      const handle = normalizeInstagram(values.instagram);
      if (handle !== values.instagram) {
        const next = { ...values, instagram: handle };
        setValues(next);
        setErrors((e) => ({ ...e, instagram: validate(next).instagram }));
        return;
      }
    }
    // Don't nag about an untouched empty field the user simply tabbed past.
    if (isEmpty(values[field]) && !errors[field]) return;
    setErrors((e) => ({ ...e, [field]: validate(values)[field] }));
  }

  function focusField(field: InquiryField) {
    const form = formRef.current;
    const target =
      form?.querySelector<HTMLElement>(`[name="${field}"]:checked`) ??
      form?.querySelector<HTMLElement>(`[name="${field}"]`);
    target?.focus();
  }

  function showErrors(next: Errors) {
    // Render the messages before focusing so aria-describedby is already wired up.
    flushSync(() => setErrors(next));
    const first = FIELD_ORDER.find((f) => next[f]);
    if (first) {
      const count = FIELD_ORDER.filter((f) => next[f]).length;
      setAnnouncement(count === 1 ? "One field needs your attention." : `${count} fields need your attention.`);
      focusField(first);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    setServerError(null);
    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length) {
      showErrors(clientErrors);
      return;
    }

    inFlight.current = true;
    setStatus("submitting");
    setAnnouncement("Sending your inquiry…");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          [HONEYPOT_FIELD]: honeypotRef.current?.value ?? "",
          [FILL_MS_FIELD]: Math.round(performance.now() - startedAt.current),
        }),
        // Don't leave the button stuck on "Sending…" if the server never answers.
        signal: AbortSignal.timeout(20_000),
      });

      let data: InquiryResponse | null = null;
      try {
        data = (await res.json()) as InquiryResponse;
      } catch {
        // Non-JSON (proxy error page, crash) — fall through to the generic message.
      }

      if (res.ok && data?.ok) {
        setValues(EMPTY);
        setErrors({});
        setTouched({});
        setAnnouncement("");
        setStatus("success");
        return;
      }

      setStatus("idle");
      if (data && !data.ok && data.fieldErrors && Object.keys(data.fieldErrors).length) {
        showErrors(data.fieldErrors);
      }
      const message = data && !data.ok && data.error ? data.error : GENERIC_ERROR;
      setServerError(message);
      setAnnouncement(message);
    } catch (err) {
      setStatus("idle");
      const message =
        err instanceof DOMException && err.name === "TimeoutError"
          ? "The server took too long to respond. Please try again in a moment."
          : "We couldn't reach the server. Check your connection and try again.";
      setServerError(message);
      setAnnouncement(message);
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return <SuccessPanel onReset={startOver} />;
  }

  const submitting = status === "submitting";
  const described = (field: InquiryField, extra?: string) =>
    [errors[field] ? id(`${field}-error`) : null, extra].filter(Boolean).join(" ") || undefined;

  const errorText = (field: InquiryField) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className="mt-2 flex items-start gap-1.5 text-sm text-pink-deep">
        <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <>
    {/* Letterhead: the visitor's reply opens like a letter. */}
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-ink/10 pb-5">
      <p className="font-display text-2xl leading-none font-light tracking-tight text-ink sm:text-3xl">
        Dear Nat,
      </p>
      <p className="text-sm text-ink-soft">I reply by email</p>
    </div>
    {/* method/action only matter if someone submits before JS loads: POST keeps personal data out of the URL. */}
    <form
      ref={formRef}
      method="post"
      action="/api/inquiry"
      noValidate
      onSubmit={onSubmit}
      aria-busy={submitting}
      className="relative space-y-6"
    >
      <p className="sr-only" aria-live="polite" role="status">
        {announcement}
      </p>

      {serverError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl bg-pink/10 px-4 py-3.5 text-sm leading-relaxed text-ink ring-1 ring-inset ring-pink/40"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-pink-deep" />
          <div>
            <p className="font-medium">Your inquiry wasn&apos;t sent.</p>
            <p className="text-ink-soft">{serverError}</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-11 items-center font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:text-pink-deep"
            >
              Message {site.instagram.handle} on Instagram
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      ) : null}

      {/* Honeypot — invisible to people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("hp")}>Leave this field empty</label>
        <input
          ref={honeypotRef}
          id={id("hp")}
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div data-field>
        <label htmlFor={id("fullName")} className={label}>
          Full name <Req />
        </label>
        <input
          id={id("fullName")}
          name="fullName"
          type="text"
          autoComplete="name"
          aria-required
          aria-invalid={!!errors.fullName}
          aria-describedby={described("fullName")}
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          onBlur={() => blur("fullName")}
          className={`${control} h-13 px-4`}
        />
        {errorText("fullName")}
      </div>

      <div data-field className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("instagram")} className={label}>
            Instagram username <Req />
          </label>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base text-ink-soft"
            >
              @
            </span>
            <input
              id={id("instagram")}
              name="instagram"
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="yourhandle"
              aria-required
              aria-invalid={!!errors.instagram}
              aria-describedby={described("instagram")}
              value={values.instagram}
              onChange={(e) => update("instagram", e.target.value.replace(/^@+/, ""))}
              onBlur={() => blur("instagram")}
              className={`${control} h-13 pr-4 pl-9`}
            />
          </div>
          {errorText("instagram")}
        </div>

        <div>
          <label htmlFor={id("email")} className={label}>
            Email address <Req />
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="you@example.com"
            aria-required
            aria-invalid={!!errors.email}
            aria-describedby={described("email")}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            className={`${control} h-13 px-4`}
          />
          {errorText("email")}
        </div>
      </div>

      {/* Every choice visible at once: one tap on a phone, no dropdown to open. */}
      <div data-field>
        <p id={id("services-legend")} className={label}>
          Services interested in <Req /> <span className="font-normal text-ink-soft">(choose any)</span>
        </p>
        <div
          role="group"
          aria-labelledby={id("services-legend")}
          aria-describedby={described("services")}
          className="flex flex-wrap gap-2.5"
        >
          {[...services.map((s) => ({ id: s.id, title: s.title, dot: accentDot[s.accent], on: accentChecked[s.accent] })),
            { id: NOT_SURE_ID, title: NOT_SURE_TITLE, dot: "bg-transparent ring-1 ring-inset ring-ink/40", on: "has-checked:bg-paper" },
          ].map((choice) => (
            <label
              key={choice.id}
              className={`${chip} ${choice.on} ${
                serviceFlash === choice.id ? "ring-2 ring-pink-deep shadow-halo" : ""
              }`}
            >
              <input
                type="checkbox"
                name="services"
                value={choice.id}
                checked={values.services.includes(choice.id)}
                aria-invalid={!!errors.services}
                onChange={(e) => pickService(choice.id, e.target.checked)}
                onBlur={() => blur("services")}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={`grid size-5 shrink-0 place-items-center rounded-[0.4rem] ${choice.dot} transition-transform duration-300 ease-(--ease-out-expo) group-has-checked/chip:scale-110`}
              >
                <Check className="size-3 scale-0 text-ink transition-transform duration-300 ease-(--ease-out-expo) peer-checked:scale-100 group-has-checked/chip:scale-100" strokeWidth={3} />
              </span>
              {choice.title}
            </label>
          ))}
        </div>
        {errorText("services")}
      </div>

      <div data-field>
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <label htmlFor={id("message")} className="block text-sm font-medium text-ink">
            Project details <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <span
            id={id("message-count")}
            className={`text-xs tabular-nums ${
              values.message.length > MESSAGE_MAX ? "font-medium text-pink-deep" : "text-ink-soft"
            }`}
          >
            {values.message.length.toLocaleString("en-US")} / {MESSAGE_MAX.toLocaleString("en-US")}
            <span className="sr-only"> characters</span>
          </span>
        </div>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          placeholder="Tell me a little about your brand, goals and timeline."
          aria-invalid={!!errors.message}
          aria-describedby={described("message", id("message-count"))}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          className={`${control} block min-h-36 resize-y px-4 py-3.5 leading-relaxed`}
        />
        {errorText("message")}
      </div>

      <div data-field className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-soft">
          <span aria-hidden className="text-pink-deep">*</span> Required fields
        </p>
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send inquiry
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-(--ease-out-quart) group-hover:translate-x-0.5"
              />
            </>
          )}
        </Button>
      </div>
    </form>
    </>
  );
}

function Req() {
  return (
    <>
      <span aria-hidden className="text-pink-deep">
        *
      </span>
      <span className="sr-only">(required)</span>
    </>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    headingRef.current?.focus();
    // Next frame so the stroke transition plays (instant under reduced motion — see globals.css).
    const raf = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col items-center py-8 text-center sm:py-12">
      <div
        className={`flex size-20 items-center justify-center rounded-full bg-pink/12 transition-transform duration-700 ease-(--ease-out-expo) ${
          drawn ? "scale-100" : "scale-75"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-10 text-pink-deep">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={drawn ? 0 : 1}
            className="transition-[stroke-dashoffset] delay-150 duration-700 ease-(--ease-out-expo)"
          />
        </svg>
      </div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 font-display text-2xl font-medium tracking-tight text-ink outline-none sm:text-3xl"
      >
        Thank you, your inquiry is on its way.
      </h3>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
        I&apos;ll reply to the email address you shared. Meanwhile, say hello on{" "}
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:text-pink-deep"
        >
          Instagram
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
      <Button type="button" variant="ghost" onClick={onReset} className="mt-8">
        Send another inquiry
      </Button>
    </div>
  );
}
