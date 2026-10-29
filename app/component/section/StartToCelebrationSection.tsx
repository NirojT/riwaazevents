"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../ui/Container";
import { startToCelebrationData } from "../../data/startToCelebration";
import { RevealText, FadeUp } from "../animation";

export default function StartToCelebrationSection() {
  const items = startToCelebrationData.items;
  const total = items.length;
  // Start at index 1 so index 0 is left card, index 1 is active (Concept & Planning), 2 and 3 are right cards
  const [activeIndex, setActiveIndex] = useState(1);

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  // 4 visible cards in order: [left, active, right1, right2]
  const indices = [
    (activeIndex - 1 + total) % total,
    activeIndex,
    (activeIndex + 1) % total,
    (activeIndex + 2) % total,
  ];

  return (
    <section className="relative bg-ivory py-16 md:py-20 lg:py-24 overflow-hidden select-none border-b border-charcoal/10">
      <div
        aria-hidden="true"
        className="absolute -right-10 md:-right-16 top-1/2 -translate-y-1/2 w-80 md:w-104 lg:w-120 h-130 pointer-events-none z-0 opacity-40 select-none"
      >
        <Image
          src="/assets/flower.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 320px, 500px"
          className="object-contain object-right pointer-events-none"
        />
      </div>

      <Container size="wide" className="relative z-10 px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col justify-start pt-1 md:pt-3 pr-0 lg:pr-6">
            <FadeUp delay={0.1} y={15} className="mb-2">
              <span className="font-editorial text-xs md:text-sm tracking-wider text-gold-dark font-normal">
                {startToCelebrationData.eyebrow}
              </span>
            </FadeUp>

            <h2 className="font-editorial text-3xl md:text-4xl lg:text-[42px] font-semibold text-charcoal leading-[1.18] tracking-normal mb-4">
              <RevealText as="span" delay={0.2} duration={1.1} className="block">
                {startToCelebrationData.titlePrefix}
              </RevealText>
              <RevealText as="span" delay={0.35} duration={1.1} className="block mt-0.5">
                <span className="italic font-semibold text-gold-dark">
                  {startToCelebrationData.titleHighlight}
                </span>
              </RevealText>
            </h2>

            <FadeUp delay={0.3} y={15}>
              <p className="font-editorial text-base md:text-lg text-muted leading-relaxed font-medium max-w-xs md:max-w-sm">
                {startToCelebrationData.description}
              </p>
            </FadeUp>
          </div>

          <div className="lg:col-span-8 relative">
            <div className="relative flex items-center">
              <button
                onClick={prev}
                aria-label="Previous step"
                className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 z-30 h-8 w-8 md:h-9 md:w-9 rounded-full bg-gold hover:bg-[#A38656] text-white flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="h-4 w-4 text-white stroke-[2.2]" />
              </button>

              <button
                onClick={next}
                aria-label="Next step"
                className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-30 h-8 w-8 md:h-9 md:w-9 rounded-full bg-gold hover:bg-[#A38656] text-white flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer active:scale-95"
              >
                <ChevronRight className="h-4 w-4 text-white stroke-[2.2]" />
              </button>

              <div className="flex items-stretch gap-2 sm:gap-2.5 md:gap-3 w-full overflow-hidden py-1">
                {indices.map((itemIdx, pos) => {
                  const item = items[itemIdx];
                  const isActive = pos === 1;

                  return (
                    <div
                      key={`${item.id}-${pos}`}
                      onClick={() => {
                        if (pos === 0) prev();
                        if (pos >= 2) next();
                      }}
                      className={`
                        relative shrink-0 overflow-hidden rounded-sm bg-charcoal
                        transition-all duration-500 ease-out
                        h-87.5 sm:h-95 md:h-100 lg:h-103.75
                        ${isActive
                          ? "w-60 sm:w-70 md:w-80 lg:w-85 cursor-default shadow-lg"
                          : "w-27.5 sm:w-33.75 md:w-38.75 lg:w-42.5 cursor-pointer opacity-90 hover:opacity-100"
                        }
                      `}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 240px, 360px"
                        priority={pos <= 1}
                        className="object-cover object-center"
                      />

                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent z-10 pointer-events-none rounded-sm" />
                          <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 md:p-6 pointer-events-none">
                            <p className="font-editorial text-base sm:text-lg md:text-xl text-white font-semibold leading-snug tracking-wide">
                              {item.title}
                            </p>
                            <p className="font-editorial italic text-xs sm:text-sm md:text-base text-white/80 leading-relaxed mt-1 font-medium">
                              {item.description}
                            </p>
                          </div>
                        </>
                      )}

                      {!isActive && (
                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors z-10 pointer-events-none rounded-sm" />
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
