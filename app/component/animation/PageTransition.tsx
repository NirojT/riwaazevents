"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { isReducedMotion } from "./hooks/useAnimation";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first initial page load so hero timeline plays naturally
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Deep wine luxury curtain wipe
      tl.set(overlay, { scaleY: 1, transformOrigin: "bottom" })
        .to(overlay, {
          scaleY: 0,
          duration: 0.65,
          ease: "power3.inOut",
        });
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-90 bg-maroon-dark transform scale-y-0"
    />
  );
}
