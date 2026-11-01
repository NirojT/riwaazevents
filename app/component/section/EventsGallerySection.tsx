"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "../ui/Image";
import { eventsGalleryData, type EventGalleryItem } from "../../data/eventsGallery";
import { useSite } from "../../lib/site-context";

export default function EventsGallerySection() {
  // Designs ticked "Show on website" in the admin; the bundled showcase until there is one.
  const liveGallery = useSite((s) => s.gallery);
  const gallery = liveGallery ?? eventsGalleryData;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<EventGalleryItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Filter items based on active category
  const filteredItems =
    activeCategory === "all"
      ? gallery.items
      : gallery.items.filter((item) => item.category === activeCategory);

  // Calculate counts for each category
  const getCategoryCount = (catValue: string) => {
    if (catValue === "all") return gallery.items.length;
    return gallery.items.filter((item) => item.category === catValue).length;
  };

  const eventImages = selectedEvent
    ? selectedEvent.images && selectedEvent.images.length > 0
      ? selectedEvent.images
      : [selectedEvent.image]
    : [];

  const handleNextPhoto = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (eventImages.length > 1) {
        setActivePhotoIndex((prev) => (prev + 1) % eventImages.length);
      }
    },
    [eventImages.length]
  );

  const handlePrevPhoto = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (eventImages.length > 1) {
        setActivePhotoIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length);
      }
    },
    [eventImages.length]
  );

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (!selectedEvent) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      } else if (e.key === "ArrowRight") {
        if (eventImages.length > 1) {
          setActivePhotoIndex((prev) => (prev + 1) % eventImages.length);
        }
      } else if (e.key === "ArrowLeft") {
        if (eventImages.length > 1) {
          setActivePhotoIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent, eventImages.length]);

  const handleOpenEvent = (item: EventGalleryItem) => {
    setSelectedEvent(item);
    setActivePhotoIndex(0);
  };

  return (
    <section className="relative py-16 sm:py-24 bg-ivory text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-charcoal/10 mb-10 sm:mb-12">
          {gallery.categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            const count = getCategoryCount(cat.value);

            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`relative pb-2 text-sm sm:text-base font-display tracking-wide transition-all duration-300 flex items-baseline gap-1.5 ${
                  isActive
                    ? "text-charcoal font-medium"
                    : "text-site-muted/70 hover:text-charcoal/80"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] sm:text-xs font-body tabular-nums ${
                    isActive ? "text-gold font-semibold" : "text-site-muted/70"
                  }`}
                >
                  {count}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full transition-all duration-300" />
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredItems.map((item, index) => {
            const photosCount = item.images?.length || 1;

            return (
              <div
                key={item.id}
                onClick={() => handleOpenEvent(item)}
                className="group relative cursor-pointer overflow-hidden rounded-sm bg-charcoal shadow-sm transition-all duration-500 hover:shadow-xl w-full"
              >
                {photosCount > 1 && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white/95 text-[11px] font-body shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <svg
                      className="w-3.5 h-3.5 text-gold shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{photosCount} Photos</span>
                  </div>
                )}

                <div className="relative w-full aspect-4/5 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    preload={index < 4}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute inset-0 border border-white/0 group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold font-body font-medium mb-1">
                      {item.category}
                    </span>

                    <h3 className="font-display text-base sm:text-lg text-white font-medium tracking-wide leading-snug text-balance">
                      {item.title}
                    </h3>

                    {item.location && (
                    <div className="mt-1 flex items-center gap-1.5 text-white-text/80 text-xs font-body tracking-wide">
                      <svg
                        className="w-3.5 h-3.5 text-gold shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{item.location}</span>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-3 sm:p-6 md:p-8 backdrop-blur-md transition-all duration-300 select-none"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {eventImages.length > 1 ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs text-white/90 font-body tracking-wider">
                  <span className="text-gold font-medium">{activePhotoIndex + 1}</span>
                  <span className="text-white/40">/</span>
                  <span>{eventImages.length} Photos</span>
                </div>
              ) : (
                <div />
              )}

              <button
                onClick={() => setSelectedEvent(null)}
                aria-label="Close Preview"
                className="p-2 text-white/70 hover:text-white rounded-full bg-black/50 hover:bg-black/80 border border-white/10 transition-colors"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="relative max-w-4xl max-h-[92vh] w-full flex flex-col items-center z-10 pt-10 sm:pt-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[54vh] sm:h-[62vh] md:h-[66vh] rounded-sm overflow-hidden flex items-center justify-center bg-black/40 shadow-2xl">
                <div
                  onClick={handleNextPhoto}
                  className="relative w-full h-full cursor-pointer group/img"
                  title={eventImages.length > 1 ? "Click to view next photo from this event" : undefined}
                >
                  <Image
                    key={`${selectedEvent.id}-${activePhotoIndex}`}
                    src={eventImages[activePhotoIndex] || selectedEvent.image}
                    alt={`${selectedEvent.title} - Photo ${activePhotoIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                    className="object-contain transition-opacity duration-300 ease-out"
                    preload
                  />
                </div>

                {eventImages.length > 1 && (
                  <button
                    onClick={handlePrevPhoto}
                    aria-label="Previous photo"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/85 text-white/80 hover:text-gold border border-white/15 transition-all duration-200 z-10 hover:scale-110 active:scale-95"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Right Arrow Button */}
                {eventImages.length > 1 && (
                  <button
                    onClick={handleNextPhoto}
                    aria-label="Next photo"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/85 text-white/80 hover:text-gold border border-white/15 transition-all duration-200 z-10 hover:scale-110 active:scale-95"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Thumbnails Row for this Event's Photos */}
              {eventImages.length > 1 && (
                <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto max-w-full px-2 py-1">
                  {eventImages.map((imgSrc, imgIdx) => {
                    const isActive = imgIdx === activePhotoIndex;
                    return (
                      <button
                        key={imgIdx}
                        onClick={() => setActivePhotoIndex(imgIdx)}
                        aria-label={`View photo ${imgIdx + 1}`}
                        className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-sm overflow-hidden shrink-0 transition-all duration-200 ${
                          isActive
                            ? "ring-2 ring-gold scale-105 opacity-100 shadow-md"
                            : "opacity-50 hover:opacity-90 ring-1 ring-white/20"
                        }`}
                      >
                        <Image
                          src={imgSrc}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Event Caption & Details */}
              <div className="mt-3 sm:mt-4 text-center px-4 max-w-2xl">
                <p className="text-[11px] sm:text-xs uppercase tracking-widest text-gold mb-1 font-body font-medium">
                  {[selectedEvent.category, selectedEvent.location].filter(Boolean).join(" • ")}
                </p>
                <h2 className="font-display text-lg sm:text-2xl text-white font-medium">
                  {selectedEvent.title}
                </h2>
                {eventImages.length > 1 && (
                  <p className="text-[11px] sm:text-xs text-white/50 font-body mt-1">
                    Click photo or use arrows to view all {eventImages.length} images from this event
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
