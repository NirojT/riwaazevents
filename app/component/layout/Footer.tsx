"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import Logo from "../ui/Logo";
import { footerData } from "../../data/footer";
import { socialLinks, telHref } from "../../data/site-config";
import { useSite } from "../../lib/site-context";
import { isReducedMotion } from "../animation";

/** How many services the footer lists before "All services". */
const FOOTER_SERVICES = 5;

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const settings = useSite((st) => st.settings);
  // The first few services, in the office's order — the column stays a short list.
  const services = useSite((st) => st.services);
  const year = useSite((st) => st.year);
  const footerServices = services.slice(0, FOOTER_SERVICES);

  useEffect(() => {
    const el = footerRef.current;
    if (!el || isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cols = el.querySelectorAll(".footer-col");
      if (cols.length) {
        gsap.fromTo(
          cols,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-maroon-dark text-white-text pt-16 md:pt-20 pb-10 md:pb-12 border-t border-white-text/10"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 md:pb-16 border-b border-white-text/10">
          <div className="footer-col md:col-span-4 space-y-6 will-change-transform">
            <Logo theme="dark" size="lg" />

            <p className="font-editorial italic text-lg md:text-xl text-gold-light/90 font-normal leading-relaxed max-w-sm">
              {settings.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              {socialLinks(settings).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs uppercase tracking-[0.2em] text-white-text/60 hover:text-gold transition-colors duration-200"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col md:col-span-2 md:pl-2 will-change-transform">
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-5">
              MENU
            </h3>
            <ul className="space-y-3">
              {footerData.menuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-xs md:text-sm text-white-text/75 hover:text-gold transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col md:col-span-3 md:pl-2 will-change-transform">
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-5">
              SERVICES
            </h3>
            <ul className="space-y-3">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="font-body text-xs md:text-sm text-white-text/75 hover:text-gold transition-colors duration-200 inline-block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              {services.length > FOOTER_SERVICES && (
                <li>
                  <Link
                    href="/services"
                    className="font-body text-xs md:text-sm text-gold/90 hover:text-gold transition-colors duration-200 inline-block"
                  >
                    All services →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="footer-col md:col-span-3 md:pl-2 will-change-transform">
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-5">
              CONTACT
            </h3>
            <div className="space-y-3 font-body text-xs md:text-sm text-white-text/75">
              <div>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-gold transition-colors duration-200 block"
                >
                  {settings.email}
                </a>
              </div>
              <div>
                <a
                  href={telHref(settings.phone)}
                  className="hover:text-gold transition-colors duration-200 block"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="text-white-text/60">
                {settings.address}
              </div>
              <div className="text-white-text/60">
                {settings.hours}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] md:text-xs tracking-[0.2em] uppercase text-white-text/50 font-body">
          <p>© {year} {footerData.bottomBar.copyright}</p>
          <div className="flex items-center gap-6">
            <p>{footerData.bottomBar.location}</p>
            <Link href="/sign-in" className="text-white-text/30 hover:text-gold transition-colors duration-200">
              Staff login
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
