# Inquiry and email

## Overview

The inquiry flow takes the contact form, validates it in the browser and again here on the server, runs spam checks, and emails Nat through Resend. It is the only backend in the site and the only place secrets are used.

## Key files

| File | Owns |
|---|---|
| `src/app/api/inquiry/route.ts` | `POST /api/inquiry`: body size cap, honeypot, fill time, zod validation, rate limits, Resend send |
| `src/lib/inquiry-schema.ts` | zod schema shared by form and route, spam field names, `InquiryResponse` type |
| `src/lib/email/inquiry-email.ts` | Builds the HTML and plain text email (Cairo time plus UTC) |
| `src/lib/rate-limit.ts` | In memory sliding window limiter |
| `src/components/inquiry/InquiryForm.tsx` | Client form: inline errors, loading, success and error states |
| `src/lib/select-service.ts` | Event that lets "Inquire" buttons preselect a service |

## Conventions

- One schema: change validation in `inquiry-schema.ts` only, never duplicate rules in the form or route.
- Responses are always `InquiryResponse` JSON. Never return `{ ok: true }` unless Resend accepted the email (the filled honeypot is the one deliberate exception).
- Every user value in the email goes through the escape helper. The subject is the constant `New Client Inquiry — Nat.`, and `replyTo` is the client's validated email.
- Tests (`route.test.ts`, `InquiryForm.test.tsx`) mock `resend` and `fetch` at the boundary; never let a test reach the real Resend API.
- Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (comma separated allowed), `CONTACT_FROM_EMAIL`. Missing any of them returns 500 "not configured", never a fake success.

## Gotchas

- The fill time check uses `fillMs`, a duration measured in the browser with `performance.now()`. Never compare client and server clocks.
- Client IP comes from `x-real-ip`, else the right most `X-Forwarded-For` entry; the left most entry is client controlled.
- Rate limits (5 per IP, 30 site wide, per 10 minutes) live in memory, so they reset on restart and are per instance on serverless.
- Body reading is streamed with a 20 KB cap, so chunked requests without `Content-Length` are still bounded.
- Testing a valid submit locally without env vars returns 500 by design. Each valid submit counts toward the rate limit, so restart the dev server if you get 429 while testing.

## Agent skills

- [resend](../../../../.agents/skills/resend/): `resend/resend-skills`, Resend API usage (send, batch, webhooks, templates, delivery events)
- [email-best-practices](../../../../.agents/skills/email-best-practices/): `resend/resend-skills`, deliverability, SPF/DKIM/DMARC, spam and compliance
- [react-email](../../../../.agents/skills/react-email/): `resend/resend-skills`, React Email templates (only if the HTML builder moves to React Email)
- [resend-cli](../../../../.agents/skills/resend-cli/): `resend/resend-skills`, operating Resend from the terminal
- [agent-email-inbox](../../../../.agents/skills/agent-email-inbox/): `resend/resend-skills`, inbound email pipelines (not used in V1)

MCP servers: resend-mcp (recommended; connect it in your MCP settings once a Resend API key exists)

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
