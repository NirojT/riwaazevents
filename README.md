# Riwaaj Events website

The public site: home, about, services, events and contact. Its content is edited in the admin app
under **Website**, and the gallery shows designs ticked "Show on website" in the catalogue.

## Running it

```bash
cp .env.example .env.local   # point API_URL at the backend
npm install
npm run dev
```

The site works with the backend down: it shows the copy bundled in `app/data`, so a build never
needs the backend. See `.env.example` for what each setting does.

## How the CMS connects

- `app/lib/site-data.ts` reads `GET /api/v1/public/site` and `/public/gallery` on the server, once
  per page render, and maps them to what the sections show. `app/layout.tsx` hands the result to the
  sections through `useSite()`.
- **Nothing is cached, on purpose.** A save in the admin shows on the next page load, and
  `SiteEffects` refreshes an open tab when someone comes back to it. Don't add `revalidate` or
  `force-cache` to these reads: a stored copy once kept an old phone number on the live site.
- If the backend can't be reached, the site keeps serving the last answer it got, and the bundled
  copy only if it has never had one.
- Lists from the server replace the bundled ones as they are, so an emptied list hides its section.
  The gallery is the exception: with no design ticked, the bundled showcase stays up.
- The contact form posts through a server action (`app/lib/enquiry.ts`) to `/public/enquiries`,
  passing on the visitor's address because the backend rate-limits by caller.

Images in the CMS are stored as `/site/assets/...` or as uploaded URLs, so `public/site` has to stay
at that path.
