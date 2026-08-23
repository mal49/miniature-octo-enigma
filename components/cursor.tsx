"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";

const INTERACTIVE = "a, button, [data-cursor]";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    // Touch/pen devices have no hover cursor to decorate.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // GSAP owns the transform, so centering has to live here — a Tailwind
    // -translate-1/2 gets absorbed into x/y on the first set and then wiped.
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3.out" });
    // quickTo, not gsap.to with overwrite — an overwriting tween on this element
    // kills the x/y quickTos too, which froze the dot on the first link hover.
    const scaleTo = gsap.quickTo(dot, "scale", {
      duration: 0.4,
      ease: "expo.out",
    });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        gsap.to(dot, { autoAlpha: 1, duration: 0.4, ease: "expo.out" });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // One handler, tracking which interactive element we are inside. pointerout
    // fires when crossing between a link's own children, which made the scale
    // flicker every time the pointer moved over a nested span.
    let hovered: Element | null = null;
    const onOver = (e: PointerEvent) => {
      const next = (e.target as Element)?.closest?.(INTERACTIVE) ?? null;
      if (next === hovered) return;
      hovered = next;
      scaleTo(next ? 3.2 : 1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      gsap.killTweensOf(dot);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-3 w-3 bg-white opacity-0 mix-blend-difference md:block"
      style={{ willChange: "transform" }}
    />
  );
}
