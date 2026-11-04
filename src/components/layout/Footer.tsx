import Image from "next/image";
import { cacheLife } from "next/cache";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { SignatureWrite } from "@/components/ui/SignatureWrite";
import { buttonClasses } from "@/components/ui/Button";
import { site } from "@/data/site";
import { INQUIRY_ANCHOR } from "@/lib/select-service";
import { FooterCurtain } from "./FooterCurtain";
import { InstagramIcon } from "./InstagramIcon";

// Cached so prerendering stays deterministic under cacheComponents; refreshes daily.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

/**
 * The letter's last page. On large screens the page lifts off it like a curtain (see
 * .footer-curtain in globals.css); the closing line ends with the final "Nat." signature.
 */
export function Footer() {
  return (
    <FooterCurtain className="footer-curtain relative isolate overflow-hidden bg-ink text-cream [&_:focus-visible]:outline-cream">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-8 sm:px-8 sm:pt-28">
        {/* Closing line */}
        <p className="max-w-5xl font-display text-[clamp(2.4rem,6.4vw,6rem)] leading-[1.02] font-light tracking-tight text-balance">
          Your vision with a touch of{" "}
          <SignatureWrite className="font-script font-normal text-pink">Nat.</SignatureWrite>
        </p>

        <div className="mt-14 grid gap-12 border-t border-cream/15 pt-12 sm:mt-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <a href="#home" className="inline-block rounded-md">
              <Image
                src="/brand/logo-white.svg"
                alt="Nat. — marketing with Nat"
                width={1224}
                height={728}
                unoptimized
                className="h-14 w-auto sm:h-16"
              />
            </a>
            <div className="mt-8">
            <a href={`#${INQUIRY_ANCHOR}`} className={buttonClasses("onInk")}>
              Work With Me
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-(--ease-out-quart) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 min-[420px]:grid-cols-2 md:col-span-6">
            <nav aria-label="Footer">
              <p className="text-[0.7rem] font-medium tracking-[0.22em] text-cream/65 uppercase">Explore</p>
              <ul className="mt-4 flex flex-col">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group inline-flex h-11 items-center font-display text-lg text-cream/85 transition-colors hover:text-butter"
                    >
                      <span className="transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1.5">
                        {item.label}
                      </span>
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

        <div className="mt-16 flex items-center justify-between gap-4 border-t border-cream/15 pt-6 text-sm text-cream/60 sm:mt-24">
          <p>
            © <CopyrightYear /> Nat. All rights reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="group grid size-12 shrink-0 place-items-center rounded-full ring-1 ring-cream/25 transition-[background-color,color,box-shadow] duration-300 ease-(--ease-out-quart) hover:bg-cream hover:text-ink hover:ring-cream"
          >
            <ArrowUp
              aria-hidden="true"
              className="size-4 transition-transform duration-500 ease-(--ease-out-expo) group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </FooterCurtain>
  );
}
