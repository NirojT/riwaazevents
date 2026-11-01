import type { Metadata } from "next";
import { Navbar } from "./component/layout";
import { PromoPopup } from "./component/ui";
import {
  HomeHero,
  EventTicker,
  ServicesSection,
  EventManagementSection,
  FeaturedEventsSection,
  StartToCelebrationSection,
  TestimonialsSection,
  GallerySection,
  FAQSection,
  CTASection,
} from "./component/section";

export const metadata: Metadata = {
  title: "Riwaaj Events | Luxury Wedding & Event Planning Itahari, Nepal",
  description:
    "Tradition, beautifully reimagined. Bespoke wedding planning, venue styling, floral design, and luxury event production in Itahari, Nepal.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />

      <main className="flex-1">
        <HomeHero />
        <EventTicker />
        <ServicesSection />
        <EventManagementSection />
        <FeaturedEventsSection />
        <StartToCelebrationSection />
        <TestimonialsSection />
        <GallerySection />
        <FAQSection />
        <CTASection />
      </main>

      <PromoPopup />
    </div>
  );
}
