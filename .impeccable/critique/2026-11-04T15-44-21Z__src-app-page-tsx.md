---
target: homepage
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 5
target_identity: "file:E:\\Nat projects\\nat-site\\src\\app\\page.tsx"
target_fingerprint: "sha256:cbc29209427779a4f5832f8e53e29ca938927e963c8332a415838b7b09e5948c"
target_path: "E:\\Nat projects\\nat-site\\src\\app\\page.tsx"
timestamp: 2026-11-04T15-44-21Z
slug: src-app-page-tsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser + technical audit), localhost:3000.

## Design Health Score: 26/32 (Good; heuristics 7 and 10 n/a, Persuade page). Previous run: 24/32.
1 Status 3 (Inquire preselect flash too faint) · 2 Match 3 · 3 Control 3 (two signatures after success) · 4 Consistency 2 (six button dialects, CTA anchors differ) · 5 Error prevention 3 · 6 Recognition 4 · 7 n/a · 8 Aesthetic 3 (scattered motion, script stacking near end) · 9 Recovery 3 (server error lacks Instagram link) · 10 n/a.

Technical audit: 15/20 (A11y 3, Perf 3, Theming 3, Responsive 3, Integrity 3).

## Design specificity
Hero and closing are authored (Hello stage, "Dear Nat," letterhead, footer signature); the middle (services index, mobile sheet) reads closer to agency template. Detector: 11 findings, all in the HTML email template (false positives); overlay flagged cream-palette (brand color, false positive).

## Priority issues
- [P1] Every "Work With Me" lands on #contact; on mobile the form starts ~540px lower. Point at #inquiry.
- [P1] Footer curtain can cover keyboard-focused footer links (WCAG 2.4.11); footer can clip on wide-short screens.
- [P1] autoAlpha-hidden form/rows are unfocusable until ScrollTrigger fires.
- [P1] Six button dialects; Inquire/ghost rings ~1.3:1; footer pill hand-rolled.
- [P1] Inquire preselect flash nearly invisible.
- [P2] Mobile services lose the pastels (hover-only sheets).
- [P2] Motion scattered: WordsRise + Reveal + GSAP systems in one view.
- [P2] Input/chip borders below 3:1 non-text contrast.
- [P3] Mobile sheet generic (tiny numerals, double CTA, no open transition); radiogroup named twice; browser surfaces (caret, scrollbar, focus radius) default.

## Content gaps (need Nat)
Proof (work, clients, testimonials), reply-time promise, confirmed hero subtitle, an about line, font licence.
