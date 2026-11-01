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
