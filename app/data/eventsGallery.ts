export interface EventGalleryItem {
  id: string;
  title: string;
  /** A design category name once the gallery comes from the catalogue. */
  category: string;
  /** Only the bundled showcase has one; designs carry no place. */
  location?: string;
  image: string;
  images?: string[];
  aspect?: string;
}

export interface EventsGalleryData {
  categories: { label: string; value: string; count?: number }[];
  items: EventGalleryItem[];
}

export const eventsGalleryData: EventsGalleryData = {
  categories: [
    { label: "All", value: "all" },
    { label: "Wedding", value: "Wedding" },
    { label: "Engagement", value: "Engagement" },
    { label: "Corporate", value: "Corporate" },
    { label: "Private Events", value: "Private Events" },
  ],
  items: [
    {
      id: "event-1",
      title: "The Candle Night Dinner",
      category: "Private Events",
      location: "Kathmandu",
      image: "/site/assets/services/service-candelabra.webp",
      images: [
        "/site/assets/services/service-candelabra.webp",
        "/site/assets/services/service-chandelier.webp",
        "/site/assets/story-culinary.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-2",
      title: "The JK's Engagement Event",
      category: "Engagement",
      location: "Itahari",
      image: "/site/assets/bts/bts-2.webp",
      images: [
        "/site/assets/bts/bts-2.webp",
        "/site/assets/bts/bts-1.webp",
        "/site/assets/events/e8.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-3",
      title: "The Wedding Soiree",
      category: "Wedding",
      location: "Itahari",
      image: "/site/assets/gallery/g4.webp",
      images: [
        "/site/assets/gallery/g4.webp",
        "/site/assets/gallery/g2.webp",
        "/site/assets/events/e1.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-4",
      title: "Amick's Engagement Ceremony",
      category: "Engagement",
      location: "Lalitpur",
      image: "/site/assets/bts/bts-1.webp",
      images: [
        "/site/assets/bts/bts-1.webp",
        "/site/assets/bts/bts-3.webp",
        "/site/assets/events/e9.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-5",
      title: "Royal Mandap Celebration",
      category: "Wedding",
      location: "Dharan",
      image: "/site/assets/events/e2.webp",
      images: [
        "/site/assets/events/e2.webp",
        "/site/assets/services/service-mandap.webp",
        "/site/assets/events/e5.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-6",
      title: "Grand Ballroom Gala",
      category: "Corporate",
      location: "Kathmandu",
      image: "/site/assets/gallery/g1.webp",
      images: [
        "/site/assets/gallery/g1.webp",
        "/site/assets/events/e4.webp",
        "/site/assets/services/service-chandelier.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-7",
      title: "Botanical Garden Reception",
      category: "Wedding",
      location: "Pokhara",
      image: "/site/assets/events/e3.webp",
      images: [
        "/site/assets/events/e3.webp",
        "/site/assets/gallery/g6.webp",
        "/site/assets/story-florist.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-8",
      title: "Canopy & Fairy Lights Array",
      category: "Corporate",
      location: "Itahari",
      image: "/site/assets/bts/bts-4.webp",
      images: [
        "/site/assets/bts/bts-4.webp",
        "/site/assets/events/e7.webp",
        "/site/assets/services/service-candelabra.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-9",
      title: "Candlelit Altar & Drapes",
      category: "Wedding",
      location: "Biratnagar",
      image: "/site/assets/gallery/g8.webp",
      images: [
        "/site/assets/gallery/g8.webp",
        "/site/assets/story-bouquet.webp",
        "/site/assets/events/e6.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-10",
      title: "Palace Courtyard Mandap",
      category: "Wedding",
      location: "Kathmandu",
      image: "/site/assets/venue/v1.webp",
      images: [
        "/site/assets/venue/v1.webp",
        "/site/assets/venue/v2.webp",
        "/site/assets/venue/v3.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-11",
      title: "Heritage Sandstone Pavilion",
      category: "Private Events",
      location: "Bhaktapur",
      image: "/site/assets/idontknow.webp",
      images: [
        "/site/assets/idontknow.webp",
        "/site/assets/venue/v4.webp",
        "/site/assets/services/service-chandelier.webp",
      ],
      aspect: "aspect-[4/5]",
    },
    {
      id: "event-12",
      title: "Architectural Golden Stage",
      category: "Corporate",
      location: "Kathmandu",
      image: "/site/assets/services/service-chandelier.webp",
      images: [
        "/site/assets/services/service-chandelier.webp",
        "/site/assets/gallery/g9.webp",
        "/site/assets/bts/bts-4.webp",
      ],
      aspect: "aspect-[4/5]",
    },
  ],
};
