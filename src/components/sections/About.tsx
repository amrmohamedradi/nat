import { about } from "@/data/experience";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="about-sheet bg-butter px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:items-start md:gap-16">
        <h2 id="about-title" className="max-w-xl font-display text-[clamp(3.2rem,7vw,6rem)] leading-[0.98] font-light tracking-tight text-balance text-ink md:col-span-6">{about.heading}</h2>
        <div className="max-w-xl border-t border-ink/25 pt-6 md:col-span-6 md:mt-3 md:ml-auto">
          <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">{about.intro}</p>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">{about.body}</p>
          <p className="mt-6 text-sm font-medium text-ink">{about.closing}</p>
        </div>
      </div>
    </section>
  );
}
