"use client";

import { useRef, useEffect } from "react";
import Image from "../ui/Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { aboutStoryData, type AboutStoryItem } from "../../data/aboutStory";
import { isReducedMotion } from "../animation";

export interface AboutStorySectionProps {
  items?: AboutStoryItem[];
  className?: string;
  showWatermark?: boolean;
}

export default function AboutStorySection({
  items = aboutStoryData.items,
  className = "",
  showWatermark = true,
}: AboutStorySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate each row independently on scroll
      const rows = sectionRef.current?.querySelectorAll(".story-row");
      rows?.forEach((row) => {
        const textCol = row.querySelector(".story-text");
        const imageCol = row.querySelector(".story-image");

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
                start: "top 82%",
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
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-ivory py-20 sm:py-24 md:py-32 lg:py-36 overflow-hidden ${className}`}
    >
      {showWatermark && (
        <>
          <div
            aria-hidden="true"
            className="absolute -left-16 sm:-left-20 top-1/4 w-80 md:w-104 lg:w-lg h-140 pointer-events-none z-0 opacity-25 select-none"
          >
            <Image
              src="/site/assets/flower.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 320px, 500px"
              className="object-contain object-left pointer-events-none"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute -right-16 sm:-right-24 bottom-1/6 w-80 md:w-104 lg:w-lg h-140 pointer-events-none z-0 opacity-20 select-none rotate-180"
          >
            <Image
              src="/site/assets/flower.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 320px, 500px"
              className="object-contain object-right pointer-events-none"
            />
          </div>
        </>
      )}

      <Container size="wide" className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="space-y-24 sm:space-y-28 md:space-y-36 lg:space-y-44">
          {items.map((item, index) => {
            const isImageRight = item.imagePosition === "right";

            return (
              <div
                key={item.id || index}
                className="story-row grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center"
              >
                <div
                  className={`story-text lg:col-span-6 xl:col-span-6 flex flex-col justify-center ${isImageRight
                      ? "order-1 lg:order-1 lg:pr-4 xl:pr-8"
                      : "order-1 lg:order-2 lg:pl-4 xl:pl-8"
                    }`}
                >
                  {item.eyebrow && (
                    <span className="font-editorial text-xs md:text-sm tracking-[0.2em] text-gold-dark/85 font-normal uppercase mb-2.5 block">
                      {item.eyebrow}
                    </span>
                  )}

                  <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[42px] font-normal text-charcoal leading-[1.18] tracking-wide mb-2">
                    <span className="block">{item.titleLine1}</span>
                    <span className="font-editorial italic font-normal text-gold block mt-0.5 sm:mt-1">
                      {item.titleLine2}
                    </span>
                  </h2>

                  <div className="font-editorial text-base sm:text-[17px] md:text-lg text-charcoal/85 leading-relaxed font-normal space-y-4 sm:space-y-5 my-5 sm:my-6 max-w-xl">
                    {item.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {item.quote && (
                    <p className="font-editorial italic text-base sm:text-lg md:text-xl text-gold-dark font-normal mt-2 sm:mt-3">
                      {item.quote}
                    </p>
                  )}
                </div>

                <div
                  className={`story-image lg:col-span-6 xl:col-span-6 ${isImageRight
                      ? "order-2 lg:order-2"
                      : "order-2 lg:order-1"
                    }`}
                >
                  <div className="group relative w-full aspect-4/3 sm:aspect-4/3 overflow-hidden bg-charcoal/5 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.12)] border border-charcoal/8">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-104"
                    />

                    {/* Subtle warm luxury filmic tint on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-maroon/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
