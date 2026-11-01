"use client";

import React, { useEffect, useRef } from "react";
import Image from "../ui/Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { isReducedMotion } from "../animation";

export interface AboutHeroProps {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string | string[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  minHeight?: string;
  children?: React.ReactNode;
}

export default function AboutHero({
  badge = "ABOUT US",
  titleLine1 = "We plan the event.",
  titleLine2 = "You enjoy the celebration.",
  subtitle = "Riwaaj is a full-service event management company helping families, couples, and businesses plan and manage memorable events across Nepal.",
  imageSrc = "/site/assets/aboutus.webp",
  imageAlt = "Riwaaj Events Grand Celebration",
  className = "",
  minHeight = "min-h-dvh",
  children,
}: AboutHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgMediaRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLSpanElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step 1: Background image scales smoothly from 1.05 to 1
      if (bgMediaRef.current) {
        tl.fromTo(
          bgMediaRef.current,
          { scale: 1.05 },
          { scale: 1, duration: 1.8, ease: "power3.out" },
          0
        );
      }

      // Step 2: Overlay fades in smoothly
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0.4 },
          { opacity: 1, duration: 1.4, ease: "power2.out" },
          0.1
        );
      }

      // Step 3: Badge / Eyebrow fade-in
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.3
        );
      }

      // Step 4: Headline line 1 masked reveal
      if (line1Ref.current) {
        tl.fromTo(
          line1Ref.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.45
        );
      }

      // Step 5: Headline line 2 (gold italic) masked reveal
      if (line2Ref.current) {
        tl.fromTo(
          line2Ref.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.65
        );
      }

      // Step 6: Description subtitle fade-up
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.85
        );
      }

      // Step 7: Optional custom children content
      if (childrenRef.current) {
        tl.fromTo(
          childrenRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          1.0
        );
      }

      // Subtle Controlled Parallax on Desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (bgMediaRef.current && sectionRef.current) {
          gsap.fromTo(
            bgMediaRef.current,
            { yPercent: 0 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative ${minHeight} flex items-end justify-start overflow-hidden bg-maroon-dark ${className}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={bgMediaRef} className="relative h-full w-full will-change-transform">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div ref={overlayRef} className="absolute inset-0 z-1 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-t from-black/92 via-black/50 to-black/35 md:from-black/85 md:via-black/30 md:to-black/45" />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/40 to-transparent md:from-black/70 md:via-black/20" />
        </div>
      </div>

      <Container size="wide" className="relative z-10 pb-14 sm:pb-18 md:pb-22 pt-32 sm:pt-36 md:pt-40">
        <div className="max-w-3xl md:max-w-4xl text-left">
          {badge && (
            <div className="overflow-hidden mb-2.5 sm:mb-3">
              <span
                ref={badgeRef}
                className="font-body text-xs md:text-sm font-medium tracking-[0.24em] text-white-text/80 uppercase block will-change-transform"
              >
                {badge}
              </span>
            </div>
          )}

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white-text leading-[1.15] tracking-wide mb-3">
            {titleLine1 && (
              <span className="block overflow-hidden py-0.5">
                <span ref={line1Ref} className="block will-change-transform">
                  {titleLine1}
                </span>
              </span>
            )}

            {titleLine2 && (
              <span className="block overflow-hidden py-0.5">
                <span
                  ref={line2Ref}
                  className="font-editorial italic font-normal text-gold-light block will-change-transform"
                >
                  {titleLine2}
                </span>
              </span>
            )}
          </h1>

          {subtitle && (
            <div
              ref={subtitleRef}
              className="font-editorial text-sm sm:text-base md:text-lg text-white-text/85 leading-relaxed max-w-xl md:max-w-2xl font-normal will-change-transform space-y-3 sm:space-y-4"
            >
              {Array.isArray(subtitle) ? (
                subtitle.map((text, idx) => <p key={idx}>{text}</p>)
              ) : typeof subtitle === "string" && subtitle.includes("\n\n") ? (
                subtitle.split("\n\n").map((text, idx) => <p key={idx}>{text}</p>)
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}

          {children && (
            <div ref={childrenRef} className="mt-6 sm:mt-8 will-change-transform">
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
