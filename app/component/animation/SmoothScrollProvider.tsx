"use client";

import React, { createContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollContextType {
  getLenis: () => Lenis | null;
  reducedMotion: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
  reducedMotion: false,
});


interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // If user prefers reduced motion or is on a pure touch device, use native zero-delay scroll
    const isTouchOnly =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches &&
      navigator.maxTouchPoints > 0;

    if (motionQuery.matches || isTouchOnly) {
      return () => {
        motionQuery.removeEventListener("change", handleMotionChange);
      };
    }

    // Initialize Lenis with ultra-responsive, zero-delay smooth scroll
    const lenis = new Lenis({
      duration: 0.75, // Snappy, instant response without the heavy 1.25s trailing delay
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // NEVER hijack touch gestures; maintain 100% native mobile responsiveness
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Tie Lenis frame update to GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    // Smooth out any momentary frame drops (500ms max lag, 33ms target threshold)
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On route change, reset scroll to top immediately & refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider value={{ getLenis: () => lenisRef.current, reducedMotion }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
