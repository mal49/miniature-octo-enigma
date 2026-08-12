"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Default wrapper is window, so Lenis drives real native scrolling and
    // ScrollTrigger's default scroller already reads correct values.
    // scrollerProxy is only for transform-based / virtual scrollers.
    const lenis = new Lenis({ lerp: 0.08 });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (t: number) => lenis.raf(t * 1000); // ticker: seconds, lenis: ms
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
