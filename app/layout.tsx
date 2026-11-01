import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

import { CustomCursor, PageTransition, SmoothScrollProvider } from "./component/animation";
import { Footer } from "./component/layout";
import LocalBusinessJsonLd from "./component/layout/LocalBusinessJsonLd";
import SiteEffects from "./component/layout/SiteEffects";
import { SITE_URL } from "./lib/env";
import { SiteProvider } from "./lib/site-context";
import { getSiteData } from "./lib/site-data";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/*
 * Every page is rendered per request, so what the office saves in the CMS is on the next load. It
 * also means building the site never needs the backend to be up.
 */
export const dynamic = "force-dynamic";

const TITLE = "Riwaaj Events | Luxury Wedding & Event Planning Itahari, Nepal";
const DESCRIPTION =
  "Tradition, beautifully reimagined. Bespoke wedding planning, venue styling, floral design, and luxury event production in Itahari, Nepal.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Riwaaj Events",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/site/assets/heroimage.webp"],
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteData();

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable} site-root h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteProvider site={site}>
          <div className="site min-h-screen flex flex-col bg-ivory text-charcoal" style={{ colorScheme: "light" }}>
            <SmoothScrollProvider>
              <PageTransition />
              <CustomCursor />
              <SiteEffects />
              {children}
              <Footer />
              <LocalBusinessJsonLd settings={site.settings} />
            </SmoothScrollProvider>
          </div>
        </SiteProvider>
      </body>
    </html>
  );
}
