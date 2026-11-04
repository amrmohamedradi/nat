"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/data/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * "Hello, this is Nat.": one sentence that Nat's face interrupts. She stands in the middle,
 * cut out of her portrait; "Hello, / this is" sits behind her on the left (one line above
 * her head on mobile) and the pink "Nat." finishes the sentence in front of her hair.
 * Depth is three layers (greeting, portrait, signature).
 *
 * Every layer nests three wrappers so motions never fight over one transform:
 *   [data-depth]  pointer parallax / 3D tilt   (fine pointers only)
 *   [data-scroll] scroll-scrubbed drift
 *   [data-intro]  the one-time entrance
 * Sizes and positions derive from --ph (the portrait's rendered height), set in globals.css.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(
          q("[data-intro='photo']"),
          { autoAlpha: 0, y: 90, scale: 0.92, filter: "blur(12px)" },
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.5 },
        )
          .fromTo(
            q("[data-intro='word']"),
            { autoAlpha: 0, y: 70, rotate: -5 },
            { autoAlpha: 1, y: 0, rotate: 0, duration: 1.2, stagger: 0.14 },
            0.3,
          )
          // The signature writes itself in: a feathered stroke sweeping left to right,
          // easing in from a soft blur so nothing appears before the pen does.
          .fromTo(
            q("[data-intro='signature']"),
            { "--ink": "0%", filter: "blur(6px)" },
            { "--ink": "118%", filter: "blur(0px)", duration: 1.8, ease: "power2.inOut" },
            0.8,
          )
          // Opacity arrives quickly alongside, so the stroke (not a fade) carries the reveal.
          .fromTo(
            q("[data-intro='signature']"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5, ease: "power1.out" },
            0.8,
          )
          .fromTo(
            q("[data-intro='copy']"),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 },
            1.2,
          );

        // Scrolling away: the sentence parts around her, the portrait sinks.
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(q("[data-scroll='greeting']"), { xPercent: -14, yPercent: -40, ease: "none", scrollTrigger: scrub });
        // Nat stays planted on the section edge (no vertical drift), so no gap ever opens beneath her.
        gsap.to(q("[data-scroll='photo']"), { scale: 0.97, ease: "none", scrollTrigger: scrub });
        gsap.to(q("[data-scroll='signature']"), { xPercent: 12, yPercent: -60, ease: "none", scrollTrigger: scrub });
      });

      // Pointer parallax with a gentle 3D turn of the portrait. Desktop mice and trackpads only.
      mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
        const section = root.current;
        if (!section) return;
        const layers = q("[data-depth]").map((el) => {
          const depth = Number((el as HTMLElement).dataset.depth);
          const tilt = el.hasAttribute("data-tilt");
          return {
            depth,
            x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }),
            // Turn left/right only: tilting forward/back would lift her base off the section edge.
            ry: tilt ? gsap.quickTo(el, "rotationY", { duration: 1.2, ease: "power3.out" }) : null,
          };
        });
        const move = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          for (const l of layers) {
            l.x(nx * l.depth);
            // The portrait (tilt layer) only moves sideways; vertical drift would open a gap at its base.
            if (!l.ry) l.y(ny * l.depth * 0.6);
            l.ry?.(nx * 8);
          }
        };
        const leave = () => {
          for (const l of layers) {
            l.x(0);
            l.y(0);
            l.ry?.(0);
          }
        };
        section.addEventListener("pointermove", move);
        section.addEventListener("pointerleave", leave);
        return () => {
          section.removeEventListener("pointermove", move);
          section.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="home" aria-labelledby="hero-title" className="hero relative isolate overflow-hidden">
      <h1 id="hero-title" className="sr-only">
        Hello, this is Nat.
      </h1>

      <div className="hero-stage relative mx-auto w-full max-w-7xl [perspective:1400px]">
        {/* Back layer: the start of the sentence, behind Nat */}
        <div aria-hidden="true" data-depth="-24" className="hero-greeting absolute z-0">
          <p data-scroll="greeting" className="font-script leading-[0.95] whitespace-nowrap text-ink">
            <span data-intro="word" className="hero-anim inline-block lg:block">
              Hello,
            </span>{" "}
            <span data-intro="word" className="hero-anim inline-block lg:block lg:pr-[0.12em]">
              this is
            </span>
          </p>
        </div>

        {/* Middle layer: Nat herself */}
        <div
          data-depth="14"
          data-tilt
          className="hero-photo absolute bottom-0 left-1/2 z-10 -translate-x-1/2 [transform-style:preserve-3d]"
        >
          <div data-scroll="photo" className="h-full origin-bottom">
            <div data-intro="photo" className="hero-anim h-full">
              <Image
                src={site.heroPhoto.src}
                alt={site.heroPhoto.alt}
                width={913}
                height={1223}
                preload
                sizes="(min-width: 1024px) 64vh, 100vw"
                className="hero-cutout h-full w-auto max-w-none select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Front layer: the signature */}
        <div aria-hidden="true" data-depth="36" className="hero-signature pointer-events-none absolute z-20">
          <div data-scroll="signature">
            <span data-intro="signature" className="hero-anim block font-script leading-none text-pink">
              <span className="ink-reveal">Nat.</span>
            </span>
          </div>
        </div>

        {/* Copy: beside her on desktop (bottom left), under her on phones and tablets */}
        <div className="hero-copy relative z-30 mx-auto max-w-xl px-4 sm:px-8 lg:absolute lg:bottom-[6%] lg:left-0 lg:mx-0 lg:w-[min(24rem,30%)] lg:max-w-none lg:pr-0">
          <p data-intro="copy" className="hero-anim text-lg leading-relaxed text-ink-soft sm:text-xl">
            {site.heroSubtitle}
          </p>
          <div data-intro="copy" className="hero-anim mt-7 flex flex-wrap items-center gap-3">
            <LinkButton href="#contact">
              Work With Me
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-(--ease-out-quart) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </LinkButton>
            <LinkButton href="#services" variant="ghost" className="bg-cream">
              Explore services
            </LinkButton>
          </div>
        </div>

        <div
          data-intro="copy"
          className="hero-anim absolute right-8 bottom-[6%] z-30 hidden max-w-[14rem] text-right lg:block"
        >
          <p className="font-display text-xl leading-snug font-light text-ink-soft">{site.tagline}</p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft underline decoration-ink/20 underline-offset-4 transition-colors hover:text-pink-deep hover:decoration-pink-deep"
          >
            {site.instagram.handle}
            <span className="sr-only"> (Instagram, opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
