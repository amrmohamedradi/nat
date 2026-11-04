"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type StaggerInProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A panel that rises into place when it scrolls into view. Only opacity and transform are
 * animated (never visibility), so everything inside stays reachable by keyboard before the
 * reveal fires. With reduced motion it is simply there.
 */
export function StaggerIn({ id, className = "", children }: StaggerInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
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
