import { ArrowUpRight } from "lucide-react";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

// Inquiry section: editorial copy on the left, form card on the right (stacked on mobile).
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start lg:pt-6">
          <p className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.22em] text-ink-soft uppercase sm:text-xs">
            <span aria-hidden="true" className="h-px w-8 bg-pink" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-6 font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            Let&apos;s work together{" "}
            <span className="mt-1 block font-script text-6xl leading-none font-normal text-pink sm:text-7xl lg:text-8xl">
              Nat.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            Tell me about your brand and what you&apos;d like to build — I&apos;ll reply to the email you
            leave below.
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:text-pink-deep hover:decoration-pink-deep"
          >
            Prefer Instagram? {site.instagram.handle}
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-(--ease-out-quart) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl bg-white/80 p-5 shadow-[0_30px_60px_-40px_rgb(6_52_68/0.35)] ring-1 ring-ink/10 sm:p-8 lg:p-10">
            <InquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
