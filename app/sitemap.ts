import type { MetadataRoute } from "next";

import { SITE_URL } from "./lib/env";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/contact`, priority: 0.9 },
    { url: `${SITE_URL}/about`, priority: 0.8 },
    { url: `${SITE_URL}/services`, priority: 0.8 },
    { url: `${SITE_URL}/events`, priority: 0.8 },
  ];
}
