"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { SiteData } from "./site-data-types";

const SiteContext = createContext<SiteData | null>(null);

/** Hands the content the layout read on the server to the sections, which are client components. */
export function SiteProvider({ site, children }: { site: SiteData; children: ReactNode }) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

/** Reads part of the site's content: `useSite((s) => s.settings)`. */
export function useSite<T>(select: (site: SiteData) => T): T {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite must be used inside SiteProvider");
  return select(site);
}
