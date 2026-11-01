/**
 * Where the site finds its backend, and what it calls itself. Both are read on the server at run
 * time, so one build can be promoted between environments. API_URL has no NEXT_PUBLIC_ prefix on
 * purpose: the browser only ever talks to this site, never to the backend.
 */
export const API_URL = (process.env.API_URL ?? "http://localhost:9004").replace(/\/+$/, "");

export const SITE_URL = (process.env.SITE_URL ?? "https://riwaajevents.com").replace(/\/+$/, "");
