"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";
import { EASE, HERO_EXIT, INTRO } from "@/lib/motion";
import { Logotype } from "@/components/logotype";
import { Nav } from "@/components/nav";
import { heroEntries, heroHeadline, site } from "@/data/content";

/**
 * Hero + intro, built to match the reference section by section:
 *
 *   .loading-anim-wrapper   the loader; a timed graphic plus a colour panel
 *                           that slides up at 1s
 *   .hero-top-wrapper       logotype, bold ink bar, nav rule
 *   .hero-home-wrapper      left: modernists list + rule; right: three masked
 *                           headline lines and the scroll cue
 *   .anim-fixed-wrapper     ONLY the scroll cue is fixed — the hero itself is
 *                           an ordinary static section
 *
 * One timeline drives all of it, because a-63 is one action list. Every element
 * time lives in INTRO.
 *
 * The one deliberate departure from the reference: rather than the loader
 * fading out to expose the wordmark, the loading square grows into the exact
 * box the logotype occupies and the two cross-wipe, so the square is what makes
 * the word.
 */

/** The intro runs once per tab session. sessionStorage rather than module
 *  scope: the nav's route links are plain anchors, so coming back to / is a
 *  full load that would reset a module variable. */
const INTRO_KEY = "intro-played";
const introPlayed = () => {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
};

