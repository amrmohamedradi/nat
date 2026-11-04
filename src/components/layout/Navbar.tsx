"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/data/site";
import { INQUIRY_ANCHOR } from "@/lib/select-service";
import { InstagramIcon } from "./InstagramIcon";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SECTION_IDS = site.nav.map((item) => item.href.slice(1));

/**
 * Fixed top bar: transparent over the hero, translucent cream once scrolled. It slides away
 * while you read downward and returns the moment you scroll up (never near the top, while the
 * menu is open, or while keyboard focus is inside it). Mobile opens a full-width sheet.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(SECTION_IDS[0]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Reading progress: a pink line under the bar fills as the page scrolls (a direct mapping, not decoration).
  useGSAP(() => {
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
    );
  });

  // Scrolled state, plus scroll direction for tucking the bar away while reading down.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (y < 160) setTucked(false);
      else if (y > lastY + 8) setTucked(true);
      else if (y < lastY - 8) setTucked(false);
      if (Math.abs(y - lastY) > 8) lastY = y;
    };
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Active section: whichever section crosses the middle band of the viewport.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // While the sheet is open: lock scroll, make the page behind it inert, close on Escape, move focus into it.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const behind = document.querySelectorAll("main, footer");
    behind.forEach((el) => el.setAttribute("inert", ""));
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    // Close if the viewport grows past the mobile breakpoint.
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = overflow;
      behind.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  // Sheet links: release the scroll lock first, then scroll — a plain anchor jump
  // can be swallowed while body overflow is still hidden.
  function goTo(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    document.body.style.removeProperty("overflow");
    setOpen(false);
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href);
    });
  }

  const solid = scrolled || open;
  const hidden = tucked && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,translate] duration-500 ease-(--ease-out-quart) ${
        solid
          ? "border-b border-ink/10 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      } ${hidden ? "-translate-y-full focus-within:translate-y-0" : ""}`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-8"
      >
        <a href="#home" className="-ml-1 shrink-0 rounded-md p-1" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.svg"
            alt="Nat. — marketing with Nat"
            width={1224}
            height={728}
            unoptimized
            loading="eager"
            className="h-10 w-auto sm:h-11"
          />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative flex h-11 items-center px-4 font-display text-[0.95rem] tracking-wide transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-pink transition-[opacity,transform] duration-500 ease-(--ease-out-expo) ${
                      isActive ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-50"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LinkButton
            href={`#${INQUIRY_ANCHOR}`}
            className={`max-md:h-11 max-md:px-4 max-md:text-sm ${open ? "max-md:hidden" : ""}`}
          >
            Work With Me
          </LinkButton>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative -mr-2 grid size-12 place-items-center rounded-full transition-colors hover:bg-ink/5 md:hidden"
          >
            {/* Two-line burger that folds into an × */}
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-ink transition-transform duration-500 ease-(--ease-out-expo) ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] rounded-full bg-ink transition-[transform,width] duration-500 ease-(--ease-out-expo) ${
                  open ? "top-1/2 w-full -translate-y-1/2 -rotate-45" : "bottom-0 w-4"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <span
        ref={progressRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-pink"
      />

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        ref={sheetRef}
        hidden={!open}
        className="h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-ink/10 bg-cream motion-safe:animate-[nat-sheet-open_0.5s_var(--ease-out-expo)_both] md:hidden"
      >
        <div className="flex min-h-full flex-col px-4 pt-8 pb-10">
          <ul className="flex flex-col">
            {site.nav.map((item, i) => {
              const isActive = active === item.href.slice(1);
              return (
                <li
                  key={item.href}
                  className="motion-safe:animate-[nat-sheet-in_0.7s_var(--ease-out-expo)_both] border-b border-ink/10"
                  style={{ animationDelay: `${60 + i * 70}ms` }}
                >
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(e) => goTo(e, item.href)}
                    className="group flex items-baseline gap-4 py-5"
                  >
                    <span aria-hidden="true" className="w-10 font-display text-2xl leading-none font-light tracking-tighter text-pink-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[2.6rem] leading-none font-medium tracking-tight text-ink">
                      {item.label}
                    </span>
                    {isActive && (
                      <span aria-hidden="true" className="ml-auto size-2 self-center rounded-full bg-pink" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex flex-col gap-6 pt-12">
            <p className="font-display text-2xl leading-snug font-light text-ink-soft">
              {site.tagline.replace(/\s*Nat\.?$/, "")}{" "}
              <span className="font-script text-4xl leading-none font-normal text-pink">Nat.</span>
            </p>
            <LinkButton
              href={`#${INQUIRY_ANCHOR}`}
              onClick={(e) => goTo(e, `#${INQUIRY_ANCHOR}`)}
              className="w-full"
            >
              Work With Me
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </LinkButton>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 self-start text-sm text-ink-soft underline decoration-ink/20 underline-offset-4 hover:text-pink-deep hover:decoration-pink-deep"
            >
              <InstagramIcon aria-hidden="true" className="size-4" />
              {site.instagram.handle}
              <span className="sr-only"> (Instagram, opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

    </header>
  );
}
