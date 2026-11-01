"use client";

import { useRef, useEffect } from "react";
import Image from "../ui/Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { type ServiceListItem } from "../../data/servicesList";
import { useSite } from "../../lib/site-context";
import { isReducedMotion } from "../animation";

export interface ServicesListSectionProps {
  services?: ServiceListItem[];
  className?: string;
}

/** "01", "02" … — a service's number is its place in the list the office ordered. */
const serviceNumber = (index: number) => String(index + 1).padStart(2, "0");

export default function ServicesListSection({
  services: servicesProp,
  className = "",
}: ServicesListSectionProps) {
  // The office edits the services in Admin › Website; a caller can still pass its own list.
  const storeServices = useSite((s) => s.services);
  const services = servicesProp ?? storeServices;
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll(".service-row");
      rows?.forEach((row) => {
        const textCol = row.querySelector(".service-text");
        const imageCol = row.querySelector(".service-image");

        if (textCol) {
          gsap.fromTo(
            textCol,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        if (imageCol) {
          gsap.fromTo(
            imageCol,
            { opacity: 0, y: 35, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 82%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  if (services.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={`relative bg-ivory py-20 sm:py-24 md:py-32 lg:py-36 overflow-hidden ${className}`}
    >
      <Container size="wide" className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="space-y-24 sm:space-y-28 md:space-y-36 lg:space-y-44">
          {services.map((item, index) => {
            // Alternating pattern:
            // Even index (0, 2, 4... -> 01, 03, 05...): Image LEFT, Text RIGHT
            // Odd index (1, 3, 5... -> 02, 04, 06...): Text LEFT, Image RIGHT
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                id={item.id}
                className="service-row scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center"
              >
                <div
                  className={`service-image lg:col-span-6 xl:col-span-6 ${
                    isImageLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"
                  }`}
                >
                  <div className="group relative w-full aspect-4/3 overflow-hidden bg-charcoal/5 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.12)] border border-charcoal/8">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-104"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-maroon/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                </div>

                <div
                  className={`service-text lg:col-span-6 xl:col-span-6 flex flex-col justify-center ${
                    isImageLeft
                      ? "order-2 lg:order-2 lg:pl-4 xl:pl-8"
                      : "order-2 lg:order-1 lg:pr-4 xl:pr-8"
                  }`}
                >
                  <span className="font-editorial text-4xl sm:text-5xl font-normal text-gold mb-2 block tracking-tight">
                    {serviceNumber(index)}
                  </span>

                  <h2 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-normal text-charcoal leading-[1.2] tracking-wide mb-3">
                    {item.title}
                  </h2>

                  <p className="font-editorial text-base sm:text-[17px] text-charcoal/75 leading-relaxed font-normal mb-6 max-w-xl">
                    {item.description}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-1">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-body text-[11px] sm:text-xs tracking-wider text-charcoal/80 border border-charcoal/20 px-3.5 py-1.5 rounded-none bg-transparent hover:border-gold hover:text-gold-dark transition-colors duration-200 select-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
