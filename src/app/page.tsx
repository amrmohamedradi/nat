import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-cream"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
