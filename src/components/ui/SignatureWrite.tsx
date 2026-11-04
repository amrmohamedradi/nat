"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SignatureWriteProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Script text that writes itself in when it scrolls into view: a feathered stroke
 * sweeping left to right (see .ink-reveal in globals.css). Offscreen at mount, so GSAP
 * sets the hidden start without a flash; with reduced motion it simply stays visible.
 */
export function SignatureWrite({ className = "", children }: SignatureWriteProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { "--ink": "0%", filter: "blur(5px)" },
          {
            "--ink": "118%",
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      <span className="ink-reveal">{children}</span>
    </span>
  );
}
