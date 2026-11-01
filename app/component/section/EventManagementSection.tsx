"use client";

import { useState } from "react";
import Image from "../ui/Image";
import { ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import { eventManagementData } from "../../data/eventManagement";
import { RevealText, FadeUp } from "../animation";

export default function EventManagementSection() {
  const [activeId, setActiveId] = useState<string>(
    eventManagementData.items[0]?.id || ""
  );

  const activeItem =
    eventManagementData.items.find((item) => item.id === activeId) ||
    eventManagementData.items[0];

  return (
    <section className="relative bg-ivory py-16 md:py-24 overflow-hidden border-b border-charcoal/10 select-none">
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-16 md:-left-24 w-80 md:w-110 lg:w-130 h-120 md:h-160 pointer-events-none select-none z-0 opacity-40 scale-x-[-1] rotate-12"
      >
        <Image
          src="/site/assets/flower.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 320px, 500px"
          className="object-contain object-left pointer-events-none"
        />
      </div>

      <Container size="wide" className="relative z-10 px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <div className="max-w-2xl lg:max-w-3xl">
            <FadeUp delay={0.1} y={15} className="mb-2">
              <span className="font-editorial text-xs md:text-sm tracking-wider text-gold-dark font-normal uppercase">
                {eventManagementData.eyebrow}
              </span>
            </FadeUp>

            <h2 className="font-editorial text-3xl md:text-4xl lg:text-[44px] xl:text-[50px] font-semibold text-charcoal leading-tight tracking-normal">
              <RevealText as="span" delay={0.2} duration={1.1} className="block">
                {eventManagementData.titlePrefix}
              </RevealText>
              <RevealText as="span" delay={0.35} duration={1.1} className="block mt-0.5">
                <span className="italic font-semibold text-gold-dark">
                  {eventManagementData.titleHighlight}
                </span>
              </RevealText>
            </h2>
          </div>

          <div className="max-w-md">
            <FadeUp delay={0.3} y={15}>
              <p className="font-editorial text-base md:text-lg text-site-muted md:text-right leading-relaxed font-medium">
                {eventManagementData.description}
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6 flex flex-col border-t border-charcoal/15">
            {eventManagementData.items.map((item) => {
              const isActive = item.id === activeId;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  className={`group relative border-b border-charcoal/15 transition-all duration-300 cursor-pointer ${isActive ? "py-5 md:py-6" : "py-3.5 md:py-4.5 hover:bg-black/2"
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-baseline space-x-4 md:space-x-6">
                      <span
                        className={`font-editorial text-xs md:text-sm tracking-wider transition-colors duration-300 select-none ${isActive ? "text-maroon font-normal" : "text-charcoal/50"
                          }`}
                      >
                        {item.number}
                      </span>

                      <div className="flex flex-col">
                        <h3
                          className={`font-editorial transition-all duration-300 font-semibold leading-snug tracking-wide ${isActive
                            ? "text-xl md:text-2xl lg:text-[26px] text-maroon"
                            : "text-lg md:text-xl lg:text-[22px] text-maroon/90 group-hover:text-maroon"
                            }`}
                        >
                          {item.title}
                        </h3>

                        <div
                          className={`overflow-hidden transition-all duration-400 ease-out ${isActive ? "max-h-24 opacity-100 mt-1.5" : "max-h-0 opacity-0"
                            }`}
                        >
                          <p className="font-editorial italic text-sm md:text-base text-site-muted leading-relaxed font-medium">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`shrink-0 pt-1 transition-all duration-300 ${isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 pointer-events-none"
                        }`}
                    >
                      <ArrowRight className="h-4 w-4 text-charcoal/80" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative aspect-4/3 md:aspect-5/4 lg:aspect-[4/3.1] w-full rounded-sm md:rounded-lg overflow-hidden shadow-xl bg-charcoal">
              {eventManagementData.items.map((item) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${item.id === activeId
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105 pointer-events-none"
                    }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    preload={item.id === eventManagementData.items[0].id}
                    className="object-cover object-center"
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none z-10" />

              <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-7 flex items-end justify-between pointer-events-none">
                <span className="font-editorial text-lg md:text-xl lg:text-2xl text-white-text font-normal tracking-wide drop-shadow-sm">
                  {activeItem.title}
                </span>

                <span className="font-editorial text-xs md:text-sm text-white-text/80 tracking-widest font-normal drop-shadow-sm">
                  {activeItem.count}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
