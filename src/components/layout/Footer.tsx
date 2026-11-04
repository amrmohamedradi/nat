import Image from "next/image";
import { cacheLife } from "next/cache";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { InstagramIcon } from "./InstagramIcon";

// Cached so prerendering stays deterministic under cacheComponents; refreshes daily.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-cream [&_:focus-visible]:outline-cream">
      {/* Oversized script mark, faint, bleeding off the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[30%] -bottom-[8%] -z-10 aspect-[1224/530] w-[130vw] bg-pink/10 md:-right-[6%] md:w-[60vw] md:max-w-[60rem]"
        style={{
          maskImage: "url(/brand/nat-mark.svg)",
          WebkitMaskImage: "url(/brand/nat-mark.svg)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-8 sm:px-8 sm:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <a href="#home" className="inline-block rounded-md">
              <Image
                src="/brand/logo-white.svg"
                alt="Nat. — marketing with Nat"
                width={1224}
                height={728}
                unoptimized
                className="h-16 w-auto sm:h-20"
              />
            </a>
            <p className="mt-8 max-w-md font-display text-3xl leading-tight font-light tracking-tight sm:text-4xl">
              {site.tagline}
              <span className="text-pink">.</span>
            </p>
            <a
              href="#contact"
              className="group mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-cream px-6 text-[0.95rem] font-medium text-ink transition-[background-color,transform] duration-300 ease-(--ease-out-quart) hover:bg-butter active:scale-[0.97] sm:h-13 sm:px-7"
            >
              Work With Me
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-(--ease-out-quart) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 min-[420px]:grid-cols-2 md:col-span-5 md:pt-4">
            <nav aria-label="Footer">
              <p className="text-[0.7rem] font-medium tracking-[0.22em] text-cream/65 uppercase">Explore</p>
              <ul className="mt-4 flex flex-col">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex h-11 items-center font-display text-lg text-cream/85 transition-colors hover:text-butter"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[0.7rem] font-medium tracking-[0.22em] text-cream/65 uppercase">Follow</p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-cream/85 transition-colors hover:text-butter"
              >
                <InstagramIcon aria-hidden="true" className="size-4 shrink-0" />
                <span className="break-words">{site.instagram.handle}</span>
                <span className="sr-only">(Instagram, opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-4 border-t border-cream/15 pt-6 text-sm text-cream/60 sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> Nat. All rights reserved.
          </p>
          <a href="#home" className="inline-flex h-11 items-center gap-2 self-start hover:text-cream sm:self-auto">
            Back to top
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
