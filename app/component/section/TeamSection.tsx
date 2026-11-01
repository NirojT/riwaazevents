"use client";

import { useRef, useEffect } from "react";
import Image from "../ui/Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { teamData, type TeamMember } from "../../data/team";
import { useSite } from "../../lib/site-context";
import { isReducedMotion } from "../animation";

export interface TeamSectionProps {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
  showWatermark?: boolean;
  roundedTop?: boolean;
}

export default function TeamSection({
  eyebrow = teamData.eyebrow,
  titleLine1 = teamData.titleLine1,
  titleLine2 = teamData.titleLine2,
  description = teamData.description,
  members: membersProp,
  className = "",
  showWatermark = true,
  roundedTop = true,
}: TeamSectionProps) {
  // The office edits the team in Admin › Website; a caller can still pass its own list.
  const storeMembers = useSite((s) => s.team);
  const members = membersProp ?? storeMembers;
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".team-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [members]);


  if (members.length === 0) return null;

  return (
    <div className={`relative ${roundedTop ? "pt-3 sm:pt-4" : ""}`}>
      <section
        ref={sectionRef}
        className={`relative bg-linear-to-b from-linen-light via-ivory to-linen-deep py-20 sm:py-24 md:py-32 overflow-hidden ${roundedTop
          ? "rounded-t-4xl sm:rounded-t-4xl "
          : "border-t border-charcoal/8"
          } ${className}`}
      >
        {showWatermark && (
          <>
            <div
              aria-hidden="true"
              className="absolute -right-16 sm:-right-24 -top-10 w-80 md:w-110 lg:w-130 h-140 pointer-events-none z-0 opacity-30 select-none"
            >
              <Image
                src="/site/assets/flower.webp"
                alt=""
                fill
                sizes="(max-width: 768px) 320px, 500px"
                className="object-contain object-right pointer-events-none"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute -left-16 sm:-left-24 -bottom-10 w-80 md:w-110 lg:w-130 h-140 pointer-events-none z-0 opacity-25 select-none scale-x-[-1] rotate-12"
            >
              <Image
                src="/site/assets/flower.webp"
                alt=""
                fill
                sizes="(max-width: 768px) 320px, 500px"
                className="object-contain object-left pointer-events-none"
              />
            </div>
          </>
        )}

        <Container size="wide" className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16">
          <div
            ref={headerRef}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 pb-12 sm:pb-16"
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
              <div className="lg:max-w-md lg:text-right">
                <p className="font-editorial text-sm sm:text-base text-charcoal/75 leading-relaxed font-normal">
                  {description}
                </p>
              </div>
            )}
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
          >
            {members.map((member) => (
              <div key={member.id} className="team-card group flex flex-col">
                <div className="relative w-full aspect-4/5 overflow-hidden bg-charcoal/5 shadow-[0_16px_45px_-20px_rgba(0,0,0,0.12)] border border-charcoal/8">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                <div className="mt-4 sm:mt-5 text-left">
                  <h3 className="font-editorial text-lg sm:text-xl font-normal text-charcoal tracking-wide">
                    {member.name}
                  </h3>

                  {member.role && (
                    <p className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold mt-1">
                      {member.role}
                    </p>
                  )}

                  <p className="font-editorial text-xs sm:text-sm text-charcoal/75 leading-relaxed font-normal mt-1.5 max-w-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
