// Editorial draft based on Nat's existing service descriptions.
export const about = {
  heading: "A brand that feels like you.",
  intro: "I'm Nat. I work with personal brands and businesses on the strategy, identity and presence that bring their vision into focus.",
  body: "Our starting point is you: what you want to say, who you want to reach and where you want to go. From there, we can connect the thinking behind your brand with the way it shows up.",
  closing: "Your vision. A thoughtful direction. A touch of Nat.",
};

export const serviceDetails: Record<string, { fit: string; outcomes: string[] }> = {
  "consultations-strategy": {
    fit: "You have a brand or an idea, but need help deciding what to focus on next.",
    outcomes: ["A clearer view of your audience and priorities", "A proposed brand direction", "Practical next steps to discuss together"],
  },
  "online-presence": {
    fit: "You are a creator, founder or professional who wants a more focused online presence.",
    outcomes: ["Personal brand positioning", "Voice and content direction", "Content pillars to guide how you show up"],
  },
  "branding-packaging": {
    fit: "You are launching a product or want your existing identity and packaging to feel connected.",
    outcomes: ["A visual identity direction", "Colour and typography exploration", "Packaging concepts and brand applications"],
  },
  "brand-experiences-events": {
    fit: "You want people to experience your brand beyond its online presence.",
    outcomes: ["An activation or event concept", "An audience experience direction", "Creative touchpoints that connect the experience"],
  },
};

export const faq = {
  heading: "A few things you might be wondering.",
  items: [
    { question: "Can we work together if I'm just starting?", answer: "You can get in touch with an early idea or an existing brand. Tell me where you are now and what you would like help with, so we can explore a suitable starting point." },
    { question: "What if I don't know which service I need?", answer: "Choose ‘Not sure yet, help me choose’ in the inquiry form. A little context about your brand and goals is enough to start the conversation." },
    { question: "Can I ask about more than one service?", answer: "Yes. Select all the services you are interested in. Your inquiry can bring strategy, online presence and design into the same conversation." },
    { question: "What will my project include?", answer: "The service details show possible areas of support. The exact scope, deliverables and timing need to be agreed for your project before work begins." },
    { question: "How do I find out about pricing and timing?", answer: "Share your goals and any target date in the inquiry form. Pricing and availability can then be discussed in relation to the work you have in mind." },
    { question: "What happens after I send an inquiry?", answer: "I'll reply to the email address you provide so we can discuss your goals and a possible next step. Sending an inquiry starts a conversation; it does not book or purchase a service." },
  ],
};

export const inquiryNext = {
  heading: "What happens next?",
  body: "I'll reply by email to talk through your goals and a possible next step. We'll discuss scope, timing and pricing before you decide to move forward.",
  note: "An inquiry starts a conversation. It does not book or purchase a service.",
};

export type Testimonial = { quote: string; name: string; context: string };
// Add approved client words here. No empty section is shown to visitors.
export const testimonials: Testimonial[] = [];
