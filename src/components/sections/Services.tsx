import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { services, type ServiceAccent } from "@/data/services";
import { InquireLink } from "./InquireLink";

// Static class names so Tailwind can see them.
const accentSurface: Record<ServiceAccent, string> = {
  butter: "bg-butter",
  lime: "bg-lime",
  sky: "bg-sky",
  lilac: "bg-lilac",
};

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <p className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.22em] text-ink-soft uppercase sm:text-xs">
              <span aria-hidden="true" className="h-px w-8 bg-pink" />
              Services
              <span className="text-pink-deep">({String(services.length).padStart(2, "0")})</span>
            </p>
            <h2
              id="services-title"
              className="mt-6 font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[1.02] font-medium tracking-tight text-ink"
            >
              Here&apos;s what we can work on{" "}
              <span className="font-script font-normal text-pink">together</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:pb-3">
            <p className="max-w-sm text-base leading-relaxed text-ink-soft md:ml-auto">
              Pick a starting point below. Each one opens a conversation, and every plan is shaped
              around you.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-4 sm:mt-20 sm:gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={(i % 2) * 120} className="flex">
              <article
                className={`group/card relative flex w-full flex-col overflow-hidden rounded-[1.75rem] p-6 transition-transform duration-500 ease-(--ease-out-expo) hover:-translate-y-1.5 sm:rounded-[2.25rem] sm:p-10 ${accentSurface[service.accent]}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <span
                    aria-hidden="true"
                    className="font-display text-[clamp(3.5rem,9vw,6rem)] leading-none font-light tracking-tighter text-ink"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2 size-2.5 rounded-full bg-pink opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                  />
                </div>

                <h3 className="mt-14 max-w-md font-display text-2xl leading-tight font-semibold tracking-tight text-ink sm:mt-20 sm:text-[1.9rem]">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink/80">{service.description}</p>

                <div className="mt-auto pt-10">
                  <InquireLink serviceId={service.id} serviceTitle={service.title} />
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 flex flex-col items-start gap-6 border-t border-ink/10 pt-10 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl leading-snug font-light tracking-tight text-ink sm:text-3xl">
            Not sure where to begin? <span className="text-ink-soft">Let&apos;s figure it out together.</span>
          </p>
          <LinkButton href="#contact" className="shrink-0">
            Work With Me
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-(--ease-out-quart) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}
