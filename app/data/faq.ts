export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  items: FAQItem[];
}

export const faqData: FAQData = {
  eyebrow: "Frequently asked questions",
  titlePrefix: "A few things you may want",
  titleHighlight: "to know.",
  description:
    "Answers to what families usually ask us before they start planning.",
  items: [
    {
      id: "faq-1",
      question: "How early should we start planning our event?",
      answer:
        "Starting early gives us more time to thoughtfully plan your venue, design, vendors, and overall experience. Timelines can vary depending on the scale of your celebration.",
    },
    {
      id: "faq-2",
      question: "Does Riwaaj handle the complete event?",
      answer:
        "Yes, we provide end-to-end planning, styling, vendor curation, and on-day execution so you can simply immerse yourself in the celebration without logistical worry.",
    },
    {
      id: "faq-3",
      question: "Can you create a completely custom event design?",
      answer:
        "Every celebration we design is bespoke. We tailor floral concepts, lighting architectures, staging, and color palettes to reflect your unique personal story.",
    },
    {
      id: "faq-4",
      question: "Can Riwaaj help us find and select a venue?",
      answer:
        "Absolutely. We have partnerships with premier luxury destinations, heritage palaces, and private estates across Nepal and destination wedding venues.",
    },
    {
      id: "faq-5",
      question: "Do you manage both intimate and large-scale events?",
      answer:
        "From intimate gatherings of 50 close family members to lavish 1,000+ guest grand weddings, our team scales seamlessly with dedicated production teams.",
    },
    {
      id: "faq-6",
      question: "How do we begin planning with Riwaaj?",
      answer:
        "You can reach out via our contact form or give us a call. We'll schedule a complimentary discovery session to discuss your vision, dates, and preliminary concepts.",
    },
  ],
};
