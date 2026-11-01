import type { Metadata } from "next";
import { Navbar } from "../component/layout";
import {
  ServicesHero,
  ServicesListSection,
  FAQSection,
  CTASection,
} from "../component/section";

export const metadata: Metadata = {
  title: "Our Services | Riwaaj Events Nepal - Everything Your Celebration Needs",
  description:
    "Weddings, engagements, anniversaries, birthdays and pasni, with decoration, tents and catering, photography, makeup and mehendi, sound and lights, concerts and artist management — Riwaaj Events, Nepal.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />

      <main className="flex-1">
        <ServicesHero />
        <ServicesListSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
}
