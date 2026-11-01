import type { EventGalleryItem } from "../data/eventsGallery";
import type { FAQItem } from "../data/faq";
import type { ServiceListItem } from "../data/servicesList";
import type { SiteSettings } from "../data/site-config";
import type { TeamMember } from "../data/team";
import type { TestimonialItem } from "../data/testimonials";

export interface PublicFunctionType {
  id: number;
  name: string;
}

export interface PublicGalleryItem {
  id: number;
  name: string;
  categoryName?: string | null;
  cover: string;
  images: string[];
  featured: boolean;
}

export interface SiteGallery {
  categories: { label: string; value: string }[];
  items: EventGalleryItem[];
  /** Featured designs, for the home-page strip. */
  featured: PublicGalleryItem[];
}

/** What the office edits in Admin › Website. */
export interface SiteContent {
  settings: SiteSettings;
  services: ServiceListItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  team: TeamMember[];
  functionTypes: PublicFunctionType[];
}

/** Everything the site's sections read. A null gallery means the bundled showcase stays up. */
export interface SiteData extends SiteContent {
  gallery: SiteGallery | null;
  /** For the footer. Read per request, so a long-running server doesn't keep last year's. */
  year: number;
}
