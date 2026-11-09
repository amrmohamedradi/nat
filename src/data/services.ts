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
      "For a brand that needs a clearer direction. We explore your challenges, audience and priorities to shape a practical plan for what comes next.",
    accent: "butter",
  },
  {
    id: "online-presence",
    title: "Build Your Online Presence — for Personal Brands",
    description:
      "For creators, founders and professionals ready to show up with purpose. We explore your positioning, voice and content direction so your online presence feels like you.",
    accent: "lime",
  },
  {
    id: "branding-packaging",
    title: "Branding & Packaging Design",
    description: "For businesses creating a new look or rethinking an existing one. Explore a visual identity and packaging direction that bring your brand story together.",
    accent: "sky",
  },
  {
    id: "brand-experiences-events",
    title: "Brand Experiences & Events",
    description: "For brands looking to connect with people beyond the screen. Explore an activation or event concept built around your audience and the experience you want to create.",
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
