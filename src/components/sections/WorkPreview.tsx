import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { workPreview, collaborationPreview } from "@/data/work";
import { InquireLink, SelectServiceButton } from "./InquireLink";
import { NOT_SURE_ID } from "@/data/services";
import { WorkMotion } from "./WorkMotion";
import { Disclosure } from "@/components/ui/Disclosure";

function ConceptStudy({ packaging }: { packaging: boolean }) {
  return (
    <div data-study aria-hidden="true" className={`relative flex aspect-[5/4] min-h-80 w-full min-w-0 flex-col justify-center overflow-hidden rounded-[1.75rem] px-7 py-14 sm:min-h-0 sm:px-12 ${packaging ? "bg-lilac" : "bg-butter"}`}>
      <div className="absolute inset-x-7 top-7 flex justify-between gap-4 pb-3 text-xs text-ink-soft sm:inset-x-12 sm:top-10">
        <span>{packaging ? "Colour. Form. Feeling." : "A voice of your own."}</span><span>{packaging ? "Identity study" : "Brand study"}</span>
        <span data-study-rule className="absolute inset-x-0 bottom-0 h-px bg-ink/20" />
      </div>
      {packaging ? (
        <div className="relative mt-8 flex items-end justify-center gap-3 sm:gap-5">
          <div data-study-piece className="flex h-48 w-28 -rotate-6 flex-col justify-between bg-ink p-4 text-cream sm:h-64 sm:w-40 sm:p-6">
            <span className="font-display text-xs sm:text-sm">A thoughtful<br />little detail.</span>
            <span className="font-display text-2xl leading-[0.95] font-light tracking-tight text-butter sm:text-4xl">Made<br />to<br />matter.</span>
            <span className="text-xs">Packaging concept</span>
          </div>
          <div data-study-piece className="mb-3 flex h-36 w-28 rotate-6 flex-col justify-between bg-cream p-4 text-ink sm:h-48 sm:w-40 sm:p-6">
            <span className="font-display text-2xl leading-none font-medium sm:text-4xl">Small<br />details.<br />Big feeling.</span>
            <div className="flex gap-1.5"><span className="size-4 rounded-full bg-ink" /><span className="size-4 rounded-full bg-pink-deep" /><span className="size-4 rounded-full bg-lilac ring-1 ring-inset ring-ink/20" /></div>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-7 font-display text-[clamp(3.5rem,8vw,6rem)] leading-[0.92] font-light tracking-tight text-ink"><span data-study-type className="block">Show up.</span><span data-study-type className="block text-pink-deep">Be you.</span></p>
          <div className="mt-8 flex items-end justify-between gap-4 border-t border-ink/20 pt-4 sm:mt-10">
            <p className="max-w-36 text-xs leading-relaxed text-ink-soft">A clearer voice.<br />A more recognisable presence.</p>
            <span className="font-display text-4xl font-light text-ink">Aa</span>
          </div>
        </>
      )}
    </div>
  );
}

export function WorkPreview() {
  return (
    <WorkMotion>
      <section id="work" aria-labelledby="work-title" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 border-t border-ink/15 pt-10 sm:pt-14 md:grid-cols-12 md:items-end">
            <h2 id="work-title" className="max-w-3xl font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance text-ink sm:text-5xl md:col-span-7 lg:col-span-8 lg:text-6xl">{workPreview.heading}</h2>
            <div className="flex items-start gap-4 md:col-span-5 lg:col-span-4">
              <ArrowDownRight aria-hidden="true" className="mt-1 hidden size-6 shrink-0 text-pink-deep md:block" />
              <p className="max-w-sm text-sm leading-relaxed text-ink-soft">{workPreview.note}</p>
            </div>
          </div>
          <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24">
            {workPreview.projects.map((project, index) => (
              <article key={project.serviceId} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <figure className={`min-w-0 lg:col-span-7 ${index === 1 ? "lg:order-2" : ""}`}>
                  <ConceptStudy packaging={index === 1} />
                  <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 px-1 text-xs leading-relaxed text-ink-soft">
                    <span>{project.category}</span><span>Illustrative concept, not client work</span>
                  </figcaption>
                </figure>
                <div className={`min-w-0 lg:col-span-5 ${index === 1 ? "lg:order-1 lg:pr-4" : "lg:pl-4"}`}>
                  <h3 className="max-w-lg font-display text-3xl leading-[1.1] font-medium tracking-tight text-balance text-ink sm:text-4xl">{project.title}</h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft">{project.brief}</p>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft">{project.approach}</p>
                  <p className="mt-7 max-w-lg border-t border-ink/15 pt-5 text-sm leading-relaxed text-ink-soft">{project.deliverables}</p>
                  <div className="mt-6">
                    <Disclosure title="Explore the thinking">
                      <p>{project.exploration}</p>
                      <p className="mt-5 font-medium text-ink">The intended direction</p>
                      <p className="mt-2">{project.takeaway}</p>
                    </Disclosure>
                  </div>
                  <div className="mt-7"><InquireLink serviceId={project.serviceId} serviceTitle={project.category} /></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section aria-labelledby="process-title" className="px-4 pt-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2rem] bg-paper px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-16 lg:px-14 lg:py-16">
          <div className="lg:col-span-5">
            <h2 id="process-title" className="max-w-md font-display text-3xl leading-[1.08] font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">{collaborationPreview.heading}</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">{collaborationPreview.note}</p>
            <SelectServiceButton serviceId={NOT_SURE_ID} className="mt-8">Let&apos;s Talk <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></SelectServiceButton>
          </div>
          <ol className="lg:col-span-7">
            {collaborationPreview.steps.map((step, index) => (
              <li data-process-step key={step.title} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 pb-9 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
                {index < collaborationPreview.steps.length - 1 && <span data-process-line aria-hidden="true" className="absolute top-12 bottom-1 left-[1.375rem] w-px bg-ink/20 sm:left-6" />}
                <span data-process-marker aria-hidden="true" className="relative grid size-11 place-items-center rounded-full bg-cream font-display text-lg text-pink-deep ring-1 ring-ink/20 sm:size-12">0{index + 1}</span>
                <div className="pt-1.5">
                  <h3 className="font-display text-2xl leading-tight font-medium tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-ink-soft">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </WorkMotion>
  );
}
