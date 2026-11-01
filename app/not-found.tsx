import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "./component/layout";

export const metadata: Metadata = { title: "Page not found | Riwaaj Events" };

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-32 md:py-40 text-center">
        <div className="max-w-xl">
          <p className="font-body text-[11px] md:text-xs font-semibold tracking-[0.28em] text-gold uppercase">
            Page not found
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl text-charcoal">This page isn&apos;t here</h1>
          <p className="mt-4 font-body text-sm md:text-base text-site-muted">
            It may have moved. Everything we do is a step away from the home page.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block font-body text-xs font-semibold tracking-[0.2em] text-charcoal uppercase underline underline-offset-4 decoration-gold hover:text-gold"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
