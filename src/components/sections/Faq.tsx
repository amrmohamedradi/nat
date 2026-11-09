import { faq } from "@/data/experience";
import { Disclosure } from "@/components/ui/Disclosure";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-4 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 id="faq-title" className="max-w-md font-display text-4xl leading-[1.08] font-medium tracking-tight text-balance text-ink sm:text-5xl lg:col-span-5">{faq.heading}</h2>
        <div className="border-b border-ink/15 lg:col-span-7">
          {faq.items.map((item) => <Disclosure key={item.question} title={item.question}><p className="max-w-xl">{item.answer}</p></Disclosure>)}
        </div>
      </div>
    </section>
  );
}
