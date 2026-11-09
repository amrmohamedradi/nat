// Site-wide brand content. Edit here — components read from this file.
// Source: marketinggwithnat-services.md (Instagram account details).

export const site = {
  name: "Nat.",
  heroHeadline: "Hello, this is Nat.",
  tagline: "Your vision with a touch of Nat",
  // Draft intro — based on the account's stated focus (marketing & branding
  // for personal brands). Nat should confirm or rewrite this line.
  heroSubtitle:
    "Marketing, branding and strategy for personal brands and businesses ready to be seen.",
  heroPhoto: {
    src: "/brand/nat-cutout.webp", // cut out of the original portrait (Brand Identity/Photos/Hero.png)
    alt: "Nat smiling with arms crossed, wearing a white shirt",
  },
  // `||` (not `??`) so an empty env value also falls back.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  instagram: {
    handle: "@marketinggwithnat",
    url: "https://www.instagram.com/marketinggwithnat",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
