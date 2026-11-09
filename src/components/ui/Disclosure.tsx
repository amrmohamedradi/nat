import { Plus } from "lucide-react";
import type { ReactNode } from "react";

export function Disclosure({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group/disclosure border-t border-ink/15 text-ink">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left font-medium marker:content-none [&::-webkit-details-marker]:hidden">
        {title}
        <Plus aria-hidden="true" className="size-5 shrink-0 text-pink-deep transition-transform duration-300 group-open/disclosure:rotate-45" />
      </summary>
      <div className="pb-6 text-base leading-relaxed text-ink-soft">{children}</div>
    </details>
  );
}
