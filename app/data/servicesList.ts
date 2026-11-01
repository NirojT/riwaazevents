/**
 * The Services page's list. The office edits it in Admin › Website; this is only the copy the
 * page starts with (and keeps, if the server cannot be reached), and it matches what the backend
 * seeds (WebsiteSeeder), so the first paint does not flip. A service's number on the page is its
 * position, and its anchor (/services#wedding) is its title's slug.
 */
export interface ServiceListItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

export interface ServicesListData {
  services: ServiceListItem[];
}

/** "Tents & Catering" → "tents-catering". */
export const serviceSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const servicesListData: ServicesListData = {
  services: [
    {
      id: "wedding",
      title: "Wedding",
      description:
        "From the first vision to the final send-off, we design and manage your entire wedding journey: rituals, timelines, vendors, budgets, and seamless day-of coordination.",
      tags: [
        "Full Wedding Planning",
        "Destination Weddings",
        "Mandap & Ritual Setup",
        "Day-of Coordination",
      ],
      image: "/site/assets/services/service-mandap.webp",
      imageAlt: "Royal traditional red floral mandap wedding setup by Riwaaj Events",
    },
    {
      id: "engagement",
      title: "Engagement",
      description:
        "Celebrate the promise of forever with an elegant engagement ceremony, from intimate ring exchanges to grand family gatherings styled around your story.",
      tags: [
        "Ring Ceremony Planning",
        "Stage & Backdrop Styling",
        "Family Gatherings",
        "Theme Concepts",
      ],
      image: "/site/assets/story-bouquet.webp",
      imageAlt: "Bride holding a bouquet with engagement ring",
    },
    {
      id: "anniversary",
      title: "Anniversary",
      description:
        "Honour the years you have shared with a celebration that feels personal, whether a candlelit dinner for two or a milestone party with everyone you love.",
      tags: [
        "Silver & Golden Jubilees",
        "Candlelight Dinners",
        "Surprise Celebrations",
        "Vow Renewals",
      ],
      image: "/site/assets/services/service-candelabra.webp",
      imageAlt: "Candlelit anniversary dinner table setting",
    },
    {
      id: "birthday",
      title: "Birthday",
      description:
        "Joyful birthday celebrations for every age, with themed décor, cakes, entertainment, and activities planned so you can simply enjoy the day.",
      tags: [
        "Kids Theme Parties",
        "Milestone Birthdays",
        "Cake & Dessert Tables",
        "Games & Entertainment",
      ],
      image: "/site/assets/bts/bts-2.webp",
      imageAlt: "Guests celebrating with sparklers",
    },
    {
      id: "weaning-ceremony",
      title: "Weaning Ceremony",
      description:
        "Mark your little one's first rice feeding (Pasni) with a warm, traditional celebration, thoughtfully arranged with rituals, décor, and hospitality for the whole family.",
      tags: [
        "Pasni / Annaprashan",
        "Ritual Arrangements",
        "Traditional Décor",
        "Family Hospitality",
      ],
      image: "/site/assets/story-culinary.webp",
      imageAlt: "Traditional food preparation for a weaning ceremony",
    },
    {
      id: "decoration",
      title: "Decoration",
      description:
        "Transforming venues into immersive spaces with bespoke backdrops, floral installations, fabric draping, and signature details designed around your theme.",
      tags: [
        "Floral Installations",
        "Stage & Backdrops",
        "Fabric Draping",
        "Theme Styling",
      ],
      image: "/site/assets/story-florist.webp",
      imageAlt: "Luxury floral arrangements and ceremonial arch décor",
    },
    {
      id: "tents-catering",
      title: "Tents & Catering",
      description:
        "Custom marquees and tent structures for any outdoor venue, paired with multi-course menus of authentic regional recipes and international cuisine served with warm hospitality.",
      tags: [
        "Marquees & Canopies",
        "Menu Curation & Tasting",
        "Live Food Counters",
        "Banquet Service",
      ],
      image: "/site/assets/bts/bts-4.webp",
      imageAlt: "Sailcloth marquee tent set up for an outdoor event",
    },
    {
      id: "photography-videography",
      title: "Photography & Videography",
      description:
        "Capturing every emotion and detail with professional photographers and filmmakers, from candid moments to cinematic highlight films you will treasure forever.",
      tags: [
        "Candid Photography",
        "Cinematic Films",
        "Drone Coverage",
        "Albums & Edits",
      ],
      image: "/site/assets/bts/bts-1.webp",
      imageAlt: "Couple photographed under a floral arch",
    },
    {
      id: "makeup-mehendi-artist",
      title: "Makeup & Mehendi Artist",
      description:
        "Skilled makeup and mehendi artists for brides, grooms, and guests, creating looks and intricate henna designs that complement your celebration.",
      tags: [
        "Bridal Makeup",
        "Party & Family Makeup",
        "Bridal Mehendi",
        "Guest Mehendi",
      ],
      image: "/site/assets/gallery/g2.webp",
      imageAlt: "Bride with bridal makeup and mehendi beside the groom",
    },
    {
      id: "sound-system-design-lights-arrangement",
      title: "Sound System Design & Lights Arrangement",
      description:
        "Engineering the atmosphere with professional sound systems, stage lighting, chandeliers, and ambient mood lighting tailored to your venue and event.",
      tags: [
        "Professional Sound Systems",
        "Stage & Intelligent Lighting",
        "Chandeliers & Fairy Lights",
        "DJ Setup",
      ],
      image: "/site/assets/services/service-chandelier.webp",
      imageAlt: "Grand crystal chandelier illumination",
    },
    {
      id: "concerts-shows-management",
      title: "Concerts & Shows Management",
      description:
        "End-to-end management of concerts, live shows, and cultural programs: stage production, ticketing support, crowd management, and backstage coordination.",
      tags: [
        "Stage Production",
        "Crowd Management",
        "Backstage Coordination",
        "Cultural Programs",
      ],
      image: "/site/assets/events/e5.webp",
      imageAlt: "Decorated stage with stage lighting",
    },
    {
      id: "artist-management",
      title: "Artist Management",
      description:
        "Booking and managing singers, bands, dancers, and performers for your event, handling contracts, schedules, travel, and hospitality from start to finish.",
      tags: [
        "Artist Booking",
        "Live Bands & Singers",
        "Dancers & Performers",
        "Schedules & Hospitality",
      ],
      image: "/site/assets/events/e1.webp",
      imageAlt: "Portrait under dramatic event lighting",
    },
  ],
};
