import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

// The official script mark used as a mask, so it can take any brand tint.
const markMask: CSSProperties = {
  maskImage: "url(/brand/nat-mark.svg)",
  WebkitMaskImage: "url(/brand/nat-mark.svg)",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskSize: "contain",
  WebkitMaskSize: "contain",
};

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-28 sm:pt-36"
    >
      {/* Decorative composition: butter sun, small pastel accents, oversized "Nat" bleeding off the edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Reveal
          delay={150}
          className="absolute top-[18%] -right-[28%] aspect-square w-[78vw] rounded-full bg-butter/70 sm:top-[12%] md:-right-[6%] md:w-[44vw] md:max-w-[40rem]"
        >
          {null}
        </Reveal>
        <Reveal
          delay={450}
          className="absolute top-[30%] right-[8%] size-5 rounded-full bg-sky sm:size-7 md:top-[22%] md:right-[44%]"
        >
          {null}
        </Reveal>
        <Reveal
          delay={300}
          className="absolute -right-[38%] -bottom-[2%] aspect-[1224/530] w-[150vw] sm:-right-[22%] md:-right-[8%] md:-bottom-[6%] md:w-[72vw] md:max-w-[76rem]"
        >
          <div className="size-full bg-pink/15" style={markMask} />
        </Reveal>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-16 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.22em] text-ink-soft uppercase sm:text-xs">
            <span aria-hidden="true" className="h-px w-8 bg-pink" />
            {site.tagline}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1
            id="hero-title"
            className="mt-6 pl-1 font-script text-[clamp(4.75rem,21vw,13rem)] leading-[0.95] font-normal text-ink sm:mt-8"
          >
            Hello, this{" "}
            <span className="block pl-[0.6em] text-pink sm:pl-[1.4em]">Nat.</span>
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-[minmax(0,26rem)_auto] md:items-end md:gap-16">
          <Reveal delay={260}>
            <p className="relative max-w-md text-lg leading-relaxed text-ink-soft sm:text-xl">
            <span aria-hidden="true" className="absolute -top-6 left-0 hidden h-3 w-12 rounded-full bg-lilac md:block" />
            {site.heroSubtitle}
          </p>
          </Reveal>
          <Reveal delay={380} className="flex flex-wrap items-center gap-3">
            <LinkButton href="#contact">
              Let&apos;s Work Together
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-(--ease-out-quart) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </LinkButton>
            <LinkButton href="#services" variant="ghost" className="bg-cream/60 backdrop-blur-sm">
              Explore services
            </LinkButton>
          </Reveal>
        </div>
      </div>

      <Reveal delay={600} className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-8">
        <div className="flex items-center justify-between border-t border-ink/10 pt-4 text-xs tracking-[0.18em] text-ink-soft uppercase">
          <a href="#services" className="inline-flex h-11 items-center gap-2 hover:text-ink">
            <ArrowDown aria-hidden="true" className="size-3.5 motion-safe:animate-bounce" />
            Scroll
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center normal-case tracking-normal hover:text-ink"
          >
            {site.instagram.handle}
            <span className="sr-only"> (Instagram, opens in a new tab)</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
