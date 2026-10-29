"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../ui/Container";
import { ctaData } from "../../data/cta";
import { RevealText, FadeUp } from "../animation";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28 md:py-36 lg:py-44 flex items-center justify-center select-none">
      <div className="absolute inset-0 z-0">
        <Image
          src={ctaData.backgroundImage}
          alt="Grand celebration hall"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-102"
        />
      </div>

      <Container size="default" className="relative z-10 px-6 text-center">
        <FadeUp delay={0.1} y={15} className="mb-2.5 md:mb-3">
          <p className="text-xs sm:text-sm tracking-wider text-white-text/80 font-normal">
            {ctaData.eyebrow}
          </p>
        </FadeUp>

        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-white-text leading-[1.18] tracking-normal mb-4">
          <RevealText as="span" delay={0.2} duration={1.1} className="inline-block mr-2 sm:mr-3">
            {ctaData.titlePrefix}
          </RevealText>
          <RevealText as="span" delay={0.35} duration={1.1} className="inline-block">
            <span className="italic font-semibold text-gold-light">
              {ctaData.titleHighlight}
            </span>
          </RevealText>
        </h2>

        <FadeUp delay={0.3} y={15} className="mb-8 sm:mb-10">
          <p className="font-editorial text-base md:text-lg text-white-text/90 leading-relaxed font-medium max-w-xl mx-auto">
            {ctaData.description}
          </p>
        </FadeUp>

        <FadeUp delay={0.45} y={15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4.5 w-full sm:w-auto">
            <Link
              href={ctaData.primaryButton.href}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-linear-to-b from-[#d5c096]/90 via-[#b69a6a]/85 to-[#967d52]/90 hover:from-[#dfceab]/95 hover:via-[#c4a979]/90 hover:to-[#a3895c]/95 text-white backdrop-blur-xl border border-white/35 hover:border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_8px_24px_-4px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_12px_28px_rgba(182,154,106,0.35)] rounded-sm font-editorial text-sm sm:text-base tracking-wider transition-all duration-300 text-center cursor-pointer active:scale-[0.98]"
            >
              {ctaData.primaryButton.label}
            </Link>

            <Link
              href={ctaData.secondaryButton.href}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-white/8 hover:bg-white/18 text-white-text backdrop-blur-xl border border-white/25 hover:border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_24px_-4px_rgba(0,0,0,0.25)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_12px_28px_rgba(0,0,0,0.35)] rounded-sm font-editorial text-sm sm:text-base tracking-wider transition-all duration-300 text-center cursor-pointer active:scale-[0.98]"
            >
              {ctaData.secondaryButton.label}
            </Link>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
