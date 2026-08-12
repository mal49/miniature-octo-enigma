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

    // Lenis smooths the wheel but not anchor clicks — those stay native jumps
    // unless handed to lenis.scrollTo. Offset clears the 4rem fixed nav.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as Element)?.closest?.<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.2 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
