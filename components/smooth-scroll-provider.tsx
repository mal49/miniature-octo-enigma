"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let instance: Lenis | null = null;

/** The gallery overlay needs to stop/start the same instance the page uses. */
export const getLenis = () => instance;

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Every load starts on the hero. Two things otherwise land you mid-page,
    // with the intro timeline playing over whatever section you were parked
    // on: the browser restoring the previous offset on refresh, and the #hash
    // the nav writes on every anchor click.
    //
    // `manual` kills the restore. The hash is handled at the source instead,
    // in the click handler below: Next's router strips the fragment before
    // hydration and re-applies it afterwards, so by the time this effect runs
    // location.hash is already empty and there is nothing here to clear.
    //
    // This has to happen before Lenis is constructed: it reads the current
    // offset on init and would smooth back down from wherever it read.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const toTop = () => window.scrollTo(0, 0);
    toTop();
    // Belt and braces for a load still in flight, where the fragment scroll
    // can be queued behind hydration.
    window.addEventListener("load", toTop, { once: true });

    // Reduced motion skips Lenis entirely, but the reset above still applies,
    // so this branch owns tearing its own listener down.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("load", toTop);
    }

    // Default wrapper is window, so Lenis drives real native scrolling and
    // ScrollTrigger's default scroller already reads correct values.
    // lerp only. Lenis treats lerp and duration as mutually exclusive and
    // prefers duration when both are given, so the old `duration: 1.2` here
    // restarted a 1.2s eased animation on every wheel tick — which reads as
    // lag, not smoothing. duration still belongs on scrollTo below, where a
    // fixed travel time is exactly what is wanted.
    const lenis = new Lenis({ lerp: 0.1 });
    instance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (t: number) => lenis.raf(t * 1000); // ticker: seconds, lenis: ms
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Lenis smooths the wheel but not anchor clicks — those stay native jumps
    // unless handed to lenis.scrollTo.
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
      lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
      // Deliberately no pushState of the hash. Writing it means a refresh
      // after any nav click reloads onto that section, with the intro
      // timeline playing over it — and the fragment jump is Next's, applied
      // after hydration, so it cannot be undone from here. Not writing it is
      // the only reliable way to always come back to the hero.
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("load", toTop);
      document.removeEventListener("click", onClick);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (instance === lenis) instance = null;
    };
  }, []);

  return <>{children}</>;
}
