import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  arrow?: "right" | "up" | "none";
  theme?: "light" | "dark";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "outline",
  size = "md",
  href,
  arrow = "none",
  theme = "light",
  children,
  className = "",
  ...props
}: ButtonProps) {
  // Size styles without sm breakpoint
  const sizeStyles = {
    sm: "px-6 py-2 text-[11px] tracking-[0.16em]",
    md: "px-8 py-3.5 md:px-7 md:py-3 text-xs md:text-sm tracking-[0.18em]",
    lg: "px-10 py-4.5 text-sm md:text-base tracking-[0.2em]",
  }[size];

  // Base styles: luxury tracked uppercase, transition (no bold/extrabold)
  const baseStyles =
    "inline-flex items-center justify-center font-body uppercase font-medium transition-all duration-300 select-none cursor-pointer focus:outline-none";

  // Variant & Theme mappings using canonical theme utilities
  let variantStyles = "";

  if (variant === "outline") {
    if (theme === "dark") {
      variantStyles =
        "border border-white-text/40 text-white-text bg-transparent hover:bg-white-text hover:text-charcoal hover:border-white-text";
    } else {
      variantStyles =
        "border border-charcoal/30 text-charcoal bg-transparent hover:bg-maroon hover:text-white-text hover:border-maroon";
    }
  } else if (variant === "solid") {
    variantStyles =
      "bg-maroon text-white-text hover:bg-maroon-light active:scale-[0.99] shadow-sm";
  } else if (variant === "gold") {
    variantStyles =
      "bg-gold text-charcoal hover:bg-gold-light font-semibold tracking-[0.2em]";
  } else if (variant === "ghost") {
    variantStyles =
      theme === "dark"
        ? "text-white-text/80 hover:text-white-text bg-transparent"
        : "text-charcoal/80 hover:text-charcoal bg-transparent";
  }

  const combinedStyles = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  const renderIcon = () => {
    if (arrow === "right") {
      return (
        <ArrowRight className="ml-2.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      );
    }
    if (arrow === "up") {
      return (
        <ArrowUp className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
      );
    }
    return null;
  };

  if (href) {
    return (
      <Link href={href} className={`group ${combinedStyles}`}>
        <span>{children}</span>
        {renderIcon()}
      </Link>
    );
  }

  return (
    <button className={`group ${combinedStyles}`} {...props}>
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
}
