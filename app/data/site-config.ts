/**
 * The business details the website prints — phone, WhatsApp, email, address, hours, the Maps
 * link and the socials. The office edits them in Admin › Website; these are only the values the
 * site starts with (and keeps, if the server cannot be reached), and they match what the
 * backend seeds, so the first paint does not flip once the live copy arrives.
 */
export interface SiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  mapsUrl: string;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  tiktokUrl?: string | null;
  youtubeUrl?: string | null;
  pinterestUrl?: string | null;
}

export const defaultSiteSettings: SiteSettings = {
  businessName: "Riwaaj Events",
  tagline: "Tradition, beautifully reimagined.",
  phone: "+977 9804060401",
  whatsapp: "+977 9804060401",
  email: "hello@riwaajevents.com",
  address: "Itahari, Nepal",
  hours: "Sun – Fri · 10:00 – 18:00",
  mapsUrl: "https://maps.app.goo.gl/B4V1NdvXd2WRkqvT6",
  instagramUrl: "https://instagram.com/riwaajevents",
  facebookUrl: "https://facebook.com/riwaajevents",
  tiktokUrl: null,
  youtubeUrl: null,
  pinterestUrl: "https://pinterest.com/riwaajevents",
};

/** `tel:` target — the number with everything but digits and a leading + removed. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** wa.me wants the full international number as bare digits; a bare 10-digit Nepali mobile gets 977. */
export const whatsappHref = (number: string, text?: string) => {
  const raw = number.replace(/\D/g, "");
  const digits = raw.length === 10 ? `977${raw}` : raw;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};

/** The socials that are actually filled in, in a fixed order, labelled for the footer. */
export const socialLinks = (s: SiteSettings) =>
  (
    [
      ["INSTAGRAM", s.instagramUrl],
      ["FACEBOOK", s.facebookUrl],
      ["TIKTOK", s.tiktokUrl],
      ["YOUTUBE", s.youtubeUrl],
      ["PINTEREST", s.pinterestUrl],
    ] as const
  )
    .filter(([, href]) => !!href && href.trim() !== "")
    .map(([label, href]) => ({ label, href: href as string }));
