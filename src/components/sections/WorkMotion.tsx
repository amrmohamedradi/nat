"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Motion belongs to the paper studies; the copy and controls stay visible. */
export function WorkMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>("[data-study]").forEach((study) => {
        const sequence = gsap.timeline({
          defaults: { ease: "expo.out" },
          scrollTrigger: { trigger: study, start: "top 84%", once: true },
        });
        const rules = study.querySelectorAll("[data-study-rule]");
        const type = study.querySelectorAll("[data-study-type]");
        const pieces = study.querySelectorAll("[data-study-piece]");
        if (rules.length) sequence.from(rules, { scaleX: 0, transformOrigin: "left", duration: 0.8 }, 0);
        if (type.length) sequence.from(type, {
          clipPath: "inset(0 100% 0 0)", y: 12, duration: 0.9, stagger: 0.12,
        }, 0.1);
        if (pieces.length) sequence.from(pieces, {
          y: 44, opacity: 0, duration: 0.9, stagger: 0.12,
        }, 0.1);
      });

      root.querySelectorAll<HTMLElement>("[data-process-step]").forEach((step) => {
        const sequence = gsap.timeline({
          scrollTrigger: { trigger: step, start: "top 85%", once: true },
        });
        const marker = step.querySelector("[data-process-marker]");
        const line = step.querySelector("[data-process-line]");
        if (marker) sequence.from(marker, { scale: 0.85, duration: 0.45, ease: "expo.out" });
        if (line) sequence.from(line, { scaleY: 0, transformOrigin: "top", duration: 0.65, ease: "power2.out" }, 0.15);
      });
    });

    media.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      const cleanups: (() => void)[] = [];
      root.querySelectorAll<HTMLElement>("[data-study]").forEach((study) => {
        const rotateX = gsap.quickTo(study, "rotationX", { duration: 0.65, ease: "power3.out" });
        const rotateY = gsap.quickTo(study, "rotationY", { duration: 0.65, ease: "power3.out" });
        gsap.set(study, { transformPerspective: 1000 });
        let bounds: DOMRect | null = null;
        const enter = () => { bounds = study.getBoundingClientRect(); };
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || !bounds) return;
          rotateX(gsap.utils.clamp(-2.5, 2.5, ((event.clientY - bounds.top) / bounds.height - 0.5) * -5));
          rotateY(gsap.utils.clamp(-2.5, 2.5, ((event.clientX - bounds.left) / bounds.width - 0.5) * 5));
        };
        const reset = () => { bounds = null; rotateX(0); rotateY(0); };
        study.addEventListener("pointerenter", enter);
        study.addEventListener("pointermove", move);
        study.addEventListener("pointerleave", reset);
        window.addEventListener("scroll", reset, { passive: true });
        cleanups.push(() => {
          study.removeEventListener("pointerenter", enter);
          study.removeEventListener("pointermove", move);
          study.removeEventListener("pointerleave", reset);
          window.removeEventListener("scroll", reset);
        });
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    });

    return () => media.revert();
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
