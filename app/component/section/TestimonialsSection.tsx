"use client";

import { useState } from "react";
import Image from "../ui/Image";
import { Star } from "lucide-react";
import Container from "../ui/Container";
import { testimonialsData } from "../../data/testimonials";
import { useSite } from "../../lib/site-context";

/** The quote marks are drawn here, so a quote typed in the admin with or without its own looks the same. */
const quoted = (text: string) => `“${text.trim().replace(/^["“”]+|["“”]+$/g, "")}”`;
import { RevealText, FadeUp } from "../animation";

export default function TestimonialsSection() {
  const items = useSite((s) => s.testimonials);
  // Allows mobile touch devices to tap to toggle between text card & photo card
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  if (items.length === 0) return null;

  const handleCardClick = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative bg-ivory py-16 md:py-20 lg:py-24 overflow-hidden select-none border-b border-charcoal/10">
      <Container size="wide" className="relative z-10 px-6 md:px-12 lg:px-16">

        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 md:mb-14 gap-6">
          <div className="max-w-xl">
            <FadeUp delay={0.1} y={15} className="mb-2">
              <span className="font-editorial text-xs md:text-sm tracking-wider text-gold-dark font-normal">
                {testimonialsData.eyebrow}
              </span>
            </FadeUp>

            <h2 className="font-editorial text-3xl md:text-4xl lg:text-[42px] font-semibold text-charcoal leading-[1.18] tracking-normal">
              <RevealText as="span" delay={0.2} duration={1.1} className="block">
                {testimonialsData.titlePrefix}
              </RevealText>
              <RevealText as="span" delay={0.35} duration={1.1} className="block mt-0.5">
                <span className="italic font-semibold text-gold-dark">
                  {testimonialsData.titleHighlight}
                </span>
              </RevealText>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3.5 md:pt-2 max-w-sm">
            <FadeUp delay={0.3} y={15}>
              <p className="font-editorial text-base md:text-lg text-site-muted leading-relaxed font-medium md:text-right">
                {testimonialsData.description}
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {items.map((item, idx) => {
            const isCardActive = activeCardId === item.id;

            return (
              <FadeUp
                key={item.id}
                delay={0.15 + idx * 0.1}
                y={20}
                className="w-full h-full"
              >
                <div
                  onClick={() => handleCardClick(item.id)}
                  className="group relative h-110 sm:h-117.5 md:h-125 overflow-hidden cursor-pointer select-none bg-linen/30 transition-all duration-500"
                >
                  <div
                    className={`
                      absolute inset-0 p-7 sm:p-8 flex flex-col justify-between
                      transition-all duration-500 ease-out z-10
                      ${isCardActive
                        ? "opacity-0 scale-98 pointer-events-none"
                        : "opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-98"
                      }
                    `}
                  >
                    <div>
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mb-4 bg-charcoal/10">
                        <Image
                          src={item.avatar || item.image}
                          alt={item.clientName}
                          fill
                          sizes="56px"
                          className="object-cover object-center"
                        />
                      </div>

                      <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-charcoal tracking-wide mb-1.5">
                        {item.clientName}
                      </h3>

                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < item.stars
                              ? "text-gold-dark fill-gold-dark"
                              : "text-charcoal/20 fill-transparent stroke-[1.5]"
                              }`}
                          />
                        ))}
                      </div>

                      <p className="font-editorial text-sm sm:text-[15px] md:text-base text-charcoal/85 font-medium leading-relaxed italic">
                        {quoted(item.quote)}
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="font-body text-xs md:text-[13px] font-semibold text-charcoal/80 tracking-wider uppercase">
                        {item.event}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`
                      absolute inset-0 z-20 overflow-hidden
                      transition-all duration-500 ease-out
                      ${isCardActive
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-105 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
                      }
                    `}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.clientName} - ${item.event}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      preload={idx === 0}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8 pointer-events-none">
                      <p className="font-editorial text-base sm:text-lg md:text-xl text-white font-medium tracking-wide">
                        {item.event}
                      </p>
                      <p className="font-editorial italic text-xs sm:text-sm text-white/80 font-normal mt-0.5">
                        {item.clientName}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
