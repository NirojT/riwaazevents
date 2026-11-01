"use client";

import { useEffect, useRef } from "react";
import Image from "../ui/Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { galleryData, type GalleryItem } from "../../data/gallery";
import { RevealText, FadeUp, isReducedMotion } from "../animation";
import { useSite } from "../../lib/site-context";

export default function GallerySection() {
  // Featured designs lead the strip; the bundled photos fill whatever they leave, so the two
  // rows always run their full length however few designs are featured.
  const featured = useSite((s) => s.gallery?.featured ?? []);
  const bundled = [...galleryData.row1, ...galleryData.row2];
  const slots: GalleryItem[] = [
    ...featured.map((d) => ({ id: `design-${d.id}`, image: d.cover, alt: d.name, caption: d.name })),
    ...bundled,
  ].slice(0, bundled.length);
  const row1 = slots.slice(0, galleryData.row1.length);
  const row2 = slots.slice(galleryData.row1.length);

  const sectionRef = useRef<HTMLElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    if (!section || !row1 || !row2) return;

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile setup: smaller cards & full travel so all 6 images slide across the screen
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          row1,
          {
            x: () => -(row1.scrollWidth - window.innerWidth + 24),
          },
          {
            x: 16,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              end: "bottom 15%",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          row2,
          {
            x: 16,
          },
          {
            x: () => -(row2.scrollWidth - window.innerWidth + 24),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              end: "bottom 15%",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          row1,
          {
            x: () => -(row1.scrollWidth - window.innerWidth) * 0.5,
          },
          {
            x: 32,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          row2,
          {
            x: 32,
          },
          {
            x: () => -(row2.scrollWidth - window.innerWidth) * 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, section);

    // Refresh ScrollTrigger once images and fonts are loaded
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleRefresh);

    return () => {
      window.removeEventListener("load", handleRefresh);
      ctx.revert();
    };
  }, []);

  const renderCard = (item: GalleryItem, index: number) => (
    <div
      key={`${item.id}-${index}`}
      className="group relative shrink-0 w-48 sm:w-64 md:w-84 lg:w-105 aspect-[4/4.2] overflow-hidden rounded-lg md:rounded-xl bg-charcoal/10 select-none shadow-sm hover:shadow-md transition-shadow duration-500"
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 260px, (max-width: 1024px) 368px, 420px"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Subtle luxury vignette gradient on hover */}
      <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {item.caption && (
        <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
          <p className="font-editorial text-sm md:text-base text-white-text tracking-wide font-normal drop-shadow-sm">
            {item.caption}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-ivory py-16 md:py-20 lg:py-24 overflow-hidden select-none border-b border-charcoal/10"
    >
      <div
        aria-hidden="true"
        className="absolute -left-12 md:-left-20 top-1/3 -translate-y-1/2 w-80 md:w-104 lg:w-120 h-130 pointer-events-none z-0 opacity-30 select-none scale-x-[-1]"
      >
        <Image
          src="/site/assets/flower.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 320px, 500px"
          className="object-contain object-left pointer-events-none"
        />
      </div>

      <Container size="wide" className="relative z-10 px-6 md:px-12 lg:px-16 mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-xl">
            <FadeUp delay={0.1} y={15} className="mb-2">
              <span className="font-editorial text-xs md:text-sm tracking-wider text-gold-dark font-normal">
                {galleryData.eyebrow}
              </span>
            </FadeUp>

            <h2 className="font-editorial text-3xl md:text-4xl lg:text-[42px] font-semibold text-charcoal leading-[1.18] tracking-normal">
              <RevealText as="span" delay={0.2} duration={1.1} className="block">
                {galleryData.titlePrefix}
              </RevealText>
              <RevealText as="span" delay={0.35} duration={1.1} className="block mt-0.5">
                <span className="italic font-semibold text-gold-dark">
                  {galleryData.titleHighlight}
                </span>
              </RevealText>
            </h2>
          </div>

          <div className="max-w-xs md:pt-2">
            <FadeUp delay={0.3} y={15}>
              <p className="font-editorial text-base md:text-lg text-site-muted leading-relaxed font-medium md:text-right">
                {galleryData.description}
              </p>
            </FadeUp>
          </div>
        </div>
      </Container>

      {/* ── Horizontal Scrolling Rows ── */}
      <div className="relative z-10 flex flex-col gap-4 md:gap-6 w-full overflow-hidden">
        {/* Row 1: Slides RIGHT on scroll (6 images) */}
        <div
          ref={row1Ref}
          className="flex items-center gap-4 md:gap-6 will-change-transform"
        >
          {row1.map((item, idx) => renderCard(item, idx))}
        </div>

        {/* Row 2: Slides LEFT on scroll (6 images) */}
        <div
          ref={row2Ref}
          className="flex items-center gap-4 md:gap-6 will-change-transform"
        >
          {row2.map((item, idx) => renderCard(item, idx))}
        </div>
      </div>
    </section>
  );
}
