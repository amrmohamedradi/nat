---
target: homepage
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
target_identity: "file:E:\\Nat projects\\nat-site\\src\\app\\page.tsx"
target_fingerprint: "sha256:7e95df1100a3ca1a86f1a310c1383294be76c3718f67747fc982a18b6755a4a4"
target_path: "E:\\Nat projects\\nat-site\\src\\app\\page.tsx"
timestamp: 2026-11-04T13-19-55Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser), inspected on localhost:3000.

## Design Health Score: 24/32 (Good; heuristics 7 and 10 n/a for a Persuade page)
1 Visibility 3 (Inquire lands at section top, preselection out of view on mobile) · 2 Match 3 ("Hello, this Nat." / "Let's work together Nat." ambiguity) · 3 Control 3 (no "not sure yet" service option) · 4 Consistency 2 (4 CTA labels; script-count rule broken; cards vs ruled lists) · 5 Error prevention 3 (pasted instagram URL rejected) · 6 Recognition 3 · 7 n/a · 8 Aesthetic 3 (hero clutter) · 9 Recovery 4 · 10 n/a.

## Design specificity
Half authored: tokens, script greeting, pastel 01-04 sheets and footer are Nat's; the hero (arch portrait + pastel suns + IG tag) is a common coach/creator template and does not express The Signed Letter. Detector: 21 findings (2 warnings, 19 advisory), 8 in the email template are false positives; overlay flagged cream-palette (false positive, brand color).

## Priority issues
- [P1] Hero is a template archetype and buries Nat's face below the mobile fold -> recompose ("signed photograph"): one framed portrait, pink "Nat." overlapping it, face + greeting + CTA inside 812px. /impeccable layout
- [P1] No credibility or voice layer (no about, work, testimonials) -> "A note from Nat" section in her words + conditional slots for real proof. /impeccable shape
- [P1] Font payload ~1.5MB (10 TTF/OTF, Arabic glyphs, 3 unused weights) -> woff2, Latin subset, drop unused. /impeccable optimize
- [P1] Form friction: no "not sure yet" option, pasted IG URL rejected, Inquire scroll lands above form. /impeccable harden
- [P2] Signature misuse (watermark = 3rd script moment; "Let's work together Nat."); CTA labels inconsistent; mobile page long (form ~4.4 screens down). /impeccable clarify, /impeccable distill
- Launch blocker (licensing): Birds of Paradise is personal-use-only.

## Minor
Footer hover pink 3.99:1 on ink; bg-white and literal rgb shadows outside tokens; no skip link; endless bounce on scroll cue; 1.9MB Hero.png source; OG has no image; services (04) count meaningless; service 02 description repeats title.
