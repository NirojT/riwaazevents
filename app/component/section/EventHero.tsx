
import AboutHero from "./AboutHero";

export interface EventHeroProps {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function EventHero({
  badge = "Events",
  titleLine1 = "Every event tells a",
  titleLine2 = "different story",
  subtitle = "",
  imageSrc = "/site/assets/event.webp",
  imageAlt = "Riwaaj Events Grand Ceremonial Mandap Celebration",
  className = "",
}: EventHeroProps) {
  return (
    <AboutHero
      badge={badge}
      titleLine1={titleLine1}
      titleLine2={titleLine2}
      subtitle={subtitle}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      className={className}
    />
  );
}
