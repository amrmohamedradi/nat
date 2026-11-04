"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The footer element, with two guards for the large-screen curtain (.footer-curtain in
 * globals.css): it only engages while the footer fits the viewport (data-fits), so nothing is
 * ever clipped, and when keyboard focus enters the footer the page scrolls to the end so the
 * focused link is never left underneath the lifting page sheet.
 */
export function FooterCurtain({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      el.dataset.fits = String(el.offsetHeight <= window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);

    const onFocusIn = () => {
      if (getComputedStyle(el).position !== "sticky") return;
      const end = document.scrollingElement?.scrollHeight ?? document.body.scrollHeight;
      window.scrollTo({ top: end, behavior: "instant" });
    };
    el.addEventListener("focusin", onFocusIn);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      el.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  return (
    <footer ref={ref} className={className}>
      {children}
    </footer>
  );
}
