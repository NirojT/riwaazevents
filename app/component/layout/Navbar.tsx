"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone, MapPin } from "lucide-react";
import gsap from "gsap";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { navigationData } from "../../data/navigation";
import { telHref } from "../../data/site-config";
import { useSite } from "../../lib/site-context";
import { MagneticButton, isReducedMotion } from "../animation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const settings = useSite((st) => st.settings);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Soft entrance on initial load
    if (headerRef.current && !isReducedMotion()) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.1 }
      );
    }

    let lastScrolled = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  // Close drawer on page route navigation (incl. browser back/forward)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white-text/10 py-1.5 md:py-2 shadow-sm"
          : "bg-linear-to-b from-black/70 via-black/30 to-transparent py-2 md:py-3"
        }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between">
          <Logo size="md" className="z-10" />

          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
          >
            {navigationData.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative font-body text-xs font-medium tracking-[0.22em] transition-colors duration-200 py-1 ${isActive
                    ? "text-gold font-medium"
                    : "text-white-text/85 hover:text-gold"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-4">
            <a
              href={settings.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={navigationData.location.label}
              aria-label={navigationData.location.label}
              className="p-2 sm:p-2.5 rounded-full text-white-text/80 hover:text-gold hover:bg-white-text/10 border border-white-text/15 hover:border-gold/50 transition-all duration-300 group flex items-center justify-center backdrop-blur-xs"
            >
              <MapPin className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-gold transition-transform duration-300 group-hover:scale-115" />
            </a>

            <div className="hidden md:block">
              <MagneticButton strength={0.16}>
                <Button
                  href={navigationData.cta.href}
                  variant="outline"
                  size="sm"
                  theme="dark"
                  className="py-3! md:py-3.5! px-6 md:px-7"
                >
                  {navigationData.cta.label}
                </Button>
              </MagneticButton>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md transition-colors text-white-text hover:bg-white-text/10 focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </Container>

      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${mobileMenuOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
          }`}
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ease-out ${mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          aria-hidden="true"
        />

        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-xs sm:max-w-sm h-dvh bg-maroon-dark/98 backdrop-blur-2xl border-l border-white-text/15 shadow-[-16px_0_36px_rgba(0,0,0,0.6)] flex flex-col justify-between p-6 sm:p-8 transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between pb-6 border-b border-white-text/10">
            <Logo size="sm" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full text-white-text hover:text-gold hover:bg-white-text/10 transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 pt-6 sm:pt-8 pb-4 flex flex-col justify-start space-y-1.5 overflow-y-auto">
            {navigationData.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-body text-sm sm:text-base font-medium tracking-[0.2em] py-3.5 border-b border-white-text/10 transition-all flex items-center justify-between group ${isActive ? "text-gold font-semibold" : "text-white-text hover:text-gold"
                    }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isActive ? "text-gold" : "text-gold/70"
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white-text/10 space-y-5">
            <Button
              href={navigationData.cta.href}
              variant="outline"
              size="lg"
              theme="dark"
              className="w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navigationData.cta.label}
            </Button>

            <div className="text-xs text-white-text/75 space-y-2.5">
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-gold transition-colors group"
              >
                <MapPin className="h-3.5 w-3.5 text-gold shrink-0 transition-transform group-hover:scale-110" />
                <span className="tracking-wider">{settings.address} (Find on Maps)</span>
              </a>
              <a
                href={telHref(settings.phone)}
                className="flex items-center gap-2.5 hover:text-gold transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="tracking-wider">{settings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
