"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion } from "./hooks/useAnimation";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    // 1. Accessibility and Device Guard
    // Completely disable on touch devices, coarse pointers, and reduced motion
    if (
      isReducedMotion() ||
      typeof window === "undefined" ||
      !("matchMedia" in window) ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    const container = containerRef.current;
    if (!dot || !ring || !container) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovered = false;
    let currentCursorText = "";
    let rafId: number;

    const lerpDot = 0.85; // Dot follows almost instantly
    const lerpRing = 0.15; // Outer circle follows with smooth inertia (0.12-0.18 target)

    // GSAP tweens for hover-state transitions only (scale 32px -> 52px, opacity, text)
    const setHoverState = (hover: boolean, label: string = "") => {
      if (isHovered === hover && currentCursorText === label) return;
      isHovered = hover;
      currentCursorText = label;

      if (hover) {
        // Enlarge outer circle ~32px -> 52px (scale: 1.625) with subtle luxury fill
        gsap.to(ring, {
          scale: 1.625,
          borderColor: "rgba(182, 154, 106, 0.85)",
          backgroundColor: "rgba(182, 154, 106, 0.14)",
          duration: 0.32,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (textEl && label) {
          textEl.textContent = label;
          gsap.to(textEl, {
            opacity: 1,
            scale: 1,
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      } else {
        // Return to resting thin gold/cream circle (32px)
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(182, 154, 106, 0.45)",
          backgroundColor: "transparent",
          duration: 0.32,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (textEl) {
          gsap.to(textEl, {
            opacity: 0,
            scale: 0.7,
            duration: 0.18,
            ease: "power2.in",
            overwrite: "auto",
            onComplete: () => {
              if (textEl && !isHovered) textEl.textContent = "";
            },
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dotX = mouseX;
        dotY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
        container.style.opacity = "1";
      }

      // Detect interactive targets without triggering React re-renders
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, .event-card, .journal-card, [data-cursor]"
      );

      if (interactive) {
        const customText = interactive.getAttribute("data-cursor") || "";
        setHoverState(true, customText);
      } else {
        setHoverState(false, "");
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      container.style.opacity = "0";
      setHoverState(false, "");
    };

    // GPU-friendly requestAnimationFrame loop using transform: translate3d
    const update = () => {
      if (isVisible) {
        // 1. Center dot follows almost instantly
        dotX += (mouseX - dotX) * lerpDot;
        dotY += (mouseY - dotY) * lerpDot;
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

        // 2. Large outer ring follows behind with responsive inertia
        ringX += (mouseX - ringX) * lerpRing;
        ringY += (mouseY - ringY) * lerpRing;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
      gsap.killTweensOf([ring, textEl]);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-100 opacity-0 transition-opacity duration-300 select-none"
      aria-hidden="true"
    >
      {/* Small Gold Center Dot (8px diameter, anchored to pointer) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-gold will-change-transform shadow-xs"
      />

      {/* Large Thin Gold/Cream Outlined Circle (32px diameter, enlarges to 52px on hover) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-gold/45 bg-transparent will-change-transform flex items-center justify-center"
      >
        <span
          ref={textRef}
          className="text-[7px] font-body font-medium tracking-[0.16em] uppercase text-white-text opacity-0 scale-75 select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
