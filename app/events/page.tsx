import type { Metadata } from "next";
import { Navbar } from "../component/layout";
import {
  EventHero,
  EventsGallerySection,
  CTASection,
  FAQSection,
} from "../component/section";

export const metadata: Metadata = {
  title: "Our Events | Riwaaj Events Nepal - Every Event Tells a Different Story",
  description:
    "Explore unforgettable weddings, galas, and bespoke celebrations curated by Riwaaj Events across Nepal. Every celebration is tailored to your unique love story.",
};

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />

      <main className="flex-1">
        <EventHero />
        <EventsGallerySection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
}
