export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  caption?: string;
}

export interface GalleryData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  row1: GalleryItem[];
  row2: GalleryItem[];
}

export const galleryData: GalleryData = {
  eyebrow: "Our Gallery",
  titlePrefix: "Moments that are deserved",
  titleHighlight: "to be remembered",
  description:
    "A glimpse at the celebrations, experiences, and memories we've created along the way.",
  row1: [
    {
      id: "row1-1",
      image: "/site/assets/gallery/g1.webp",
      alt: "Outdoor wedding ceremony setup",
      caption: "Floral Canopy & Ceremony",
    },
    {
      id: "row1-2",
      image: "/site/assets/gallery/g3.webp",
      alt: "Celebration moments with warm lighting",
      caption: "Golden Hour Celebration",
    },
    {
      id: "row1-3",
      image: "/site/assets/gallery/g6.webp",
      alt: "Bridal portrait under floral installation",
      caption: "Lush Floral Arch",
    },
    {
      id: "row1-4",
      image: "/site/assets/gallery/g2.webp",
      alt: "Traditional wedding couple portrait",
      caption: "Heritage Regalia",
    },
    {
      id: "row1-5",
      image: "/site/assets/gallery/g4.webp",
      alt: "Grand crystal chandelier hall reception",
      caption: "Grand Ballroom Chandelier",
    },
    {
      id: "row1-6",
      image: "/site/assets/gallery/g5.webp",
      alt: "Artisanal culinary preparation and plating",
      caption: "Fine Culinary Arts",
    },
  ],
  row2: [
    {
      id: "row2-1",
      image: "/site/assets/events/e2.webp",
      alt: "Royal celebration stage decor",
      caption: "Royal Stage Design",
    },
    {
      id: "row2-2",
      image: "/site/assets/events/e3.webp",
      alt: "Evening open-air lawn celebration",
      caption: "Evening Garden Soiree",
    },
    {
      id: "row2-3",
      image: "/site/assets/gallery/g8.webp",
      alt: "Intricate floral and lighting setup",
      caption: "Luminous Wedding Stage",
    },
    {
      id: "row2-4",
      image: "/site/assets/events/e4.webp",
      alt: "Grand ballroom dining and tablescape",
      caption: "Banquet Hall Ambience",
    },
    {
      id: "row2-5",
      image: "/site/assets/events/e6.webp",
      alt: "Floral arrangement and event styling",
      caption: "Bespoke Floral Accents",
    },
    {
      id: "row2-6",
      image: "/site/assets/events/e7.webp",
      alt: "Warm ambient celebration reception",
      caption: "Night Reception Lights",
    },
  ],
};
