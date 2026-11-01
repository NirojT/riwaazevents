import { socialLinks, type SiteSettings } from "../../data/site-config";
import { SITE_URL } from "../../lib/env";

/** Search engines' business card — name, phone, address and socials, from the live details. */
export default function LocalBusinessJsonLd({ settings }: { settings: SiteSettings }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "EventPlanner",
    name: settings.businessName,
    description: settings.tagline,
    telephone: settings.phone,
    email: settings.email,
    address: settings.address,
    hasMap: settings.mapsUrl,
    url: SITE_URL,
    image: `${SITE_URL}/site/assets/reallogo.webp`,
    sameAs: socialLinks(settings).map((s) => s.href),
  };
  // "<" escaped so nothing typed into a field can close the script tag.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
