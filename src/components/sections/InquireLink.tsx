"use client";

import { ArrowUpRight } from "lucide-react";
import { selectService } from "@/lib/select-service";

type InquireLinkProps = {
  serviceId: string;
  serviceTitle: string;
};

/** Jumps to the inquiry form and preselects this service there. */
export function InquireLink({ serviceId, serviceTitle }: InquireLinkProps) {
  return (
    <a
      href="#contact"
      onClick={() => selectService(serviceId)}
      className="group/inquire inline-flex h-12 items-center gap-3 rounded-full py-1 pr-1 pl-5 text-[0.95rem] font-medium text-ink ring-1 ring-ink/15 transition-[background-color,box-shadow] duration-300 ease-(--ease-out-quart) hover:bg-ink hover:text-cream hover:ring-ink active:scale-[0.97]"
    >
      Inquire<span className="sr-only"> about {serviceTitle}</span>
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-full bg-ink text-cream transition-[background-color,color,transform] duration-500 ease-(--ease-out-expo) group-hover/card:rotate-45 group-hover/inquire:bg-pink group-hover/inquire:text-ink"
      >
        <ArrowUpRight className="size-4" />
      </span>
    </a>
  );
}
