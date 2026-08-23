"use client";

import { useRef } from "react";
import { gsap, SplitText, useIsoLayoutEffect } from "@/lib/gsap";
import { REVEAL } from "@/lib/motion";
import { Reveal } from "@/components/reveal";
import { about } from "@/data/content";

/**
 * `[*]` / `[**]` / `[***]` in the copy become raised footnote marks keyed to
 * the grid at the foot of the section. String.split with a capturing group
 * puts every match at an odd index, so parity is the test — a /g regex reused
 * with .test() carries lastIndex between calls and matches every other time.
 */
const marked = (text: string) =>
  text
    .split(/(\[\*{1,3}\])/)
    .map((part, i) =>
      i % 2 ? (
        <sup key={i} className="mark">
          {part}
        </sup>
      ) : (
        part
      )
    );

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
      <div className="p-[var(--gutter)] pb-[86px] pt-[43px]">
        <Reveal variant="fade" className="t-label mb-[43px]" as="p">
          About
        </Reveal>

        <p ref={copy} className="t-statement">
          {marked(`${about.lead}. ${about.body}`)}
        </p>

        <Reveal
          variant="list"
          as="dl"
          className="mt-[86px] grid grid-cols-1 gap-[var(--gutter)] md:grid-cols-3"
        >
          {about.footnotes.map((f) => (
            <div key={f.mark} className="flex gap-[7px]">
              <dt className="shrink-0">{f.mark}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
