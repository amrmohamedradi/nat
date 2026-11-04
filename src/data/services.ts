// Nat's services — the single source for the Services section AND the inquiry
// form dropdown. Add, remove or reorder entries here; `id` must stay unique
// and stable because it is what the form submits.
// Source: Instagram carousel "Here's What We Can Work On Together".

export type ServiceAccent = "butter" | "lime" | "sky" | "lilac";

export type Service = {
  id: string;
  title: string;
  description: string;
  accent: ServiceAccent;
};

export const services = [
  {
    id: "consultations-strategy",
    title: "Consultations & Strategy Building",
    description:
      "We pinpoint your challenges, uncover the opportunities, and build a clear plan to move forward.",
    accent: "butter",
  },
  {
    id: "online-presence",
    title: "Build Your Online Presence — for Personal Brands",
    description:
      "Building your online presence as a personal brand, starting from defining who you are and how you show up.",
    accent: "lime",
  },
  {
    id: "branding-packaging",
    title: "Branding & Packaging Design",
    description: "Visual identity, rebranding, and creative packaging design.",
    accent: "sky",
  },
  {
    id: "brand-experiences-events",
    title: "Brand Experiences & Events",
    description: "Creative ideas, activations, and events for brands.",
    accent: "lilac",
  },
] as const satisfies readonly Service[];

// Form-only choice for visitors who don't know where to start yet. Not shown as a service card.
export const NOT_SURE_ID = "not-sure";
export const NOT_SURE_TITLE = "Not sure yet, help me choose";

export type ServiceId = (typeof services)[number]["id"];
export type ServiceChoice = ServiceId | typeof NOT_SURE_ID;

export const serviceChoiceIds: [ServiceChoice, ...ServiceChoice[]] = [
  NOT_SURE_ID,
  ...services.map((s): ServiceChoice => s.id),
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

/** Display title for any form choice, including "not sure yet". */
export function getServiceTitle(id: string): string | undefined {
  return id === NOT_SURE_ID ? NOT_SURE_TITLE : getService(id)?.title;
}
