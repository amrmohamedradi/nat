---
name: Nat.
description: Your vision with a touch of Nat
colors:
  ink: "#063444"
  ink-soft: "#2f5563"
  pink: "#eb5988"
  pink-deep: "#c13a68"
  cream: "#fffbf5"
  paper: "#f7f0e6"
  butter: "#faf097"
  lime: "#d9e6ad"
  sky: "#96d4e8"
  lilac: "#cac6e3"
  field: "#fffefc"
typography:
  signature:
    fontFamily: "Birds of Paradise, cursive"
    fontSize: "clamp(4.5rem, 19vw, 9.5rem)"
    fontWeight: 400
    lineHeight: 0.95
  headline:
    fontFamily: "Aloevera Display, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.4rem, 6.5vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  numeral:
    fontFamily: "Aloevera Display, ui-sans-serif, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 6rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Aloevera Display, ui-sans-serif, sans-serif"
    fontSize: "1.9rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Graphik Arabic, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Graphik Arabic, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 500
    letterSpacing: "0.22em"
  button:
    fontFamily: "Graphik Arabic, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    letterSpacing: "-0.025em"
  nav:
    fontFamily: "Aloevera Display, ui-sans-serif, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    letterSpacing: "0.025em"
  menu:
    fontFamily: "Aloevera Display, ui-sans-serif, sans-serif"
    fontSize: "2.6rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.025em"
rounded:
  focus: "6px"
  field: "0.75rem"
  panel: "1.5rem"
  card: "1.75rem"
  card-lg: "2.25rem"
  pill: "9999px"
spacing:
  gutter: "16px"
  gutter-lg: "32px"
  card-pad: "24px"
  card-pad-lg: "40px"
  section: "96px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.pink-deep}"
    textColor: "{colors.cream}"
  button-ghost:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  inquire-pill:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "4px 4px 4px 20px"
    height: "48px"
  inquire-pill-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
  service-card:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card-lg}"
    padding: "{spacing.card-pad-lg}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "52px"
  nav-link:
    typography: "{typography.nav}"
    textColor: "{colors.ink-soft}"
    height: "44px"
    padding: "0 16px"
  nav-link-active:
    textColor: "{colors.ink}"
---

# Design System: Nat.

## Overview

**Creative North Star: "The Signed Letter"**

Every page is a letter from Nat to the person reading it. Cream paper, ink type, generous margins, and one thing no template can copy: her signature, the pink calligraphic "Nat." lifted from the logo. The script is used the way a signature is used: once or twice per view, large, at the moment of personal address ("Hello, this is Nat.", "together", the closing "Nat."). Everything around it is calm, precise and set in ink so the signature lands.

The page reads like personal correspondence that happens to be beautifully typeset: a warm greeting spoken around Nat herself, a numbered list of what we can do together, and an invitation to write back that closes with "Speak soon, Nat." Pastels (butter, lime, sky, lilac) are the stationery: flat tinted sheets, one per service, never gradients. Structure comes from fine ink rules, the 01 to 04 numbering that echoes the Instagram carousel, and strong scale contrast between huge script and small precise text. Headings carry their own weight: no eyebrow labels above them.

The visual system rejects template polish: no gradients, no glass cards as decoration, no stock illustration, no invented logos, stats or testimonials. If a section could appear on any consultant's site, it needs more Nat in it, usually through her words, her portrait or her signature, not more decoration.

**Key Characteristics:**
- Cream paper, ink type, pink signature.
- Nat at the centre: one sentence, "Hello, this is Nat.", that her face interrupts; the pink "Nat." finishes it in front of her.
- Script only at moments of personal address, always large.
- Ruled lines and 01 to 04 numbering as the letter's structure; no eyebrow labels.
- Pastels as flat stationery tints, one per service.
- Soft, confident pills and plump cards; crisp, decisive motion.

## Colors

A letter palette: deep teal-ink on warm cream paper, one pink for the signature, and four pastel stationery tints.

### Primary
- **Letter Ink** (ink): the voice of the page. Headlines, body text on tints, primary buttons, the footer sheet, rules at 10 to 20% opacity.
- **Signature Pink** (pink): the signature. Script "Nat." and script accents, the active-nav dot, the card hover dot, text selection. Large type and marks only.

### Secondary
- **Pressed Pink** (pink-deep): pink that can carry small text. Error messages, required asterisks, numeral labels, focus rings, primary-button hover.

### Tertiary
- **Butter Sheet** (butter): service 01, footer link and CTA hover, the preselected-service highlight in the form.
- **Lime Sheet** (lime): service 02.
- **Sky Sheet** (sky): service 03.
- **Lilac Sheet** (lilac): service 04.

### Neutral
- **Cream Paper** (cream): the page itself; also text on ink.
- **Deep Paper** (paper): alternating surfaces and image placeholders.
- **Writing Paper** (field): the near-white surface of form fields and the form panel. Never pure white.
- **Faded Ink** (ink-soft): secondary body copy, labels, inactive nav. AA on cream.

