"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Entrance for the services index: as each row scrolls in, its ink rule draws left to
 * right, then the row's number, title, copy and button rise in 50ms apart. Rows that
 * arrive together cascade. Only opacity is animated (never visibility), so the buttons stay
 * reachable by keyboard before the reveal fires. With reduced motion everything is simply there.
 */
export function ServiceRows({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]", ref.current);
        for (const row of rows) {
          gsap.set(row.querySelector("[data-rule]"), { scaleX: 0 });
          gsap.set(row.querySelectorAll("[data-rise]"), { opacity: 0, y: 36 });
        }
        ScrollTrigger.batch(rows, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            batch.forEach((row, i) => {
              gsap
                .timeline({ delay: i * 0.12, defaults: { ease: "expo.out" } })
                .to(row.querySelector("[data-rule]"), { scaleX: 1, duration: 1.1 })
                .to(row.querySelectorAll("[data-rise]"), { opacity: 1, y: 0, duration: 0.9, stagger: 0.05 }, 0.15);
            });
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative mt-14 border-b border-ink/15 sm:mt-20">
      {children}
    </ol>
  );
}
