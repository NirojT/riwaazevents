import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid" | "ghost" | "gold" | "glass";
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

  // Base styles: luxury tracked uppercase, transition with modern rounded-sm radius
  const baseStyles =
    "inline-flex items-center justify-center font-sans uppercase font-medium rounded-sm transition-all duration-300 select-none cursor-pointer focus:outline-none";

  // Variant & Theme mappings using canonical theme utilities
  let variantStyles = "";

  if (variant === "outline") {
    if (theme === "dark") {
      variantStyles =
        "border border-white/25 text-white-text bg-white/[0.08] hover:bg-white/[0.18] hover:border-white/50 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_20px_-4px_rgba(0,0,0,0.25)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_12px_24px_rgba(0,0,0,0.3)]";
    } else {
      variantStyles =
        "border border-charcoal/20 text-charcoal bg-black/[0.03] hover:bg-maroon hover:text-white-text hover:border-maroon backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]";
    }
  } else if (variant === "solid") {
    variantStyles =
      "bg-maroon/95 text-white-text hover:bg-maroon-light active:scale-[0.99] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_6px_16px_rgba(0,0,0,0.2)]";
  } else if (variant === "gold") {
    variantStyles =
      "bg-linear-to-b from-[#d5c096]/90 via-[#b69a6a]/85 to-[#967d52]/90 hover:from-[#dfceab]/95 hover:via-[#c4a979]/90 hover:to-[#a3895c]/95 text-white backdrop-blur-xl border border-white/35 hover:border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_8px_20px_-4px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_12px_28px_rgba(182,154,106,0.35)] font-semibold tracking-[0.2em]";
  } else if (variant === "glass") {
    variantStyles =
      "bg-white/[0.08] hover:bg-white/[0.18] text-white-text backdrop-blur-xl border border-white/25 hover:border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_20px_-4px_rgba(0,0,0,0.25)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_12px_28px_rgba(0,0,0,0.35)] active:scale-[0.98]";
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