### Named Rules
**The Signature Rule.** Plain pink never sets small text. Below about 24px, pink becomes pink-deep; pink stays for the script, marks and dots.

**The Stationery Rule.** Pastels are flat sheets, one tint per object. Never blend two in a gradient, never use them for text, never scatter them as decorative suns around the portrait.

## Typography

**Signature Font:** Birds of Paradise (with cursive)
**Display Font:** Aloevera Display (with ui-sans-serif)
**Body Font:** Graphik Arabic, Latin glyphs (with ui-sans-serif, system-ui)

**Character:** A calligraphic signature over a clean geometric display face that matches "marketing with" in the logo, with a quiet grotesk for reading. Handwritten warmth, typeset precision.

### Hierarchy
- **Signature** (400, up to 10.5rem, 0.8 to 1.05): "Hello, this is Nat." (the "Nat." finishes the sentence in front of her), the script word inside a headline ("together"), the "Speak soon, Nat." and "Talk soon, Nat." sign-offs. Never body copy, never small, at most two script moments per viewport besides the logo.
- **Headline** (500, up to 5rem, 1.02, tight): section titles; may hold one script word in pink.
- **Numeral** (300, up to 6rem, 1, tighter): the 01 to 04 service numbers.
- **Title** (600, 1.5 to 1.9rem, 1.25): card titles.
- **Body** (400, 1rem to 1.25rem, 1.625): reading text, capped around 28rem (max-w-md) per column.
- **Label** (500, 0.7rem, 0.22em tracking, uppercase): small list headings in the footer ("Explore", "Follow"). Never as an eyebrow above a heading.
- **Button** (500, 0.95rem, slightly tight): pill buttons and the inquire pill.
- **Nav / Menu** (Aloevera, 0.95rem; 2.6rem in the mobile sheet): navigation links.

### Named Rules
**The One Signature Rule.** The script appears where Nat speaks in first person or signs off. If it decorates a neutral word, remove it. It never addresses Nat (no "Let's work together Nat.").

**The No Eyebrow Rule.** Headings carry their own weight. No tracked uppercase kicker or pink-rule label above a section heading.

## Layout

Single column on mobile with 16px gutters, 32px from `sm`; content sits in a 1280px (max-w-7xl) frame, with the contact section narrower at 1152px. The hero is a centred stage: Nat in the middle, the greeting around her, subtitle and buttons bottom left, tagline and handle bottom right (stacked under her on mobile). Below it, asymmetric compositions: services intro on a 12-column grid (8 + 4), contact at 5fr / 7fr with the intro sticky. Sections breathe at 96px vertical padding, 128px from `sm`. Fixed 72 to 80px header; anchors offset by 6rem. Mobile-first: no horizontal scroll, tap targets at least 44px, inputs at 16px so iOS does not zoom. On a 375 by 812 phone, Nat's face, the full greeting and the primary button all sit in the first screen.

**The Margin Rule.** Leave space like a letter leaves margins; spacing varies by section role rather than repeating one padding everywhere.

## Elevation & Depth

Mostly flat paper. Depth comes from tonal sheets (pastels, deep paper, the ink footer) and fine ink rings at 5 to 20% opacity. Shadows are rare, soft and ink-tinted, reserved for objects that sit on the page like something placed on a desk.

### Shadow Vocabulary
Shadows are tokens in `globals.css` (`shadow-panel`, `shadow-ink`, `shadow-halo`). Depth in the hero comes from layering (words behind Nat, signature in front) and motion, not shadow.

- **Resting panel** (`0 30px 60px -40px rgb(6 52 68 / 0.35)`): the contact form panel.
- **Pressed ink** (`0 1px 0 rgb(255 255 255 / 0.15) inset, 0 10px 24px -12px rgb(6 52 68 / 0.6)`): primary button.
- **Focus halo** (`0 0 0 4px rgb(235 89 136 / 0.15)`): a focused form field, alongside its pink-deep ring.

### Named Rules
**The Desk Rule.** Only physical-feeling objects (form panel, primary button) cast a shadow. Cards are tinted sheets, not floating tiles.

## Shapes

Soft and round. Pills for every action; generously rounded sheets for cards (1.75rem, 2.25rem from `sm`) and panels (1.5rem); fields at 0.75rem. The signature silhouette is Nat herself: the portrait is cut out along her real outline (an alpha matte from the photo, `public/brand/nat-cutout.webp`), never a circle, arch or geometric mask, and stands on the bottom edge of the hero. Circles appear only as small dots (active nav, card hover). The script mark is used as a CSS mask in the ink footer, bleeding off the edge at about 10% pink.

## Components

Soft and confident: rounded, plump forms with crisp, decisive feedback.

### Buttons
- **Shape:** full pill (9999px), 48px tall (52px from `sm`).
- **Primary:** ink with cream text, padding 24px (28px from `sm`), Graphik 500 at 0.95rem; pressed-ink shadow. The general call to action is always "Work With Me".
- **Hover / Focus:** background turns pink-deep over 300ms ease-out-quart; trailing arrow nudges up-right; press scales to 0.97; focus shows a 2px pink-deep outline offset 3px.
- **Ghost:** ink text with a 20% ink ring that becomes solid ink on hover.
- **Footer CTA:** cream pill on the ink footer, turns butter on hover.

