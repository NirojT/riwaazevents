"use client";

import React, { type ElementType } from "react";
import { useTextReveal } from "./hooks/useAnimation";

interface RevealTextProps {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function RevealText({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 1.1,
}: RevealTextProps) {
  const innerRef = useTextReveal<HTMLSpanElement>({ delay, duration });

  return (
    <Component className={`overflow-hidden block ${className}`}>
      <span ref={innerRef} className="block will-change-transform">
        {children}
      </span>
    </Component>
  );
}
