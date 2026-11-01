
import { tickerItems } from "../../data/ticker";

export default function EventTicker() {
  // Duplicate array for seamless infinite marquee loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <section
      aria-label="Event Specialties"
      className="relative w-full overflow-hidden bg-ivory border-y border-charcoal/10 py-3.5 md:py-4.5 select-none"
    >
      <div className="flex animate-marquee items-center space-x-8 md:space-x-12">
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center space-x-6 md:space-x-8 shrink-0"
          >
            {/* Elegant Gold Diamond Ornament */}
            <span
              aria-hidden="true"
              className="text-gold text-[9px] md:text-xs tracking-widest select-none scale-90"
            >
              ◆
            </span>

            {/* Event Name in Luxury Editorial Font */}
            <span className="font-editorial text-lg md:text-xl lg:text-2xl font-normal text-charcoal tracking-wide whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
