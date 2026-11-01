import type { Metadata } from "next";
import { Navbar } from "../component/layout";
import {
  AboutHero,
  AboutStorySection,
  TeamSection,
  FAQSection,
  StatsSection,
  BehindTheScenesSection,
  CTASection,
} from "../component/section";

export const metadata: Metadata = {
  title: "About Us | Riwaaj Events Nepal - Event Planning & Management",
  description:
    "Riwaaj is a full-service event management company helping families, couples, and businesses plan and manage memorable events across Nepal.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />

      <main className="flex-1">
        <AboutHero />
        <AboutStorySection />
        <TeamSection />
        <FAQSection
          eyebrow="Our values"
          titlePrefix="A few things you may want"
          titleHighlight="to know."
          description="Answers to what families usually ask us before they start planning."
          watermarkPosition="left"
        />
        <StatsSection />
        <BehindTheScenesSection />
        <CTASection />
      </main>
    </div>
  );
}
