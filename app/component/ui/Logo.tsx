import Link from "next/link";
import Image from "./Image";

interface LogoProps {
  theme?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  className = "",
  size = "md",
}: LogoProps) {
  // Balanced aspect-ratio dimensions to maximize logo artwork visibility
  const sizeClasses = {
    sm: "h-12 w-20 md:h-14 md:w-24",
    md: "h-16 w-28 md:h-20 md:w-36",
    lg: "h-24 w-40 md:h-32 md:w-52",
  }[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center transition-all duration-300 hover:opacity-90 ${className}`}
      aria-label="Riwaaj Events Home"
    >
      <div className={`relative ${sizeClasses}`}>
        <Image
          src="/site/assets/reallogo.webp"
          alt="Riwaaj Events Logo"
          fill
          sizes="(max-width: 768px) 160px, 240px"
          className="object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          preload
        />
      </div>
    </Link>
  );
}
