import { cache } from "react";

import { faqData } from "../data/faq";
import { serviceSlug, servicesListData, type ServiceListItem } from "../data/servicesList";
import { defaultSiteSettings, type SiteSettings } from "../data/site-config";
import { teamData } from "../data/team";
import { testimonialsData } from "../data/testimonials";
import { API_URL } from "./env";
import type { PublicFunctionType, PublicGalleryItem, SiteContent, SiteData, SiteGallery } from "./site-data-types";

/*
 * Reads what the office edits in Admin › Website, once per page render, on the server. So the HTML
 * a visitor or a search engine receives already carries the live content, and a save shows on the
 * very next load: nothing here is cached, and that is deliberate. A stored copy of these answers
 * once kept a changed phone number and a hidden testimonial on the site after the office saved them.
 *
 * Every list falls back to the copy bundled in ../data, but the server's answer replaces it as it
 * is, an empty list included, because hiding every testimonial is a choice the office can make.
 * The gallery is the exception: designs start unticked, so a catalogue with nothing on the website
 * keeps the bundled showcase instead of an empty page.
 *
 * The backend takes the better part of a minute to restart. While it is away the site keeps serving
 * the last answer it got, not the bundled copy, which would put old details back on a live page.
 */

/** Long enough for a busy backend, short enough that a hung one can't hold a page open. */
const TIMEOUT_MS = 3000;

/** A photo we have no copy of falls back to the brand's own artwork rather than a broken tile. */
const PLACEHOLDER_IMAGE = "/site/assets/flower.webp";

interface PublicTestimonial {
  id: number;
  clientName: string;
  eventLabel?: string | null;
  quote: string;
  stars: number;
  image?: string | null;
}

interface PublicService {
  id: number;
  title: string;
  description?: string | null;
  highlights?: string[] | null;
  image?: string | null;
}

interface PublicFaq {
  id: number;
  question: string;
  answer: string;
}

interface PublicTeamMember {
  id: number;
  name: string;
  role?: string | null;
  bio?: string | null;
  image?: string | null;
}

interface PublicSiteRes {
  settings: SiteSettings;
  services?: PublicService[];
  testimonials: PublicTestimonial[];
  faqs: PublicFaq[];
  team: PublicTeamMember[];
  functionTypes: PublicFunctionType[];
}

interface PublicGalleryRes {
  categories: { id: number; name: string; count: number }[];
  items: PublicGalleryItem[];
}

const BUNDLED: SiteContent = {
  settings: defaultSiteSettings,
  services: servicesListData.services,
  testimonials: testimonialsData.items,
  faqs: faqData.items,
  team: teamData.members,
  functionTypes: [],
};

/**
 * The last good answers. On globalThis because the server may load this module once per route
 * bundle, and an answer remembered by one page has to be there for the next.
 */
const lastKnown = globalThis as typeof globalThis & {
  __riwaajSite?: SiteContent;
  __riwaajGallery?: SiteGallery | null;
};

async function read<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}/api/v1/public/${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`/public/${path} answered ${res.status}`);
  const body = (await res.json()) as { data?: T } | T;
  return (body && typeof body === "object" && "data" in body ? body.data : body) as T;
}

/** The page anchor (/services#wedding) is the title's slug, so a footer link survives a reorder. */
function toServiceItems(services: PublicService[]): ServiceListItem[] {
  const seen = new Map<string, number>();
  return services.map((s) => {
    const base = serviceSlug(s.title) || `service-${s.id}`;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return {
      id: n === 1 ? base : `${base}-${n}`,
      title: s.title,
      description: s.description ?? "",
      tags: s.highlights ?? [],
      image: s.image || PLACEHOLDER_IMAGE,
      imageAlt: s.title,
    };
  });
}

/** A blank field from the server means "not set", so the bundled default shows instead. */
function stripEmpty(s: SiteSettings): Partial<SiteSettings> {
  const out: Partial<SiteSettings> = {};
  for (const [k, v] of Object.entries(s)) {
    const key = k as keyof SiteSettings;
    const isSocial = key.endsWith("Url") && key !== "mapsUrl";
    // A cleared social really is gone; a cleared phone is a mistake the site should not print.
    if (isSocial) (out as Record<string, unknown>)[key] = v || null;
    else if (typeof v === "string" && v.trim() !== "") (out as Record<string, unknown>)[key] = v;
  }
  return out;
}

function toContent(data: PublicSiteRes): SiteContent {
  return {
    settings: { ...defaultSiteSettings, ...stripEmpty(data.settings) },
    // An older backend without the list keeps the bundled services up.
    services: data.services ? toServiceItems(data.services) : BUNDLED.services,
    testimonials: (data.testimonials ?? []).map((t) => ({
      id: String(t.id),
      event: t.eventLabel ?? "",
      quote: t.quote,
      stars: t.stars,
      clientName: t.clientName,
      image: t.image || PLACEHOLDER_IMAGE,
    })),
    faqs: (data.faqs ?? []).map((f) => ({ id: String(f.id), question: f.question, answer: f.answer })),
    team: (data.team ?? []).map((m) => ({
      id: String(m.id),
      name: m.name,
      role: m.role ?? undefined,
      description: m.bio ?? "",
      image: m.image || PLACEHOLDER_IMAGE,
      imageAlt: m.name,
    })),
    functionTypes: data.functionTypes ?? [],
  };
}

function toGallery(data: PublicGalleryRes): SiteGallery | null {
  const items = data?.items ?? [];
  // Every design unticked: back to the bundled showcase.
  if (items.length === 0) return null;
  return {
    categories: [
      { label: "All", value: "all" },
      ...(data.categories ?? []).map((c) => ({ label: c.name, value: c.name })),
    ],
    items: items.map((d) => ({
      id: String(d.id),
      title: d.name,
      category: d.categoryName ?? "",
      image: d.cover || d.images?.[0] || PLACEHOLDER_IMAGE,
      images: d.images?.length ? d.images : undefined,
    })),
    featured: items.filter((d) => d.featured),
  };
}

/** Shared by the layout and anything else in one render, so a page costs one read of each. */
export const getSiteData = cache(async (): Promise<SiteData> => {
  const [site, gallery] = await Promise.allSettled([
    read<PublicSiteRes>("site"),
    read<PublicGalleryRes>("gallery"),
  ]);

  if (site.status === "fulfilled" && site.value?.settings) {
    lastKnown.__riwaajSite = toContent(site.value);
  } else {
    console.warn("Website details unavailable, serving the last-known copy.", site.status === "rejected" ? site.reason : "");
  }
  if (gallery.status === "fulfilled") {
    lastKnown.__riwaajGallery = toGallery(gallery.value);
  }

  return {
    ...(lastKnown.__riwaajSite ?? BUNDLED),
    gallery: lastKnown.__riwaajGallery ?? null,
    year: new Date().getFullYear(),
  };
});
