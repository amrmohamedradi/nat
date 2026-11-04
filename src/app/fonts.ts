import localFont from "next/font/local";

// Brand typefaces from "Brand Identity/NAT - FONTS".
// Script headline — matches the hand-lettered "Nat" in the logo.
export const script = localFont({
  src: "../fonts/BirdsOfParadise.ttf",
  variable: "--font-script",
  display: "swap",
});

// English supporting display face.
export const display = localFont({
  src: [
    { path: "../fonts/AloeveraDisplay-Light.otf", weight: "300" },
    { path: "../fonts/AloeveraDisplay-Regular.otf", weight: "400" },
    { path: "../fonts/AloeveraDisplay-Medium.otf", weight: "500" },
    { path: "../fonts/AloeveraDisplay-SemiBold.otf", weight: "600" },
    { path: "../fonts/AloeveraDisplay-Bold.otf", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
});

// Body text (Graphik Arabic ships with Latin glyphs).
export const body = localFont({
  src: [
    { path: "../fonts/GraphikArabic-Light.ttf", weight: "300" },
    { path: "../fonts/GraphikArabic-Regular.ttf", weight: "400" },
    { path: "../fonts/GraphikArabic-Medium.ttf", weight: "500" },
    { path: "../fonts/GraphikArabic-Semibold.ttf", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
});
