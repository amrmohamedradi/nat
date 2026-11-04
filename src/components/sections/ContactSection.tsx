import { ArrowUpRight } from "lucide-react";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { SignatureWrite } from "@/components/ui/SignatureWrite";
import { WordsRise } from "@/components/ui/WordsRise";
import { site } from "@/data/site";
import { INQUIRY_ANCHOR } from "@/lib/select-service";

// Inquiry section: editorial copy on the left, form card on the right (stacked on mobile).
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start lg:pt-6">
          <h2
            id="contact-title"
            className="font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            <WordsRise text="Let's work together." />
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            Tell me about your brand and what you&apos;d like to build. I&apos;ll reply to the email you
            leave here.
          </p>
          {/* The letter's sign-off: the one script moment in this section. */}
          <p className="mt-8 font-display text-xl font-light text-ink-soft">
            Speak soon,
            <SignatureWrite className="mt-1 block font-script text-7xl leading-none font-normal text-pink lg:text-8xl">
              Nat.
            </SignatureWrite>
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
          <div
            id={INQUIRY_ANCHOR}
            className="rounded-3xl bg-field/80 p-5 shadow-panel ring-1 ring-ink/10 sm:p-8 lg:p-10"
          >
            <InquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
