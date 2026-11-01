"use client";

import React, { type ElementType } from "react";
import { useFadeUp } from "./hooks/useAnimation";

interface FadeUpProps {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export default function FadeUp({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 0.95,
  y = 30,
}: FadeUpProps) {
  const ref = useFadeUp<HTMLDivElement>({ delay, duration, y });

  return (
    <Component ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </Component>
  );
}
