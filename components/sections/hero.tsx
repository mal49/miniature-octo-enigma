"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useIsoLayoutEffect } from "@/lib/gsap";

const TOP_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Works", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** Preloader count 0 → 100. Digit reels and the progress line share it. */
const COUNT_DURATION = 3.6;

const MARQUEE_PHRASES = [
  "WEB APPS & SITES",
  "E-COMMERCE & PAYMENTS",
  "MOBILE & PWA",
  "MAINTENANCE & CONSULTING",
];

/** A column of stacked numerals; yPercent-tweened so the digit rolls. */
function DigitColumn({
  cells,
  reelRef,
}: {
  cells: string[];
  reelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <span className="block h-[1em] overflow-hidden">
      <span ref={reelRef as React.RefObject<HTMLDivElement>} className="block">
        {cells.map((d, i) => (
          <span key={i} className="block h-[1em] leading-[1em]">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Overflow-masked label: sits still, duplicate slides in from below on hover. */
function MaskedLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group relative block h-[1em] overflow-hidden leading-[1em]"
    >
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        {label}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      >
        {label}
      </span>
    </a>
  );
}

export function Hero({ src, poster }: { src?: string; poster?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const hundredsRef = useRef<HTMLDivElement>(null);
  const tensRef = useRef<HTMLDivElement>(null);
  const unitsRef = useRef<HTMLDivElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLImageElement>(null);
  const headLeftRef = useRef<HTMLSpanElement>(null);
  const headRightRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const overlay = overlayRef.current;
    if (!root || !overlay) return;

    // Reduced motion: the markup already renders the final state, so just
    // drop the curtain overlay. No font gate, no timeline, no infinite marquee.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      overlay.style.display = "none";
      return;
    }

    let cancelled = false;
    let charSplit: SplitText | null = null;
    let lineSplit: SplitText | null = null;
    const mm = gsap.matchMedia();
    const cleanups: Array<() => void> = [];

    (async () => {
      // Splitting before the webfont swaps bakes fallback metrics into the
      // split. The 1500ms cap is load-bearing: a fonts.ready that never
      // resolves would leave the curtain down forever.
      await Promise.race([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, 1500)),
      ]);
      if (cancelled) return;

      charSplit = new SplitText([headLeftRef.current!, headRightRef.current!], {
        type: "chars",
        mask: "chars",
      });
      lineSplit = new SplitText(taglineRef.current!, {
        type: "lines",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // ── Preloader: three digit reels roll 0 → 100, 1px line grows ──
      const roll = (
        ref: React.RefObject<HTMLDivElement | null>,
        steps: number
      ) =>
        // Each cell is 1em tall, so the reel travels `steps` em — NOT
        // -100%×steps, which is a share of the whole reel, not one cell.
        gsap.fromTo(
          ref.current,
          { y: 0 },
          {
            y: `-${steps}em`,
            duration: COUNT_DURATION,
            ease: "power4.inOut",
          }
        );

      tl.add(roll(hundredsRef, 1), 0)
        .add(roll(tensRef, 10), 0)
        .add(roll(unitsRef, 100), 0)
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: COUNT_DURATION, ease: "power4.inOut" },
          0
        )
        // ── Curtain lifts by clip-path. No fade. ──
        .to(
          overlay,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.1,
            ease: "power4.inOut",
            onComplete: () => {
              overlay.style.display = "none";
            },
          },
          ">"
        )
        // ── Hero entrance starts as the curtain is still moving ──
        .addLabel("enter", "-=0.6");

      if (mediaWrapRef.current) {
        tl.fromTo(
          mediaWrapRef.current,
          { clipPath: "inset(45% 45% 45% 45%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" },
          "enter"
        ).fromTo(
          "[data-hero-media]",
          { scale: 1.25 },
          { scale: 1, duration: 1.4, ease: "power4.inOut" },
          "<"
        );
      }

      tl.from(
          charSplit.chars,
          { yPercent: 110, duration: 1, stagger: 0.02 },
          "enter+=0.5"
        )
        .from(
          "[data-hero-label]",
          { autoAlpha: 0, y: 12, duration: 0.9, stagger: 0.06 },
          ">-0.4"
        )
        .from(lineSplit.lines, { yPercent: 110, duration: 1, stagger: 0.08 }, "<")
        .from(scrollCueRef.current, { autoAlpha: 0, duration: 0.8 }, ">-0.3")
        .add(() => {
          gsap.to(scrollCueRef.current, {
            y: 6,
            duration: 1.2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

      cleanups.push(() => tl.kill());

      // ── Pin + scrub (desktop only: pinning a 100svh hero on mobile
      //    fights the collapsing URL bar) ──
      mm.add("(min-width: 768px)", () => {
        const scrub = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
        scrub
          .to(headLeftRef.current, { xPercent: -60, ease: "none" }, 0)
          .to(headRightRef.current, { xPercent: 60, ease: "none" }, 0)
          // Nav stays put while pinned — only the side labels fade out.
          .to(
            "[data-hero-label]:not([data-hero-nav])",
            { autoAlpha: 0, ease: "none" },
            0
          )
          // The mark surfaces in the gap the two words leave behind.
          .fromTo(
            markRef.current,
            // Centering lives here, not in a Tailwind -translate: GSAP owns the
            // transform once it animates scale.
            { autoAlpha: 0, scale: 0.55, xPercent: -50, yPercent: -50 },
            { autoAlpha: 1, scale: 1, xPercent: -50, yPercent: -50, ease: "none" },
            0
          );
        if (mediaWrapRef.current) {
          scrub.to(
            mediaWrapRef.current,
            { scale: 1.15, borderRadius: 0, ease: "none" },
            0
          );
        }
      });

      ScrollTrigger.refresh();
    })();

    // ── Marquee band: continuous, with scroll velocity folded into timeScale ──
    const track = marqueeTrackRef.current;
    if (track) {
      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
      const decay = gsap.delayedCall(0.5, () =>
        gsap.to(loop, { timeScale: 1, duration: 0.6, ease: "expo.out" })
      );
      decay.pause();

      const velTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            -6,
            6,
            1 + Math.abs(self.getVelocity()) / 400
          );
          gsap.to(loop, {
            timeScale: boost * (self.direction || 1),
            duration: 0.4,
            ease: "expo.out",
            overwrite: true,
          });
          decay.restart(true);
        },
      });

      cleanups.push(() => {
        velTrigger.kill();
        decay.kill();
        loop.kill();
      });
    }

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      // matchMedia does not undo SplitText's DOM surgery — revert splits first.
      charSplit?.revert();
      lineSplit?.revert();
      mm.revert();
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      {/* ── Preloader ── */}
      {/* SSR'd opaque so no hero content flashes before hydration; without JS
          it would never lift, so hide it outright in that case. */}
      <noscript>
        <style>{`[data-preloader]{display:none!important}`}</style>
      </noscript>
      <div
        ref={overlayRef}
        data-preloader
        aria-hidden
        className="fixed inset-0 z-[100] bg-background"
        style={{ clipPath: "inset(0 0 0% 0)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[clamp(3rem,12vw,7rem)] font-medium leading-[1em] tracking-tight text-foreground">
          <DigitColumn cells={["0", "1"]} reelRef={hundredsRef} />
          <DigitColumn
            cells={[...Array.from({ length: 10 }, (_, i) => String(i)), "0"]}
            reelRef={tensRef}
          />
          <DigitColumn
            cells={[
              ...Array.from({ length: 10 }).flatMap(() =>
                Array.from({ length: 10 }, (_, i) => String(i))
              ),
              "0",
            ]}
            reelRef={unitsRef}
          />
          <span className="ml-[0.08em] text-[0.5em] leading-[1em]">%</span>
        </div>
        <span
          ref={barRef}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-foreground"
        />
      </div>

      {/* ── Hero ── */}
      <section
        id="hero"
        ref={rootRef}
        className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-background px-6 py-6 text-foreground md:px-10 md:py-8"
      >
        {/* Media stage — only when there is actual media; no placeholder card */}
        {(src || poster) && (
          <div
            ref={mediaWrapRef}
            data-hero-media-wrap
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42svh] w-[86vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.5rem] md:h-[55vh] md:w-[60vw]"
          >
            {src ? (
              <video
                data-hero-media
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                data-hero-media
                src={poster}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
        )}

        {/* Top bar — links spread edge to edge, wordmark centred */}
        <header className="relative z-10 grid grid-cols-2 items-start font-mono text-[9px] uppercase tracking-[0.25em] sm:grid-cols-5 sm:justify-items-center">
          {TOP_LINKS.slice(0, 2).map((l, i) => (
            <div
              key={l.label}
              data-hero-label
              data-hero-nav
              className={i === 0 ? "justify-self-start" : "hidden sm:block"}
            >
              <MaskedLink {...l} />
            </div>
          ))}

          <div
            data-hero-label
            data-hero-nav
            className="justify-self-end text-center leading-[1.6] sm:justify-self-center"
          >
            <div>Neko</div>
            <div>Labz</div>
          </div>

          {TOP_LINKS.slice(2).map((l) => (
            <div
              key={l.label}
              data-hero-label
              data-hero-nav
              className="hidden sm:block"
            >
              <MaskedLink {...l} />
            </div>
          ))}
        </header>

        {/* Display type */}
        <div className="relative z-10 flex items-baseline justify-between gap-4">
          <span
            data-hero-label
            className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.25em] sm:block"
          >
            Full Stack
          </span>

          <div className="relative flex flex-1 flex-col items-center">
            {/* Revealed in the gap the pin-scrub opens between the two words.
                eslint-disable: a plain img keeps GSAP's transform off next/image's
                wrapper. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={markRef}
              src="/neko-labz.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden w-[min(22vw,16rem)] opacity-0 md:block"
            />

            <h1 className="flex justify-center gap-[0.22em] whitespace-nowrap font-display text-[clamp(4rem,11vw,12rem)] font-semibold leading-[0.85] tracking-[-0.03em]">
              <span ref={headLeftRef} className="block">
                Neko
              </span>
              <span ref={headRightRef} className="block">
                Labz
                <span className="ml-[0.06em] align-baseline font-mono text-[0.1em] font-medium uppercase tracking-[0.2em]">
                  Solutions
                </span>
              </span>
            </h1>
            <p
              data-hero-label
              className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/60"
            >
              by Ikhmal Hanif
            </p>
          </div>

          <span
            data-hero-label
            className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.25em] sm:block"
          >
            {year}
          </span>
        </div>

        {/* Footer row */}
        <div className="relative z-10 flex items-end justify-between gap-6">
          <p
            ref={taglineRef}
            className="font-mono text-[9px] uppercase leading-[1.9] tracking-[0.25em]"
          >
            Developer
            <br />
            Kuala Lumpur
          </p>

          <div
            ref={scrollCueRef}
            className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em]"
          >
            <span>Scroll down</span>
            <span className="h-8 w-px bg-foreground/40" />
          </div>
        </div>
      </section>

      {/* ── Marquee band (sibling: pinned children go position:fixed) ── */}
      <div className="overflow-hidden border-y border-foreground/10 bg-background py-4 text-foreground">
        <div ref={marqueeTrackRef} className="flex w-max">
          {Array.from({ length: 2 }).map((_, copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {MARQUEE_PHRASES.map((phrase) => (
                <span
                  key={phrase}
                  className="flex shrink-0 items-center whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em]"
                >
                  {phrase}
                  <span aria-hidden className="px-6 text-foreground/30">
                    ✳
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
