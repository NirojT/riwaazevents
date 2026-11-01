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

const service = (title: string, description: string, tags: string[], image: string): ServiceListItem => ({
  id: serviceSlug(title),
  title,
  description,
  tags,
  image,
  imageAlt: title,
});

export const servicesListData: ServicesListData = {
  services: [
    {
      id: "wedding",
      number: "01",
      title: "Wedding",
      description:
        "From the first vision to the final send-off, we design and manage your entire wedding journey: rituals, timelines, vendors, budgets, and seamless day-of coordination.",
      tags: [
        "Full Wedding Planning",
        "Destination Weddings",
        "Mandap & Ritual Setup",
        "Day-of Coordination",
      ],
      image: "/assets/services/service-mandap.webp",
      imageAlt: "Royal traditional red floral mandap wedding setup by Riwaaj Events",
    },
    {
      id: "engagement",
      number: "02",
      title: "Engagement",
      description:
        "Celebrate the promise of forever with an elegant engagement ceremony, from intimate ring exchanges to grand family gatherings styled around your story.",
      tags: [
        "Ring Ceremony Planning",
        "Stage & Backdrop Styling",
        "Family Gatherings",
        "Theme Concepts",
      ],
      image: "/assets/story-bouquet.webp",
      imageAlt: "Bride holding a bouquet with engagement ring",
    },
    {
      id: "anniversary",
      number: "03",
      title: "Anniversary",
      description:
        "Honour the years you have shared with a celebration that feels personal, whether a candlelit dinner for two or a milestone party with everyone you love.",
      tags: [
        "Silver & Golden Jubilees",
        "Candlelight Dinners",
        "Surprise Celebrations",
        "Vow Renewals",
      ],
      image: "/assets/services/service-candelabra.webp",
      imageAlt: "Candlelit anniversary dinner table setting",
    },
    {
      id: "birthday",
      number: "04",
      title: "Birthday",
      description:
        "Joyful birthday celebrations for every age, with themed décor, cakes, entertainment, and activities planned so you can simply enjoy the day.",
      tags: [
        "Kids Theme Parties",
        "Milestone Birthdays",
        "Cake & Dessert Tables",
        "Games & Entertainment",
      ],
      image: "/assets/bts/bts-2.webp",
      imageAlt: "Guests celebrating with sparklers",
    },
    {
      id: "weaning-ceremony",
      number: "05",
      title: "Weaning Ceremony",
      description:
        "Mark your little one's first rice feeding (Pasni) with a warm, traditional celebration, thoughtfully arranged with rituals, décor, and hospitality for the whole family.",
      tags: [
        "Pasni / Annaprashan",
        "Ritual Arrangements",
        "Traditional Décor",
        "Family Hospitality",
      ],
      image: "/assets/story-culinary.webp",
      imageAlt: "Traditional food preparation for a weaning ceremony",
    },
    {
      id: "decoration",
      number: "06",
      title: "Decoration",
      description:
        "Transforming venues into immersive spaces with bespoke backdrops, floral installations, fabric draping, and signature details designed around your theme.",
      tags: [
        "Floral Installations",
        "Stage & Backdrops",
        "Fabric Draping",
        "Theme Styling",
      ],
      image: "/assets/story-florist.webp",
      imageAlt: "Luxury floral arrangements and ceremonial arch décor",
    },
    {
      id: "tents-catering",
      number: "07",
      title: "Tents & Catering",
      description:
        "Custom marquees and tent structures for any outdoor venue, paired with multi-course menus of authentic regional recipes and international cuisine served with warm hospitality.",
      tags: [
        "Marquees & Canopies",
        "Menu Curation & Tasting",
        "Live Food Counters",
        "Banquet Service",
      ],
      image: "/assets/bts/bts-4.webp",
      imageAlt: "Sailcloth marquee tent set up for an outdoor event",
    },
    {
      id: "photography-videography",
      number: "08",
      title: "Photography & Videography",
      description:
        "Capturing every emotion and detail with professional photographers and filmmakers, from candid moments to cinematic highlight films you will treasure forever.",
      tags: [
        "Candid Photography",
        "Cinematic Films",
        "Drone Coverage",
        "Albums & Edits",
      ],
      image: "/assets/bts/bts-1.webp",
      imageAlt: "Couple photographed under a floral arch",
    },
    {
      id: "makeup-mehendi",
      number: "09",
      title: "Makeup & Mehendi Artist",
      description:
        "Skilled makeup and mehendi artists for brides, grooms, and guests, creating looks and intricate henna designs that complement your celebration.",
      tags: [
        "Bridal Makeup",
        "Party & Family Makeup",
        "Bridal Mehendi",
        "Guest Mehendi",
      ],
      image: "/assets/gallery/g2.webp",
      imageAlt: "Bride with bridal makeup and mehendi beside the groom",
    },
    {
      id: "sound-lights",
      number: "10",
      title: "Sound System Design & Lights Arrangement",
      description:
        "Engineering the atmosphere with professional sound systems, stage lighting, chandeliers, and ambient mood lighting tailored to your venue and event.",
      tags: [
        "Professional Sound Systems",
        "Stage & Intelligent Lighting",
        "Chandeliers & Fairy Lights",
        "DJ Setup",
      ],
      image: "/assets/services/service-chandelier.webp",
      imageAlt: "Grand crystal chandelier illumination",
    },
    {
      id: "concerts-shows",
      number: "11",
      title: "Concerts & Shows Management",
      description:
        "End-to-end management of concerts, live shows, and cultural programs: stage production, ticketing support, crowd management, and backstage coordination.",
      tags: [
        "Stage Production",
        "Crowd Management",
        "Backstage Coordination",
        "Cultural Programs",
      ],
      image: "/assets/events/e5.webp",
      imageAlt: "Decorated stage with stage lighting",
    },
    {
      id: "artist-management",
      number: "12",
      title: "Artist Management",
      description:
        "Booking and managing singers, bands, dancers, and performers for your event, handling contracts, schedules, travel, and hospitality from start to finish.",
      tags: [
        "Artist Booking",
        "Live Bands & Singers",
        "Dancers & Performers",
        "Schedules & Hospitality",
      ],
      image: "/assets/events/e1.webp",
      imageAlt: "Portrait under dramatic event lighting",
    },
    service(
      "Wedding",
      "From the first meeting to the final farewell, we plan and run the whole wedding — rituals, venue, décor, food, guests and the day's timeline — so your family can be present for every moment.",
      ["Full Wedding Planning", "Rituals & Timeline", "Venue & Vendor Coordination", "Day-of Management"],
      "/site/assets/services/service-mandap.webp"
    ),
    service(
      "Engagement",
      "Ring ceremonies and sagai styled to your families' traditions — a stage that frames the moment, warm hospitality for both sides, and a programme that runs on time.",
      ["Ring Ceremony & Sagai", "Stage & Backdrop", "Guest Hospitality"],
      "/site/assets/events/e5.webp"
    ),
    service(
      "Anniversary",
      "Silver, golden or simply the next one — an intimate dinner or a full family gathering, designed around your story together.",
      ["Intimate Dinners", "Family Gatherings", "Themed Décor", "Surprise Planning"],
      "/site/assets/services/service-candelabra.webp"
    ),
    service(
      "Birthday",
      "Birthdays for every age, from a first birthday to a sixtieth — themed décor, the cake table, entertainment and food, all handled.",
      ["Themed Décor", "Kids' Parties", "Milestone Birthdays", "Entertainment"],
      "/site/assets/events/e3.webp"
    ),
    service(
      "Weaning Ceremony",
      "Pasni — your child's first rice feeding — celebrated with the rituals done right, a traditional setup and a feast for the whole family.",
      ["Pasni / Annaprashan", "Puja & Ritual Setup", "Family Feast"],
      "/site/assets/celebration/step-concept-planning-clean.webp"
    ),
    service(
      "Decoration",
      "Stage, mandap, entrance, flowers and lights — décor designed for your venue and theme, set up and taken down by our own team.",
      ["Stage & Mandap", "Floral Décor", "Entrance & Walkways", "Theme Styling"],
      "/site/assets/story-florist.webp"
    ),
    service(
      "Tents & Catering",
      "Tents and pandals for any ground, with seating, flooring and lighting — and catering from snacks to full multi-cuisine menus.",
      ["Tents & Pandals", "Seating & Flooring", "Catering & Menus", "Buffet Service"],
      "/site/assets/bts/bts-4.webp"
    ),
    service(
      "Photography & Videography",
      "Photos and films that keep the day — candid and traditional photography, cinematic video, and albums to hand down.",
      ["Candid Photography", "Traditional Coverage", "Cinematic Video", "Albums"],
      "/site/assets/events/e1.webp"
    ),
    service(
      "Makeup & Mehendi Artist",
      "Bridal and party makeup, hair, and mehendi artists for the bride, the family and the guests.",
      ["Bridal Makeup", "Party Makeup", "Hairstyling", "Mehendi"],
      "/site/assets/story-bouquet.webp"
    ),
    service(
      "Sound System Design & Lights Arrangement",
      "Sound and light planned for the space — clear sound for rituals and speeches, a full system for the dance floor, and lights that set the mood.",
      ["Sound System", "Stage Lighting", "DJ Setup", "Ambient Lighting"],
      "/site/assets/services/service-chandelier.webp"
    ),
    service(
      "Concerts & Shows Management",
      "Concerts, cultural programmes and live shows managed end to end — stage, sound and lights, entry and crowd flow, artists and the show schedule.",
      ["Stage & Production", "Entry & Crowd Flow", "Show Scheduling", "Backstage Coordination"],
      "/site/assets/bts/bts-2.webp"
    ),
    service(
      "Artist Management",
      "Singers, bands, dancers, DJs and hosts booked for your event — we look after the booking, the schedule and the timing on stage.",
      ["Singers & Bands", "Dancers", "DJs & Hosts", "Booking & Scheduling"],
      "/site/assets/idontknow.webp"
    ),
  ],
};
