"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { MagneticButton, isReducedMotion } from "../animation";

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgMediaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  // Guarantee continuous video playback across browsers and mobile devices
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser requires user gesture
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Cinematic Timeline on Load
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step 1: Background video subtly scales from 1.04 -> 1 over 1.8s
      if (bgMediaRef.current) {
        tl.fromTo(
          bgMediaRef.current,
          { scale: 1.04 },
          { scale: 1, duration: 1.8, ease: "power3.out" },
          0
        );
      }

      // Step 2: Dark overlay gently fades into its final opacity
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0.35 },
          { opacity: 1, duration: 1.5, ease: "power2.out" },
          0.1
        );
      }

      // Step 3: Main heading line 1 masked reveal
      if (line1Ref.current) {
        tl.fromTo(
          line1Ref.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.35
        );
      }

      // Step 4: Highlighted italic/gold line 2 reveals slightly after
      if (line2Ref.current) {
        tl.fromTo(
          line2Ref.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.55
        );
      }

      // Step 5: Description fades upward
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.8
        );
      }

      // Step 6: CTA buttons appear last
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          1.0
        );
      }

      // Subtle Controlled Parallax on Hero Video during scroll
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (bgMediaRef.current && sectionRef.current) {
          gsap.fromTo(
            bgMediaRef.current,
            { yPercent: 0 },
            {
              yPercent: 8,
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
      className="relative min-h-dvh flex items-end justify-start overflow-hidden bg-maroon-dark"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={bgMediaRef} className="relative h-full w-full will-change-transform">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/assets/heroimage.webp"
            className="absolute inset-0 w-full h-full object-cover object-[30%_center] md:object-center"
          >
            <source src="/vid/herovideo.mp4" type="video/mp4" />
          </video>
        </div>

        <div ref={overlayRef} className="absolute inset-0 z-1 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-t from-black/92 via-black/50 to-black/35 md:from-black/85 md:via-black/30 md:to-black/45" />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/40 to-transparent md:from-black/70 md:via-black/20" />
        </div>
      </div>

      <Container size="wide" className="relative z-10 pb-12 sm:pb-16 md:pb-20 pt-28 sm:pt-32 md:pt-36">
        <div className="max-w-3xl md:max-w-4xl text-left">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white-text leading-[1.15] tracking-wide mb-3">
            <span className="block overflow-hidden py-0.5">
              <span
                ref={line1Ref}
                className="block will-change-transform"
              >
                Everything your event needs is
              </span>
            </span>

            <span className="block overflow-hidden py-0.5">
              <span
                ref={line2Ref}
                className="font-editorial italic font-semibold text-gold-light block will-change-transform"
              >
                Managed by Riwaaj
              </span>
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="font-editorial text-base md:text-lg text-white-text/85 leading-relaxed max-w-xl mb-6 sm:mb-8 font-medium will-change-transform"
          >
            Crafting bespoke weddings, grand celebrations, and timeless memories with immaculate detail and elegance.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto will-change-transform">
            <MagneticButton strength={0.18}>
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center font-sans text-xs md:text-sm font-medium tracking-[0.16em] bg-linear-to-b from-[#d5c096]/90 via-[#b69a6a]/85 to-[#967d52]/90 hover:from-[#dfceab]/95 hover:via-[#c4a979]/90 hover:to-[#a3895c]/95 text-white backdrop-blur-xl border border-white/35 hover:border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_8px_24px_-4px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_12px_28px_rgba(182,154,106,0.35)] rounded-sm active:scale-[0.98] transition-all duration-300 py-3.5 px-7 select-none cursor-pointer"
              >
                Book Appointment
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.18}>
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center font-sans text-xs md:text-sm font-medium tracking-[0.16em] bg-white/8 hover:bg-white/18 text-white-text backdrop-blur-xl border border-white/25 hover:border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_12px_28px_rgba(0,0,0,0.35)] rounded-sm active:scale-[0.98] transition-all duration-300 py-3.5 px-7 select-none cursor-pointer"
              >
                Plan your event
              </Link>
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
