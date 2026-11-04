"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type WordsRiseProps = {
  /** Plain headline text (keep it short: a headline, not a paragraph). */
  text: string;
  className?: string;
};

/**
 * Headline words rise out of their own line, one after another (40ms apart), when the
 * heading scrolls into view. The text stays real text for screen readers; with reduced
 * motion it is simply there.
 */
export function WordsRise({ text, className = "" }: WordsRiseProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, { type: "words", mask: "words", aria: "auto" });
        gsap.from(split.words, {
          yPercent: 110,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
