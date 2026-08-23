/**
 * Stack layout for the infinite vertical carousel in
 * components/sections/project-slider.tsx.
 *
 * Kept out of the component so it can be exercised without a browser or a
 * WebGL context — see slider-loop.check.ts, which is the only thing standing
 * between this arithmetic and a visible seam.
 */

/** Positive modulo. `-0.3 % 5` is -0.3 in JS; this gives 4.7. */
export const wrap = (v: number, r: number) => ((v % r) + r) % r;

export type Stack = {
  /** Centre offset of each slide, measured down the strip from the first. */
  offsets: number[];
  loopLength: number;
  halfLoop: number;
};

/**
 * Walk the heights accumulating centre offsets, then measure the ring.
 *
 * loopLength closes the circle: the run from the first centre to the last,
 * plus the gap, plus the two half-heights that sit either side of it. Dropping
 * the last slide's half-height — an easy form of this formula to write — makes
 * every pass overlap the seam by half a plate.
 */
export function buildStack(heights: number[], gap: number): Stack {
  const offsets: number[] = [];
  let stack = 0;
  heights.forEach((height, i) => {
    if (i > 0) stack += gap + heights[i - 1] / 2 + height / 2;
    offsets.push(stack);
  });
  const loopLength =
    stack + gap + heights[heights.length - 1] / 2 + heights[0] / 2;
  return { offsets, loopLength, halfLoop: loopLength / 2 };
}

/**
 * Where a slide sits this frame: placed relative to the wrapped scroll, then
 * folded back into one loop's worth of space around the centre. This single
 * expression is what makes the strip seamless — nothing is cloned and nothing
 * is repositioned by hand when it runs off an edge.
 */
export function slideY(offset: number, scroll: number, stack: Stack): number {
  const wrapped = wrap(scroll, stack.loopLength);
  return (
    wrap(wrapped - offset + stack.halfLoop, stack.loopLength) - stack.halfLoop
  );
}
