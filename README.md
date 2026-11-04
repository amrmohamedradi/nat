# Nat. — Personal Marketing Website (V1)

Personal brand site for Nat ([@marketinggwithnat](https://www.instagram.com/marketinggwithnat)) with a
working client inquiry form that emails each submission to Nat.

**Stack:** Next.js 16.4 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 ·
zod (shared validation) · Resend (email) · lucide-react (icons).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see "Email setup")
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm start`, or deploy to Vercel (set the same env vars in the project settings).

## Email setup (Resend)

The form posts to `POST /api/inquiry`, which validates the data on the server and sends it through
[Resend](https://resend.com). No key or address ever reaches the browser.

1. Create a Resend account and an API key → `RESEND_API_KEY`.
2. Set `CONTACT_TO_EMAIL` to Nat's inbox (comma-separate for several).
3. Sender (`CONTACT_FROM_EMAIL`):
   - **Testing:** `Nat. Website <onboarding@resend.dev>` works, but Resend only delivers it to the
     email address that owns the Resend account.
   - **Production:** verify a domain in Resend (add the DNS records it gives you), then use e.g.
     `Nat. Website <hello@your-domain.com>`.
4. Restart the dev server, submit the form, and check the inbox.

| Variable | Required | Exposed to browser | Purpose |
|---|---|---|---|
| `RESEND_API_KEY` | yes | no | Resend API key |
| `CONTACT_TO_EMAIL` | yes | no | Where inquiries are delivered |
| `CONTACT_FROM_EMAIL` | yes | no | Sender address (must be on a Resend-verified domain in production) |
| `NEXT_PUBLIC_SITE_URL` | recommended | yes | Canonical URL for SEO metadata |

If any of the three email variables is missing, the form shows *"Email service is not configured
yet"* — it never fakes success.

The email: subject **"New Client Inquiry — Nat."**, reply-to set to the client, and it contains full
name, Instagram (linked), email, selected service, project details, and the submission time (Cairo
time + UTC). HTML and plain-text versions; all client input is HTML-escaped.

## Spam protection

- Hidden honeypot field — bots that fill it get a silent fake success and nothing is sent.
- Minimum fill time (2.5 s, measured in the browser so device clock skew doesn't matter).
- Rate limit: 5 sends / 10 min per IP plus 30 / 10 min site-wide. In-memory, so it's best-effort
  per server instance (see Known limitations).
- 20 KB request body cap; strict server-side validation with the same zod schema as the form.

## Editing content

| What | Where |
|---|---|
| Services (cards **and** form dropdown) | `src/data/services.ts` — keep each `id` unique |
| Headline, tagline, hero subtitle, Instagram, nav | `src/data/site.ts` |
| Colors / motion tokens | `src/app/globals.css` (`@theme`) |
| Fonts | `src/app/fonts.ts` (files in `src/fonts/`) |
| Design rules | `DESIGN.md` |

## Project structure

```
src/
  app/            layout (SEO metadata), page, fonts, globals.css, icon.svg, api/inquiry/route.ts
  components/
    layout/       Navbar, Footer, InstagramIcon
    sections/     Hero, Services, InquireLink, ContactSection
    inquiry/      InquiryForm (client)
    ui/           Button, Reveal
  data/           site.ts, services.ts      ← content
  lib/            inquiry-schema.ts, email/inquiry-email.ts, rate-limit.ts, select-service.ts
public/brand/     official logos + nat-mark.svg (pink "Nat" lettering taken from the logo)
```

## Known limitations

- **Rate limiting is in memory.** On serverless hosting each instance keeps its own counts. For a
  hard guarantee, swap `src/lib/rate-limit.ts` for a shared store (e.g. Upstash Redis).
- **Font licensing:** *Birds of Paradise* is marked **"PERSONAL USE ONLY"** in the supplied file.
  Buy a commercial license before launch, or replace the script font.
- Real email delivery is untested until Resend credentials are added.
- English only. Site fonts in `src/fonts/` are woff2 files subset to Latin (originals in `../Brand Identity/NAT - FONTS`); an Arabic version needs them re-exported with Arabic glyphs.
