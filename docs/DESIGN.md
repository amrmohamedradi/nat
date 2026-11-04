# Nat. — Design brief (V1)

Personal brand site for Nat (Instagram @marketinggwithnat), a marketing & branding
consultant. It must feel like *her* brand — warm, confident, editorial — not a template.

## Brand assets (do not alter)
- Logo: `public/brand/logo.svg` (ink "marketing with" + pink script "Nat"), `logo-white.svg`, `logo-black.svg`.
- Script mark: `public/brand/nat-mark.svg` — the pink "Nat" lettering lifted from the official logo
  (`fill="currentColor"`), usable as a large decorative brand element. Never redraw or replace it.
- Colors (tokens in `src/app/globals.css`, Tailwind classes `bg-ink`, `text-pink`, …):
  - Primary: ink `#063444`, pink `#EB5988`, cream `#FFFBF5` (page background).
  - Secondary: butter `#FAF097`, lime `#D9E6AD`, sky `#96D4E8`, lilac `#CAC6E3` — used as soft
    tints; each service card owns one (see `accent` in `src/data/services.ts`).
  - `pink-deep` / `ink-soft` exist for small text that needs AA contrast on cream.
- Type (loaded in `src/app/fonts.ts`):
  - `font-script` — Birds of Paradise (calligraphic). Headline moments only: hero "Hello, this Nat.",
    the "Nat." wordmark-style accents. Never body copy, never small.
  - `font-display` — Aloevera Display (geometric, matches "marketing with" in the logo). Section titles,
    card titles, numbers ("01"), nav.
  - `font-sans` — Graphik (body, labels, inputs, buttons).

## Direction
- Cream canvas, ink type, pink as the spark (script headline, small accents, hover). Pastels are
  surfaces, not gradients. **No gradients** beyond the barest soft blur, no stock illustrations,
  no invented stats/testimonials/clients.
- Generous whitespace, strong scale contrast (huge script vs. precise small labels), asymmetric
  editorial layouts. Numbered services (01–04) echo the source Instagram carousel.
- Motion: one calm entrance sequence in the hero, `Reveal` on scroll, crisp hover/press micro-
  interactions (`ease-out-expo`/`ease-out-quart`). Respect `prefers-reduced-motion` (handled globally).
- Mobile-first. 16px+ side gutters, no horizontal scroll, tap targets ≥ 44px, inputs ≥ 16px font
  (prevents iOS zoom).

## Shared building blocks
- `src/components/ui/Button.tsx` — `LinkButton`, `Button`, `buttonClasses()` (primary = ink pill, hover pink).
- `src/components/ui/Reveal.tsx` — scroll-in wrapper.
- `src/data/site.ts`, `src/data/services.ts` — all copy lives here.
- `src/lib/inquiry-schema.ts` — zod schema shared by form + API.

## Page anchors
`#home` (hero), `#services`, `#contact` (inquiry form). CTAs "Work With Me" / "Let's Work Together"
/ per-service "Inquire" → `#contact`. Per-service "Inquire" buttons are `<a href="#contact">` whose
onClick also calls `selectService(id)` from `src/lib/select-service.ts`; the form listens for that
event and preselects the service (no query params — keeps the page fully static).
