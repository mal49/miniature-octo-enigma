"use client";

import { useRef } from "react";
import { gsap, SplitText, useIsoLayoutEffect } from "@/lib/gsap";
import { REVEAL } from "@/lib/motion";
import { Reveal } from "@/components/reveal";
import { about } from "@/data/content";

/**
 * The statement is one flowing block of display type, revealed a line at a
 * time from behind its own mask (a-5). The lines are not authored: SplitText
 * measures where the text actually wraps and builds a mask per line, so the
 * copy can change without anyone re-breaking it by hand.
 */
export function About() {
  const copy = useRef<HTMLParagraphElement>(null);

  useIsoLayoutEffect(() => {
    const el = copy.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;
    let cancelled = false;

    // Fonts first. Splitting while Inter Tight is still swapping measures the
    // fallback's line breaks, and the masks end up wrapping the wrong words.
    document.fonts.ready.then(() => {
      if (cancelled) return;

      split = SplitText.create(el, { type: "lines", mask: "lines" });
      tween = gsap.from(split.lines, {
        yPercent: 100,
        duration: REVEAL.block.dur,
        ease: REVEAL.block.ease,
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        // Put the paragraph back once it has landed: the masks are fixed-height
        // boxes measured at one viewport width, so leaving them in place clips
        // the copy the moment the window is resized — and shears descenders,
        // the same reason .mask is dropped after a Reveal.
        onComplete: () => split?.revert(),
      });
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, []);

  return (
    <section id="about" className="rule-b">
      <div className="p-[var(--gutter)] pb-[129px] pt-[43px]">
        <Reveal variant="fade" className="t-label mb-[43px]" as="p">
          About
        </Reveal>

        <p ref={copy} className="t-statement max-w-[22ch]">
          {about}
        </p>
      </div>
    </section>
  );
}
