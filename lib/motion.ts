/**
 * Motion constants lifted verbatim from the reference site's Webflow IX2
 * payload (read out of `Webflow.require("ix2").store.getState().ixData` on a
 * local clone). Action-list ids are quoted so each number can be traced back.
 *
 * Webflow stores easing as cubic-bezier arrays; each one below is a standard
 * Penner curve, so the GSAP equivalent is exact:
 *   [0.645,0.045,0.355,1] easeInOutCubic  -> power2.inOut
 *   [0.215,0.61 ,0.355,1] easeOutCubic    -> power2.out
 *   [0.77 ,0   ,0.175,1] easeInOutQuart  -> power3.inOut
 *   [0.55 ,0.055,0.675,0.19] easeInCubic  -> power2.in
 *   outQuad                               -> power1.out
 */
export const EASE = {
  inOutCubic: "power2.inOut",
  outCubic: "power2.out",
  inOutQuart: "power3.inOut",
  inCubic: "power2.in",
  outQuad: "power1.out",
  linear: "none",
} as const;

/**
 * a-63 — PAGE_FINISH on the home page. Times in seconds, straight off the
 * action list. Element names are the reference's, resolved from its data-w-ids.
 */
export const INTRO = {
  /** the loading count stands in for the reference's 3.9167s loading Lottie */
  count: { at: 0, dur: 2.6 },
  markIn: { at: 1.0, dur: 1.0, fromScale: 3, fromY: 35 },
  panelUp: { at: 1.0, dur: 0.9 },        // .loading-bg-color y 0 -> -100%
  loaderOut: { at: 2.6, dur: 0.4 },      // paper ground + count leave

  /** The loading square is the seed of the wordmark: it grows to the exact box
   *  the logotype occupies, then the two cross-wipe left to right so the solid
   *  block resolves into letterforms. */
  morph: { at: 2.8, dur: 0.9 },
  wipe: { at: 3.7, dur: 0.6 },

  /** The nav row sits directly under the wordmark, so it lands on the beat
   *  the .bold-section-line used to hold, right after the wipe resolves it. */
  nav: { at: 3.9, dur: 0.8, fromY: 12 },
  rule1: { at: 4.1, dur: 1.0 },          // .anim-line._1
  rule3: { at: 4.4, dur: 1.0 },          // .anim-line._3
  rightArea: { at: 4.2, dur: 0.4 },      // .right-area.hero opacity
  scrollCue: { at: 4.3, dur: 0.4 },      // .scroll-wrapper.hero opacity
  list: { at: 4.4, dur: 0.4 },           // .modernists-list opacity
  lines: { at: [4.2, 4.3, 4.4], dur: 1.0, fromY: 110 },
} as const;

/** a-69 — the scroll cue leaves as the page scrolls; it is the only fixed
 *  element in the hero (`.anim-fixed-wrapper.pointer-events-off`). */

export const HERO_EXIT = [
  { p: 0.0, y: 0 },
  { p: 0.16, y: 15 },
  { p: 0.26, y: 15 },
  { p: 0.4, y: -200 },
] as const;

/** a-21 / a-68 — gallery overlay in and out. */
export const GALLERY = {
  in: { bg: 1.2, cut: { at: 0.3, dur: 1.0 }, popup: { at: 0.4, dur: 1.4 } },
  out: { bg: 1.2, popup: 0.4, cut: { at: 0.7, dur: 1.0 }, gone: 1.0 },
} as const;

/** Scroll-into-view reveals. */
export const REVEAL = {
  item: { dur: 0.6, fromY: "100%", ease: EASE.outQuad },      // a-31
  fade: { dur: 0.5 },                                          // a-32
  heading: { dur: 0.9, fromY: "110%", ease: EASE.inOutCubic }, // a-56
  block: { dur: 0.9, fromY: "100%", ease: EASE.inOutCubic },   // a-5
  line: { dur: 1.2, ease: EASE.inOutCubic },                   // a-58
  list: { dur: 1.3, at: 0.5, fromY: "3%", ease: EASE.inOutCubic }, // a-59
  image: { scale: [1.1, 1.02], dur: 1.8, fade: { at: 0.2, dur: 0.8 } }, // a-2
} as const;
