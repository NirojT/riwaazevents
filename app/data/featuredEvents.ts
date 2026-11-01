export interface FeaturedEventSlide {
  id: string;
  tag: string;
  number: string;
  title: string;
  description: string;
  location: string;
  guests: string;
  backgroundImage: string;
  thumbnails: string[];
}

export interface FeaturedEventsData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  slides: FeaturedEventSlide[];
}

export const featuredEventsData: FeaturedEventsData = {
  eyebrow: "Selected Celebrations",
  titlePrefix: "Events we’ve had the pleasure",
  titleHighlight: "of bringing to life.",
  description:
    "A closer look at some of the celebrations Riwaaj has planned, designed, and managed from beginning to end.",
  slides: [
    {
      id: "wedding",
      tag: "SIGNATURE WEDDING",
      number: "01 / 04",
      title: "An Evening Beneath A Thousand Lights",
      description:
        "An elegant evening brought together through thoughtful planning, warm lighting, beautiful décor, and seamless guest hospitality.",
      location: "Kathmandu, Nepal",
      guests: "500+ Guests",
      backgroundImage: "/site/assets/idontknow.webp",
      thumbnails: [
        "/site/assets/s1/s2.webp",
        "/site/assets/s1/s3.webp",
        "/site/assets/s1/s4.webp",
      ],
    },
    {
      id: "engagement",
      tag: "ENGAGEMENT",
      number: "02 / 04",
      title: "A Beautiful Beginning, Surrounded by Family",
      description:
        "An intimate celebration rich in warmth and heritage, weaving heartfelt rituals with timeless floral aesthetics.",
      location: "Itahari, Nepal",
      guests: "250+ Guests",
      backgroundImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920",
      thumbnails: [
        "/site/assets/s1/s1.webp",
        "/site/assets/s1/s2.webp",
        "/site/assets/s1/s3.webp",
      ],
    },
    {
      id: "reception",
      tag: "RECEPTION",
      number: "03 / 04",
      title: "An Evening Designed for Celebration",
      description:
        "A grand evening gala of music, culinary indulgence, and elevated hospitality under dramatic architectural lighting.",
      location: "Kathmandu, Nepal",
      guests: "600+ Guests",
      backgroundImage:
        "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1920",
      thumbnails: [
        "/site/assets/s1/s4.webp",
        "/site/assets/s1/s1.webp",
        "/site/assets/s1/s2.webp",
      ],
    },
    {
      id: "corporate",
      tag: "CORPORATE EVENT",
      number: "04 / 04",
      title: "Bringing People Together Beyond the Workplace",
      description:
        "Distinguished corporate retreat and gala dinner blending flawless technical coordination with executive ambiance.",
      location: "Lalitpur, Nepal",
      guests: "400+ Guests",
      backgroundImage:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920",
      thumbnails: [
        "/site/assets/s1/s3.webp",
        "/site/assets/s1/s4.webp",
        "/site/assets/s1/s1.webp",
      ],
    },
  ],
};
