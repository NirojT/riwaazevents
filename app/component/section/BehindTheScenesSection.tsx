"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "../ui/Image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  behindTheScenesData,
  type BehindTheScenesItem,
} from "../../data/behindTheScenes";
import { isReducedMotion } from "../animation";

export interface BehindTheScenesSectionProps {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  images?: BehindTheScenesItem[];
  className?: string;
}

export default function BehindTheScenesSection({
  eyebrow = behindTheScenesData.eyebrow,
  titleLine1 = behindTheScenesData.titleLine1,
  titleLine2 = behindTheScenesData.titleLine2,
  description = behindTheScenesData.description,
  images = behindTheScenesData.images,
  className = "",
}: BehindTheScenesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag to scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < maxScroll - 15);
  }, []);


  useEffect(() => {
    updateScrollState();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
      return () => {
        el.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }
  }, [images, updateScrollState]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = Math.min(scrollContainerRef.current.clientWidth * 0.75, 420);
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Mouse Drag to Scroll handlers
  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const onMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    const el = scrollContainerRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.removeProperty("user-select");
    }
  };

  // GSAP Entrance Animations
  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      if (scrollContainerRef.current) {
        const items = scrollContainerRef.current.querySelectorAll(".bts-card");
        gsap.fromTo(
          items,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [images]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-ivory py-20 sm:py-24 md:py-32 overflow-hidden border-t border-charcoal/8 ${className}`}
    >
      <Container size="wide" className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16">
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 pb-10 sm:pb-12"
        >
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="font-editorial text-xs md:text-sm tracking-[0.2em] text-gold-dark/85 font-normal uppercase mb-2.5 block">
                {eyebrow}
              </span>
            )}

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-[1.18] tracking-wide">
              {titleLine1 && <span className="block">{titleLine1}</span>}
              {titleLine2 && (
                <span className="font-editorial italic font-normal text-gold block mt-0.5 sm:mt-1">
                  {titleLine2}
                </span>
              )}
            </h2>
          </div>

          <div className="flex flex-col lg:items-end gap-5 lg:max-w-md">
            {description && (
              <p className="font-editorial text-sm sm:text-base text-charcoal/75 leading-relaxed font-normal lg:text-right">
                {description}
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous photos"
                className={`w-11 h-11 rounded-full border border-charcoal/20 flex items-center justify-center transition-all duration-300 ${canScrollLeft
                  ? "text-charcoal hover:bg-charcoal hover:text-ivory hover:border-charcoal cursor-pointer active:scale-95"
                  : "text-charcoal/25 border-charcoal/10 cursor-not-allowed"
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next photos"
                className={`w-11 h-11 rounded-full border border-charcoal/20 flex items-center justify-center transition-all duration-300 ${canScrollRight
                  ? "text-charcoal hover:bg-charcoal hover:text-ivory hover:border-charcoal cursor-pointer active:scale-95"
                  : "text-charcoal/25 border-charcoal/10 cursor-not-allowed"
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative w-full">
        {/* Floating Side Arrow: Left */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-ivory/90 hover:bg-ivory text-charcoal shadow-lg border border-charcoal/10 items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Floating Side Arrow: Right */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-ivory/90 hover:bg-ivory text-charcoal shadow-lg border border-charcoal/10 items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          className="flex overflow-x-auto scroll-smooth gap-6 sm:gap-8 px-6 sm:px-8 md:px-12 lg:px-16 pt-4 pb-20 sm:pb-24 md:pb-32 cursor-grab select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {images.map((item, index) => {
            // Strict 1 Up, 1 Down Alternation:
            // Even index (0, 2, 4...) is DOWN
            // Odd index (1, 3, 5...) is UP
            const isDown = item.offset ? item.offset === "down" : index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`bts-card group shrink-0 w-67.5 sm:w-[320px] md:w-87.5 lg:w-95 transition-all duration-500 ease-out ${isDown ? "mt-14 sm:mt-18 md:mt-24 lg:mt-28" : "mt-0"
                  }`}
              >
                {/* Photo Card without awkward borders */}
                <div className="relative w-full aspect-3/4 overflow-hidden bg-charcoal/5 shadow-[0_16px_45px_-20px_rgba(0,0,0,0.12)]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 270px, (max-width: 1024px) 350px, 380px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104 pointer-events-none"
                  />

                  {/* Gentle ambient dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Caption badge on hover */}
                  {item.caption && (
                    <div className="absolute bottom-3 left-3 right-3 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <span className="font-body text-[11px] tracking-wider uppercase text-white-text bg-black/65 backdrop-blur-xs px-2.5 py-1">
                        {item.caption}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
