import { about } from "@/data/experience";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-4 pt-20 pb-8 sm:px-8 sm:pt-28">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-ink/15 pt-10 md:grid-cols-12 md:gap-14">
        <h2 id="about-title" className="font-display text-4xl leading-[1.08] font-medium tracking-tight text-balance text-ink sm:text-5xl md:col-span-5">{about.heading}</h2>
        <div className="max-w-xl md:col-span-7 md:ml-auto">
          <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">{about.intro}</p>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">{about.body}</p>
          <p className="mt-6 text-sm font-medium text-pink-deep">{about.closing}</p>
        </div>
      </div>
    </section>
  );
}
