"use client";

import { useState } from "react";
import Image from "../ui/Image";
import Container from "../ui/Container";
import { faqData, type FAQItem } from "../../data/faq";
import { useSite } from "../../lib/site-context";
import { RevealText, FadeUp } from "../animation";

export interface FAQSectionProps {
  eyebrow?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  items?: FAQItem[];
  watermarkPosition?: "left" | "right" | "none";
  className?: string;
}

export default function FAQSection({
  eyebrow = faqData.eyebrow,
  titlePrefix = faqData.titlePrefix,
  titleHighlight = faqData.titleHighlight,
  description = faqData.description,
  items: itemsProp,
  watermarkPosition = "left",
  className = "",
}: FAQSectionProps) {
  // The office edits the FAQ in Admin › Website; a caller can still pass its own list.
  const storeItems = useSite((s) => s.faqs);
  const items = itemsProp ?? storeItems;
  // undefined = nobody has clicked yet, so the first item is open — even after the live list
  // replaces the bundled one and every id changes underneath.
  const [clickedId, setOpenId] = useState<string | null | undefined>(undefined);
  const openId = clickedId === undefined ? (items[0]?.id ?? null) : clickedId;

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (items.length === 0) return null;

  return (
    <section
      className={`relative bg-ivory py-16 md:py-24 lg:py-28 overflow-hidden select-none border-b border-charcoal/10 ${className}`}
    >
      {watermarkPosition === "left" && (
        <div
          aria-hidden="true"
          className="absolute -left-16 md:-left-24 top-1/4 w-80 md:w-110 lg:w-130 h-130 md:h-160 pointer-events-none z-0 opacity-30 select-none scale-x-[-1] rotate-12"
        >
          <Image
            src="/site/assets/flower.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 320px, 520px"
            className="object-contain object-left pointer-events-none"
          />
        </div>
      )}

      {watermarkPosition === "right" && (
        <div
          aria-hidden="true"
          className="absolute -right-12 md:-right-20 top-1/2 -translate-y-1/2 w-80 md:w-110 lg:w-130 h-130 md:h-160 pointer-events-none z-0 opacity-35 select-none"
        >
          <Image
            src="/site/assets/flower.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 320px, 520px"
            className="object-contain object-right pointer-events-none"
          />
        </div>
      )}

      <Container size="wide" className="relative z-10 px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col justify-start pr-0 lg:pr-6">
            {eyebrow && (
              <FadeUp delay={0.1} y={15} className="mb-2">
                <span className="font-editorial text-xs md:text-sm tracking-wider text-gold-dark font-normal">
                  {eyebrow}
                </span>
              </FadeUp>
            )}

            <h2 className="font-editorial text-3xl md:text-4xl lg:text-[42px] font-semibold text-charcoal leading-[1.18] tracking-normal mb-4">
              {titlePrefix && (
                <RevealText as="span" delay={0.2} duration={1.1} className="block">
                  {titlePrefix}
                </RevealText>
              )}
              {titleHighlight && (
                <RevealText as="span" delay={0.35} duration={1.1} className="block mt-0.5">
                  <span className="italic font-semibold text-gold-dark">
                    {titleHighlight}
                  </span>
                </RevealText>
              )}
            </h2>

            {description && (
              <FadeUp delay={0.3} y={15}>
                <p className="font-editorial text-base md:text-lg text-site-muted leading-relaxed font-medium max-w-sm">
                  {description}
                </p>
              </FadeUp>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="divide-y border-b border-charcoal/20">
              {items.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <div
                    key={item.id}
                    className="group transition-colors duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      className="w-full py-4.5 md:py-5 flex items-center justify-between gap-6 text-left cursor-pointer transition-colors duration-300"
                    >
                      <h3 className="font-editorial text-lg md:text-xl lg:text-[22px] font-semibold text-charcoal leading-snug group-hover:text-maroon transition-colors duration-300">
                        {item.question}
                      </h3>

                      <span
                        className="font-body text-xl md:text-2xl text-charcoal/60 font-light select-none shrink-0 transition-transform duration-300 group-hover:text-charcoal"
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-400 ease-out ${isOpen
                          ? "grid-rows-[1fr] opacity-100 pb-5 md:pb-6"
                          : "grid-rows-[0fr] opacity-0 pb-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-editorial text-sm md:text-base text-site-muted leading-relaxed font-medium max-w-xl">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