export function Hero({
  galleryBtnRef,
  onOpenGallery,
}: {
  galleryBtnRef: React.Ref<HTMLButtonElement>;
  onOpenGallery: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const q = gsap.utils.selector(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = introPlayed();

    const ctx = gsap.context(() => {
      // Reduced motion, or the intro already ran this session: land on the
      // end state.
      if (reduce || played) {
        gsap.set("[data-loader], [data-seed]", { display: "none" });
        gsap.set("[data-logotype]", { clipPath: "none", autoAlpha: 1 });
        q("[data-hero-line]").forEach((line) => {
          if (line.parentElement) line.parentElement.style.overflow = "visible";
        });
      }
      if (reduce) return;

      // ── a-69: the scroll cue is the hero's only fixed element ──
      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6, // Webflow "smoothing: 60"
        },
      });
      HERO_EXIT.slice(1).forEach((k, i) => {
        exit.to(
          "[data-scroll-fixed]",
          { yPercent: k.y, ease: EASE.linear, duration: k.p - HERO_EXIT[i].p },
          HERO_EXIT[i].p
        );
      });
      // Pad to 1 unit: a scrubbed timeline is stretched over its trigger's
      // whole range, so without this every keyframe lands later than its
      // measured fraction of page scroll.
      exit.set({}, {}, 1);

      if (played) return;

      // Flagged on completion, not on start: StrictMode's mount/unmount/mount
      // in dev would otherwise skip the intro on the second mount.
      const tl = gsap.timeline({
        onComplete() {
          try {
            sessionStorage.setItem(INTRO_KEY, "1");
          } catch {}
        },
      });

      // ── Loader: a 0 -> 100 count and a progress rule fill the window the
      //    reference's loading Lottie occupies. Without something running the
      //    loader just sits there and reads as a hang. ──
      const counter = { v: 0 };
      const countNode = q("[data-count]")[0];

      tl.to(
        counter,
        {
          v: 100,
          duration: INTRO.count.dur,
          ease: EASE.inOutCubic,
          onUpdate() {
            if (countNode) {
              countNode.textContent = `${String(Math.round(counter.v)).padStart(3, "0")}%`;
            }
          },
        },
        INTRO.count.at
      )
        .fromTo(
          "[data-count-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: INTRO.count.dur, ease: EASE.inOutCubic },
          INTRO.count.at
        )
        .fromTo(
          "[data-seed]",
          {
            xPercent: -50,
            yPercent: -50 + INTRO.markIn.fromY,
            scale: INTRO.markIn.fromScale,
          },
          {
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            duration: INTRO.markIn.dur,
            ease: EASE.inOutCubic,
          },
          INTRO.markIn.at
        )
        // .loading-bg-color slides up at 1s, revealing the seed and the count
        .to(
          "[data-loader-panel]",
          { yPercent: -100, duration: INTRO.panelUp.dur, ease: EASE.inOutCubic },
          INTRO.panelUp.at
        )
        // The loader's ground leaves; the seed stays, it is not part of it.
        .to(
          "[data-loader]",
          {
            autoAlpha: 0,
            duration: INTRO.loaderOut.dur,
            onComplete() {
              gsap.set("[data-loader]", { display: "none" });
            },
          },
          INTRO.loaderOut.at
        );

      // ── The square becomes the wordmark ──
      // Measured, not hardcoded: the seed is centred in the viewport and the
      // logotype is in flow, so the distance between them depends on the
      // viewport. Read both boxes with the seed at its resting size.
      const seed = q("[data-seed]")[0];
      const logo = q("[data-logotype]")[0];

      tl.add(() => {
        if (!seed || !logo) return;
        const s = seed.getBoundingClientRect();
        const l = logo.getBoundingClientRect();
        // The seed is measured mid-timeline, with its scale-to-1 tween already
        // finished, so this is the true 86px resting square. Scaling happens
        // about the default 50% origin, which is why matching centres is all
        // the maths this needs.
        gsap.to(seed, {
          x: l.left + l.width / 2 - (s.left + s.width / 2),
          y: l.top + l.height / 2 - (s.top + s.height / 2),
          scaleX: l.width / s.width,
          scaleY: l.height / s.height,
          duration: INTRO.morph.dur,
          ease: EASE.inOutQuart,
        });
      }, INTRO.morph.at);

      // ── Cross-wipe: the block clears left to right as the letters arrive ──
      tl.fromTo(
        "[data-logotype]",
        { clipPath: "inset(-25% 100% -25% 0)" },
        {
          // Negative top/bottom: the wordmark's line-height crops the font's
          // internal leading, so the caps stand proud of the element's box and
          // a plain inset(0 ...) would shave them off.
          clipPath: "inset(-25% 0% -25% 0)",
          duration: INTRO.wipe.dur,
          ease: EASE.inOutQuart,
        },
        INTRO.wipe.at
      ).to(
        "[data-seed]",
        {
          clipPath: "inset(0 0 0 100%)",
          duration: INTRO.wipe.dur,
          ease: EASE.inOutQuart,
          onComplete() {
            gsap.set("[data-seed]", { display: "none" });
          },
        },
        INTRO.wipe.at
      );

      // ── The rest of the hero builds off the resolved wordmark ──
      //
      // fromTo, not from: under reduced motion the context returns before this
      // timeline exists, and a `from` would leave the nav with no styles to
      // restore. The drift is upward from below so the row never crosses the
      // wordmark on its way in.
      tl.fromTo(
        "[data-nav]",
        { autoAlpha: 0, y: INTRO.nav.fromY },
        { autoAlpha: 1, y: 0, duration: INTRO.nav.dur, ease: EASE.inOutCubic },
        INTRO.nav.at
      ).fromTo(
        "[data-rule='1']",
        { scaleY: 0 },
        { scaleY: 1, duration: INTRO.rule1.dur, ease: EASE.inOutCubic },
        INTRO.rule1.at
      )
        .fromTo(
          "[data-rule='3']",
          { scaleX: 0 },
          { scaleX: 1, duration: INTRO.rule3.dur, ease: EASE.inOutCubic },
          INTRO.rule3.at
        )
        .fromTo(
          "[data-hero-right]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: INTRO.rightArea.dur },
          INTRO.rightArea.at
        )
        .fromTo(
          "[data-scroll-wrap]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: INTRO.scrollCue.dur },
          INTRO.scrollCue.at
        )
        .fromTo(
          "[data-hero-list]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: INTRO.list.dur },
          INTRO.list.at
        );

      // ── Headline: three masked lines, y 110% -> 0, 100ms apart ──
      heroHeadline.forEach((_, i) => {
        tl.fromTo(
          `[data-hero-line='${i}']`,
          { yPercent: INTRO.lines.fromY },
          {
            yPercent: 0,
            duration: INTRO.lines.dur,
            ease: EASE.outCubic,
            onComplete() {
              // Release the clip, or the display type's descenders stay sheared.
              const line = q(`[data-hero-line='${i}']`)[0];
              if (line?.parentElement) line.parentElement.style.overflow = "visible";
            },
          },
          INTRO.lines.at[i]
        );
      });

      tl.add(() => ScrollTrigger.refresh());
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* ── Loader ground (.loading-anim-wrapper) ── */}
      <div
        data-loader
        aria-hidden
        className="fixed inset-0 z-50 overflow-hidden bg-[var(--paper)]"
      >
        {/* .loading-bg-color — ink panel, slides up at 1s */}
        <div data-loader-panel className="absolute inset-0 bg-[var(--ink)]" />

        <div className="absolute inset-0 grid place-items-center">
          {/* Reserves the seed's slot so the count sits below it; the seed
              itself is a sibling of the loader so the ground can leave without
              taking it. */}
          <span className="flex flex-col items-center gap-[14px]">
            <span className="block h-[86px] w-[86px]" />
            <span data-count className="t-label block tabular-nums">
              000%
            </span>
          </span>
        </div>

        <span
          data-count-rule
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-[var(--ink)]"
        />
      </div>

      {/* The square that becomes the wordmark. Outlives the loader, so it is
          not a child of it. Sits one layer above. */}
      <span
        data-seed
        aria-hidden
        className="fixed left-1/2 top-1/2 z-[51] block h-[86px] w-[86px] bg-[var(--ink)]"
      />

      {/* ── Hero: an ordinary section, not a fixed layer ── */}
      <section id="top" className="flex min-h-[100svh] flex-col justify-between">
        {/* .hero-top-wrapper — the wordmark is the first thing on the page. */}
        <div>
          <div data-logotype style={{ clipPath: "inset(-25% 100% -25% 0)" }}>
            <Logotype />
          </div>
        </div>

        {/* The nav sits under the wordmark and pins to the top from there.
            It is a direct child of the section, not of the masthead div above:
            a sticky element can only travel inside its own parent's box, and
            that box is only as tall as the wordmark — the nav would unstick
            240px in. The grid below takes flex-1, so it absorbs the free space
            and justify-between has none left to push this row around with. */}
        <Nav ref={galleryBtnRef} onOpenGallery={onOpenGallery} />

        {/* .hero-home-wrapper */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-[33%_1fr]">
          <div
            data-hero-list
            className="relative flex flex-col justify-end gap-[7px] p-[var(--gutter)]"
          >
            <span
              data-rule="1"
              aria-hidden
              className="absolute right-0 top-0 hidden h-full w-px origin-top bg-[var(--ink)] md:block"
            />
            <span>Modernists:</span>
            {heroEntries.map((entry) => (
              <span key={entry.id}>
                {entry.id}: {entry.label}
              </span>
            ))}
          </div>

          <div
            data-hero-right
            className="flex flex-col justify-end p-[var(--gutter)]"
          >
            <h1 className="t-display">
              {heroHeadline.map((line, i) => (
                <span key={line} className="mask block">
                  <span data-hero-line={i} className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        <div className="relative flex items-end justify-between p-[var(--gutter)]">
          <span
            data-rule="3"
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--ink)]"
          />
          <span data-hero-list>
            {site.role} &mdash; {site.city}
          </span>

          {/* .scroll-wrapper.hero — its arrow is the page's only fixed hero
              element (.anim-fixed-wrapper). */}
          <a
            data-scroll-wrap
            href="#about"
            className="hov flex items-center gap-[7px]"
          >
            Scroll to Explore
            <span data-scroll-fixed aria-hidden className="block">
              &darr;
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