### Hello Stage (signature)
Three layers sized from `--ph` (the portrait's rendered height), reading as one sentence. From 1024px: "Hello, / this is" in ink script on the left, right-aligned and just touching her hair; Nat's cut-out in the middle; the pink "Nat." on the right in front of her hair, on the "this is" line, so her face sits inside the sentence. On phones and tablets: "Hello, this is" on one line above her head, fully readable, and "Nat." large across her arms. Copy goes bottom left on desktop and under her on smaller screens. The h1 is screen-reader text; the visual words are aria-hidden.

Motion (GSAP, all off under reduced motion):
- **Entrance:** Nat rises out of a soft blur, the words lift in with a slight turn, then the signature writes itself in: a feathered mask (`.ink-reveal`, animating `--ink` 0% to 118%) sweeps left to right while it sharpens from a 6px blur, so no stray swash shows before the stroke. Then the copy.
- **Pointer:** layers drift by depth (words back, signature forward) and the portrait turns a few degrees in 3D. Fine pointers only.
- **Scroll:** as the hero leaves, the words part, Nat sinks slightly and the signature lifts.
Each layer nests three wrappers (pointer, scroll, entrance) so the motions never share a transform. Layers are hidden until the entrance runs only when `scripting: enabled`, with a CSS failsafe that lands them on their finished state after 3.4s.

### Signature Write
`SignatureWrite` writes script text in with the same feathered ink stroke when it scrolls into view: "together" in the services heading and the "Nat." of the contact sign-off. Section headings (`WordsRise`) rise in word by word out of their own line, 40ms apart. A 2px pink line under the header fills with scroll progress.

### Inquire Pill
Outlined pill with "Inquire" text and an ink circle holding an arrow. On hover the pill fills ink, the circle turns pink with ink arrow; hovering the card rotates the arrow 45 degrees. It jumps to the form panel itself (`#inquiry`), preselects the service, flashes the field butter with a pink-deep ring for about 1.8s and announces the choice. "Help Me Choose" does the same with "Not sure yet, help me choose".

### Cards / Containers
- **Corner Style:** 1.75rem, 2.25rem from `sm`.
- **Background:** one pastel sheet per service (butter, lime, sky, lilac).
- **Shadow Strategy:** none; lift 6px on hover over 500ms ease-out-expo, a small pink dot appearing top right, and a gentle 3D tilt toward the pointer (`Tilt`, up to 5 degrees, fine pointers only).
- **Internal Padding:** 24px, 40px from `sm`; huge light numeral top left, title and description below, inquire pill at the bottom.
- **Contact panel:** writing paper at 80% with a 10% ink ring, 1.5rem radius, resting-panel shadow.

### Inputs / Fields
- **Style:** writing-paper field, 0.75rem radius, inset 40% ink ring (60% on hover), 52px tall, 16px text.
- **Focus:** 2px pink-deep ring plus a 4px soft pink halo.
- **Error:** pink-deep ring at 70% and a faint pink wash; message in pink-deep with an alert icon below the field.
- **Labels:** Graphik 500 at 0.875rem in ink; optional hints in ink-soft.

### Navigation
- **Desktop:** Aloevera Display at 0.95rem; ink-soft, ink on hover and when active; the active link gets a small pink dot beneath it. Footer links hover to butter (pink fails contrast on ink at that size). Header is transparent over the hero and becomes 85% cream with blur and a hairline rule once scrolled.
- **Mobile:** a compact "Work With Me" pill (44px) stays beside a two-line burger that folds into an ×; a full-height cream sheet listing links at 2.6rem with pink-deep 01 to 03 numerals, the tagline, a full-width primary button and the Instagram handle.

## Do's and Don'ts

### Do:
- **Do** keep the signature large and rare: script only for "Hello, this is Nat.", one word inside a headline, or the sign-off.
- **Do** structure content like a letter: greeting, numbered items, fine ink rules at 10 to 15%, a signed closing.
- **Do** give each service its own pastel sheet and keep text on pastels in ink.
- **Do** use pink-deep or ink-soft for any small text on cream (AA).
- **Do** ease motion out with ease-out-expo or ease-out-quart, reveal on scroll with Reveal, and respect prefers-reduced-motion.

### Don't:
- **Don't** redraw, recolor or reconstruct the logo or the script mark; use the files in `public/brand/`.
- **Don't** use gradients beyond the barest soft blur, or glass effects as decoration.
- **Don't** set body copy, buttons or labels in the script face.
- **Don't** add stock illustrations, invented stats, testimonials, clients or social links.
- **Don't** float cards with shadows; cards are flat tinted sheets.
- **Don't** put eyebrow labels or kickers above headings.
- **Don't** surround the portrait with decorative suns, dots, tags or a script watermark.
- **Don't** put Nat in a frame, circle or arch in the hero; she stands cut out on the page.
