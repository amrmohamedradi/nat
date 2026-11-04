import { ArrowUpRight } from "lucide-react";
import { SignatureWrite } from "@/components/ui/SignatureWrite";
import { NOT_SURE_ID, services, type ServiceAccent } from "@/data/services";
import { InquireLink, SelectServiceButton } from "./InquireLink";
import { ServiceRows } from "./ServiceRows";

// Static class names so Tailwind can see them.
const accentSurface: Record<ServiceAccent, string> = {
  butter: "bg-butter",
  lime: "bg-lime",
  sky: "bg-sky",
  lilac: "bg-lilac",
};

/**
 * Services as an editorial index: four ruled rows, 01 to 04. Every row's content is always
 * visible; on hover its pastel sheet rises behind it (transform only) and the arrow turns.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2
              id="services-title"
              className="font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[1.02] font-medium tracking-tight text-balance text-ink"
            >
              Here&apos;s what we can work on{" "}
              <SignatureWrite className="font-script font-normal text-pink">together</SignatureWrite>
            </h2>
          </div>
          <div className="md:col-span-4 md:pb-3">
            <p className="max-w-sm text-base leading-relaxed text-ink-soft md:ml-auto">
              Pick a starting point below. Each one opens a conversation, and every plan is shaped
              around you.
            </p>
          </div>
        </div>

        <ServiceRows>
          {services.map((service, i) => (
            <li key={service.id} data-row className="group/card relative isolate">
              {/* The ink rule that draws in on scroll */}
              <span
                aria-hidden="true"
                data-rule
                className="absolute inset-x-0 top-0 h-px origin-left bg-ink/15"
              />
              {/* The pastel sheet that rises behind the row on hover */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 inset-y-2 -z-10 origin-bottom rounded-[1.75rem] transition-transform duration-700 ease-(--ease-out-expo) lg:scale-y-0 lg:group-hover/card:scale-y-100 ${accentSurface[service.accent]}`}
              />

              <article className="grid gap-x-10 gap-y-4 px-5 py-9 sm:px-6 sm:py-11 lg:grid-cols-[minmax(0,7rem)_minmax(0,1.15fr)_minmax(0,1fr)_auto] lg:items-center lg:py-12">
                <div data-rise className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-none font-light tracking-tighter text-ink transition-transform duration-700 ease-(--ease-out-expo) group-hover/card:translate-x-2"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  data-rise
                  className="max-w-md font-display text-2xl leading-tight font-semibold tracking-tight text-balance text-ink sm:text-[1.9rem]"
                >
                  {service.title}
                </h3>

                <p data-rise className="max-w-md text-base leading-relaxed text-ink-soft">
                  {service.description}
                </p>

                <div data-rise className="pt-2 lg:pt-0">
                  <InquireLink serviceId={service.id} serviceTitle={service.title} />
                </div>
              </article>
            </li>
          ))}
        </ServiceRows>

        <div className="mt-14 flex flex-col items-start gap-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl leading-snug font-light tracking-tight text-ink sm:text-3xl">
            Not sure where to begin? <span className="text-ink-soft">Let&apos;s figure it out together.</span>
          </p>
          <SelectServiceButton serviceId={NOT_SURE_ID} className="shrink-0">
            Help Me Choose
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-(--ease-out-quart) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </SelectServiceButton>
        </div>
      </div>
    </section>
  );
}
