import localFont from "next/font/local";

// Brand typefaces from "Brand Identity/NAT - FONTS", converted to woff2 and subset to Latin
// (originals stay in the brand folder). Only the weights the site uses are loaded.
// Script headline — matches the hand-lettered "Nat" in the logo.
export const script = localFont({
  src: "../fonts/BirdsOfParadise.woff2",
  variable: "--font-script",
  display: "swap",
});

// English supporting display face.
export const display = localFont({
  src: [
    { path: "../fonts/AloeveraDisplay-Light.woff2", weight: "300" },
    { path: "../fonts/AloeveraDisplay-Regular.woff2", weight: "400" },
    { path: "../fonts/AloeveraDisplay-Medium.woff2", weight: "500" },
    { path: "../fonts/AloeveraDisplay-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-display",
  display: "swap",
});

// Body text (Graphik Arabic, Latin glyphs only): 400 for reading, 500 for labels and buttons.
export const body = localFont({
  src: [
    { path: "../fonts/GraphikArabic-Regular.woff2", weight: "400" },
    { path: "../fonts/GraphikArabic-Medium.woff2", weight: "500" },
  ],
  variable: "--font-body",
  display: "swap",
});
