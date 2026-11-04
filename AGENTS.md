<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Nat. website

Personal marketing site for Nat (@marketinggwithnat): one page (hero, services, inquiry form) plus an email API route.

## Stack

- **Language / Runtime**: TypeScript, Node 20+ (developed on Node 24)
- **Framework**: Next.js 16.4 App Router with `cacheComponents: true`, React 19
- **Key dependencies**: Tailwind CSS v4 (tokens in `src/app/globals.css` `@theme`), zod 4, resend, lucide-react; Vitest 5 + Testing Library for tests
- **Package manager**: npm

## Build approach

<TBD, set by /scope>

## Commands

```bash
# Install
npm install

# Dev server (http://localhost:3000)
npm run dev

# Build
npm run build

# Lint and typecheck
npx eslint src
npx tsc --noEmit

# Test (Vitest + Testing Library, jsdom; tests sit beside the source as *.test.ts(x))
npm test
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`. Design system: `DESIGN.md` (sidecar `.impeccable/design.json`). Product context: `PRODUCT.md`.

## Rules

- All copy and services live in `src/data/` (`site.ts`, `services.ts`); components only read from there. `services.ts` also feeds the form dropdown, so keep each `id` unique and stable.
- Follow `DESIGN.md`: brand colors and fonts only, never redraw the logo (`public/brand/`), never invent stats, testimonials, clients or social links.
- Under `cacheComponents`, no `new Date()` or other non deterministic values in server components; no `export const runtime` in route handlers (it breaks the build).
- `buttonClasses()` has no tailwind-merge: to hide a button responsively use `max-md:hidden`, not `hidden md:inline-flex`.
- Small text on cream needs AA contrast: use `text-ink-soft` / `text-pink-deep`, keep plain `pink` for large type and accents.
- Secrets stay server side (env vars, see `.env.example`); only `NEXT_PUBLIC_SITE_URL` is public.
- Every animation must respect `prefers-reduced-motion` (handled globally in `globals.css`; reuse `Reveal`).

## Context files

- [src/app/api/inquiry/AGENTS.md](src/app/api/inquiry/AGENTS.md): inquiry form to email flow (validation, spam checks, Resend)

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
