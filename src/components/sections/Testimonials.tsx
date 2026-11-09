import { testimonials } from "@/data/experience";

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section aria-labelledby="testimonials-title" className="px-4 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-7xl border-t border-ink/15 pt-10">
        <h2 id="testimonials-title" className="font-display text-4xl font-medium tracking-tight text-ink">In their words.</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure key={`${item.name}-${item.context}`}>
              <blockquote className="max-w-xl font-display text-2xl leading-relaxed text-ink">“{item.quote}”</blockquote>
              <figcaption className="mt-5 text-sm text-ink-soft"><span className="font-medium text-ink">{item.name}</span><span className="mt-1 block">{item.context}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
