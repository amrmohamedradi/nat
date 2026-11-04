import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import { body, display, script } from "./fonts";
import "./globals.css";

const title = "Nat. — Marketing & Branding";
const description = `${site.tagline}. ${site.heroSubtitle}`;

// Favicon comes from the app/icon.svg file convention (pink script mark).
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFBF5",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${script.variable} ${display.variable} ${body.variable} antialiased`}>
      <head>
        {/* Without JS, reveal-on-scroll content must still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
