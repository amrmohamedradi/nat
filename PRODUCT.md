# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people building a personal brand (creators, founders, professionals) who want to be seen online and need help with strategy, identity and presence. They usually arrive from Nat's Instagram (@marketinggwithnat), already curious about her, and decide whether to reach out.

Secondary: businesses looking for branding, packaging design, or brand experiences and events.

## Product Purpose

A personal marketing site for Nat, a one-woman marketing and branding consultant. It presents who she is and what she offers, and turns interest into a client inquiry. Success means a qualified visitor submits the inquiry form, which emails Nat directly.

## Positioning

Nat is the work: a personal brand consultant selling personal brands, so her own site has to prove the craft she sells. Tagline: "Your vision with a touch of Nat."

## Operating Context

- Most visitors come from Instagram, on mobile.
- The inquiry form posts to `/api/inquiry` and is delivered to Nat by email via Resend; Nat replies from her inbox.
- English only for now.

## Capabilities and Constraints

- Services (source: Instagram carousel "Here's What We Can Work On Together"): 01 Consultations & Strategy Building; 02 Build Your Online Presence for Personal Brands; 03 Branding & Packaging Design; 04 Brand Experiences & Events. `src/data/services.ts` is the single source for both the services section and the form dropdown.
- One page (home, services, contact) plus the inquiry email API. Next.js 16 App Router, Tailwind v4.
- Undecided: pricing and packages; booking method beyond the inquiry form. Do not invent either.
- The hero subtitle in `src/data/site.ts` is a draft awaiting Nat's confirmation.

## Brand Commitments

- Name "Nat." with tagline "Your vision with a touch of Nat".
- Official logo and script mark in `public/brand/` (source files in `../Brand Identity/`): never redraw or alter.
- Brand palette and fonts are supplied in `../Brand Identity/` and already wired into the site; see `DESIGN.md`.
- Birds of Paradise is a personal-use-only font file; a commercial license is needed before launch, or it must be replaced.

## Evidence on Hand

Nat has real past work / portfolio, client names or logos she may show, and client testimonials. None of it is in the repository yet: wait for Nat to supply the actual material. Never fabricate projects, clients, logos, quotes, stats or results.

Available now: Nat's portrait (`public/brand/Hero.png`) and her Instagram account.

## Product Principles

1. The site is a portfolio piece: it must look like a personal brand done right, not a template.
2. Personal brands come first in copy, ordering and examples; businesses are welcome but secondary.
3. Every path leads to the inquiry: low friction, clear service choice, a real human on the other end.
4. Only real proof: show actual work, clients and words, or nothing.
5. Built for the Instagram visitor: fast, mobile-first, recognisably the same Nat as the feed.
