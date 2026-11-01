export interface TestimonialItem {
  id: string;
  event: string;
  quote: string;
  stars: number;
  clientName: string;
  image: string;
  avatar?: string;
}

export interface TestimonialsData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  items: TestimonialItem[];
}

export const testimonialsData: TestimonialsData = {
  eyebrow: "Client Stories",
  titlePrefix: "Celebrations remembered,",
  titleHighlight: "In their own words",
  description:
    "A glimpse at the celebrations, experiences, and memories we've created along the way.",
  items: [
    {
      id: "kushal-lamarkatel",
      event: "Itahari wedding 2019",
      quote:
        "\u201CFor once, we weren\u2019t worried about the wedding about how will it be and how to manage it. We were simply living it.\u201D",
      stars: 5,
      clientName: "Kushal Lamarkatel",
      image: "/site/assets/testimonial.webp",
      avatar: "/site/assets/testimonial.webp",
    },
    {
      id: "Bipin Subedi",
      event: "Kathmandu reception 2022",
      quote:
        "\u201CEvery single detail was taken care of. From the flowers to the lighting, everything felt like a dream we didn\u2019t want to wake up from.\u201D",
      stars: 5,
      clientName: "Priya Sharma",
      image: "/site/assets/gallery/g2.webp",
      avatar: "/site/assets/gallery/g2.webp",
    },
    {
      id: "anish-thapa",
      event: "Pokhara engagement 2023",
      quote:
        "\u201CThey turned our vision into something even more beautiful than we imagined. Our guests are still talking about it.\u201D",
      stars: 5,
      clientName: "Anish Thapa",
      image: "/site/assets/venue/v2.webp",
      avatar: "/site/assets/venue/v2.webp",
    },
  ],
};
