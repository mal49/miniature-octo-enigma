"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { REVEAL } from "@/lib/motion";

/**
 * The reference's SCROLL_INTO_VIEW action lists, one variant each:
 *   item    a-31  y 100% -> 0 + fade, 600ms outQuad
 *   fade    a-32  opacity, 500ms
 *   heading a-56  y 110% -> 0, 900ms easeInOutCubic
 *   block   a-5   y 100% -> 0, 900ms easeInOutCubic
 *   list    a-59  y 3% -> 0 + fade, 1300ms after 500ms, easeInOutCubic
 *   line    a-58  width 0 -> 100%, 1200ms easeInOutCubic
 * All fire once, when the element's top passes 85% of the viewport.
 */
export type RevealVariant = "item" | "fade" | "heading" | "block" | "list" | "line";

const build = (variant: RevealVariant) => {
  switch (variant) {
    case "fade":
      return { from: { autoAlpha: 0 }, to: { autoAlpha: 1, duration: REVEAL.fade.dur } };
    case "heading":
      return {
        from: { yPercent: 110 },
        to: { yPercent: 0, duration: REVEAL.heading.dur, ease: REVEAL.heading.ease },
      };
    case "block":
      return {
        from: { yPercent: 100 },
        to: { yPercent: 0, duration: REVEAL.block.dur, ease: REVEAL.block.ease },
      };
    case "list":
      return {
        from: { yPercent: 3, autoAlpha: 0 },
        to: {
          yPercent: 0,
          autoAlpha: 1,
          duration: REVEAL.list.dur,
          delay: REVEAL.list.at,
          ease: REVEAL.list.ease,
        },
      };
    case "line":
      return {
        from: { scaleX: 0 },
        to: { scaleX: 1, duration: REVEAL.line.dur, ease: REVEAL.line.ease },
      };
    default:
      return {
        from: { yPercent: 100, autoAlpha: 0 },
        to: {
          yPercent: 0,
          autoAlpha: 1,
          duration: REVEAL.item.dur,
          ease: REVEAL.item.ease,
        },
      };
  }
};

export function Reveal({
  children,
  className,
  as: Tag = "div",
  variant = "item",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variant?: RevealVariant;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // gsap.context scopes and reverts every tween and ScrollTrigger created
    // inside it, so StrictMode's double mount cannot leave a second trigger
    // registered.
    const ctx = gsap.context(() => {
      const { from, to } = build(variant);
      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onComplete() {
          // Release the clip so descenders are not sheared at rest.
          const mask = el.parentElement;
          if (mask?.classList.contains("mask")) mask.style.overflow = "visible";
        },
      });
    }, el);

    return () => ctx.revert();
  }, [variant]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
