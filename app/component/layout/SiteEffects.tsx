"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Focus and visibilitychange fire together; calls this close are one refresh. */
const REUSE_MS = 2000;

/**
 * Mounted once, by the layout. Keeps an open tab in step with the CMS: coming back to it, say from
 * the admin after a save, re-reads the page from the server. Sections keep their state and scroll
 * position, because only the data they were given changes.
 */
export default function SiteEffects() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let refreshedAt = Date.now();
    const onReturn = () => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - refreshedAt < REUSE_MS) return;
      refreshedAt = Date.now();
      router.refresh();
    };
    document.addEventListener("visibilitychange", onReturn);
    window.addEventListener("focus", onReturn);
    // Back from another site restores this page as it was left, without a focus event.
    window.addEventListener("pageshow", onReturn);
    return () => {
      document.removeEventListener("visibilitychange", onReturn);
      window.removeEventListener("focus", onReturn);
      window.removeEventListener("pageshow", onReturn);
    };
  }, [router]);

  // A link like /services#floral-design lands on that row once the page has painted.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const timer = setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
    }, 350);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
