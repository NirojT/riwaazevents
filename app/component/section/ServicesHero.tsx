
import AboutHero from "./AboutHero";

export interface ServicesHeroProps {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function ServicesHero({
  badge = "Our Services",
  titleLine1 = "Everything your celebration needs.",
  titleLine2 = "One team to bring it together.",
  subtitle = "",
  imageSrc = "/site/assets/aboutus.webp",
  imageAlt = "Riwaaj Events Luxury Ballroom Services",
  className = "",
}: ServicesHeroProps) {
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
