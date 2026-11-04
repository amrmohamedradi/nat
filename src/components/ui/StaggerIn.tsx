"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type StaggerInProps = {
  /** Children matching this selector rise in one after another (50ms apart). */
  items: string;
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A container that rises into place when it scrolls into view, then reveals its marked
 * children in sequence. Offscreen at mount, so the hidden start never flashes; with
 * reduced motion everything is simply there.
 */
export function StaggerIn({ items, id, className = "", children }: StaggerInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          })
          .from(el, { y: 48, autoAlpha: 0, duration: 1.1 })
          .from(el.querySelectorAll(items), { y: 22, autoAlpha: 0, duration: 0.8, stagger: 0.05 }, 0.2);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
