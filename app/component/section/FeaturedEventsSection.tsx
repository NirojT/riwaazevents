"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import { featuredEventsData } from "../../data/featuredEvents";
import { RevealText, FadeUp, MagneticButton } from "../animation";

export default function FeaturedEventsSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = featuredEventsData.slides.length;
  const currentSlide = featuredEventsData.slides[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="relative min-h-180 lg:min-h-195 overflow-hidden select-none flex flex-col justify-end pt-28 md:pt-36 pb-8 md:pb-10">
      <div className="absolute inset-0 z-0">
        {featuredEventsData.slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${index === currentSlideIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
          >
            <Image
              src={slide.backgroundImage}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center transition-transform duration-1000 ease-out"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/4 bg-linear-to-r from-black/85 via-black/35 to-transparent pointer-events-none" />
      </div>

      <Container size="wide" className="relative z-10 px-6 md:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 flex flex-col justify-end max-w-2xl pb-2 lg:pb-4">
            <FadeUp delay={0.1} y={15} className="mb-2">
              <span className="font-editorial text-xs md:text-sm tracking-widest text-gold-light font-normal uppercase">
                {featuredEventsData.eyebrow}
              </span>
            </FadeUp>

            <h2 className="font-editorial text-2xl md:text-4xl lg:text-[46px] font-semibold text-white-text leading-[1.15] tracking-normal mb-3">
              <RevealText as="span" delay={0.2} duration={1.1} className="block">
                {featuredEventsData.titlePrefix}
              </RevealText>
              <RevealText as="span" delay={0.35} duration={1.1} className="block mt-0.5">
                <span className="italic font-semibold text-gold-light">
                  {featuredEventsData.titleHighlight}
                </span>
              </RevealText>
            </h2>

            <FadeUp delay={0.3} y={15}>
              <p className="font-editorial text-base md:text-lg text-white-text/90 leading-relaxed font-medium max-w-xl">
                {featuredEventsData.description}
              </p>
            </FadeUp>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-100">
              <div className="w-full bg-[#faf7f2]/95 backdrop-blur-md rounded-sm p-5 md:p-6 shadow-2xl border border-white/40 text-charcoal transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-between border-b border-charcoal/10 pb-2.5 mb-2.5">
                  <span className="font-editorial text-[11px] md:text-xs tracking-[0.2em] text-primary uppercase font-normal">
                    {currentSlide.tag}
                  </span>
                  <span className="font-editorial text-[11px] md:text-xs text-charcoal/50 tracking-wider">
                    {currentSlide.number}
                  </span>
                </div>

                <h3 className="font-editorial text-xl md:text-[23px] text-charcoal font-semibold leading-snug mb-1.5 tracking-wide">
                  {currentSlide.title}
                </h3>

                <p className="font-editorial text-sm md:text-base text-charcoal/80 leading-relaxed font-medium mb-3">
                  {currentSlide.description}
                </p>

                <div className="flex items-center gap-3.5 py-2 border-y border-charcoal/10 text-charcoal/75 text-[11px] md:text-xs font-sans mb-3.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{currentSlide.location}</span>
                  </div>
                  <span className="text-charcoal/30 select-none">|</span>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{currentSlide.guests}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3.5">
                  {currentSlide.thumbnails.map((thumb, idx) => (
                    <div
                      key={`${currentSlide.id}-thumb-${idx}`}
                      className="relative aspect-square rounded-sm overflow-hidden border border-charcoal/10 bg-charcoal/5 group/thumb"
                    >
                      <Image
                        src={thumb}
                        alt={`${currentSlide.title} detail ${idx + 1}`}
                        fill
                        sizes="90px"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover/thumb:scale-108"
                      />
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="group/link inline-flex items-center gap-1.5 font-editorial text-xs md:text-[13px] text-charcoal hover:text-primary tracking-widest uppercase transition-colors duration-300 font-normal underline underline-offset-4"
                >
                  <span>VIEW EVENT</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>

              {/* Controls directly below the card matching reference image */}
              <div className="flex items-center justify-between mt-3.5 px-1 w-full">
                {/* 01/04 Counter */}
                <div className="flex items-baseline space-x-1 select-none">
                  <span className="font-editorial text-2xl md:text-3xl text-white-text font-normal tracking-wide">
                    {`0${currentSlideIndex + 1}`}
                  </span>
                  <span className="font-editorial text-base md:text-lg text-white-text/60 font-light">
                    {`/0${totalSlides}`}
                  </span>
                </div>

                {/* Next Story Control */}
                <div className="flex items-center gap-2.5">
                  <MagneticButton strength={0.15}>
                    <button
                      onClick={handlePrev}
                      aria-label="Previous story"
                      className="h-7.5 w-7.5 md:h-8 md:w-8 rounded-full border border-white/25 text-white-text/70 hover:text-white hover:border-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                  </MagneticButton>

                  <MagneticButton strength={0.15}>
                    <button
                      onClick={handleNext}
                      aria-label="Next story"
                      className="flex items-center space-x-2 text-white-text hover:text-white transition-all duration-300 cursor-pointer active:scale-95 group/next"
                    >
                      <span className="font-editorial text-xs md:text-sm tracking-wide font-normal">
                        Next Story
                      </span>
                      <div className="h-7.5 w-7.5 md:h-8 md:w-8 rounded-full border border-white/40 group-hover/next:border-white group-hover/next:bg-white group-hover/next:text-charcoal flex items-center justify-center transition-all duration-300">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
