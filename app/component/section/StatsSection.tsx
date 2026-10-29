"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { statsData, type StatItem } from "../../data/stats";
import { isReducedMotion } from "../animation";

export interface StatsSectionProps {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  stats?: StatItem[];
  className?: string;
}

export default function StatsSection({
  eyebrow = statsData.eyebrow,
  titleLine1 = statsData.titleLine1,
  titleLine2 = statsData.titleLine2,
  description = statsData.description,
  stats = statsData.stats,
  className = "",
}: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

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

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".stat-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-ivory py-20 sm:py-24 md:py-32 overflow-hidden ${className}`}
    >
      <Container size="wide" className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16">
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 pb-14 sm:pb-18"
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

          {description && (
            <div className="lg:max-w-sm lg:text-right">
              <p className="font-editorial text-sm sm:text-base text-charcoal/70 leading-relaxed font-normal">
                {description}
              </p>
            </div>
          )}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start"
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`stat-card group flex flex-col justify-between p-8 sm:p-9 min-h-60 sm:min-h-67.5 bg-[#f5efe6] rounded-sm border border-charcoal/5 shadow-[0_12px_36px_-18px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out hover:-translate-y-1.5 ${
                stat.offset ? "lg:mt-10 xl:mt-12" : ""
              }`}
            >
              <div className="font-editorial text-5xl sm:text-6xl font-normal text-maroon-dark tracking-tight leading-none group-hover:text-maroon transition-colors duration-300">
                {stat.number}
              </div>

              {/* Stat Description */}
              <p className="font-editorial text-sm sm:text-base text-charcoal/75 leading-relaxed font-normal mt-auto pt-8">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
