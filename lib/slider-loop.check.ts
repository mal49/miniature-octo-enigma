/**
 * Run: node --experimental-strip-types lib/slider-loop.check.ts
 *
 * Acceptance criterion under test: scrolling forever in either direction never
 * shows a gap or a jump. Every neighbour around the ring must stay exactly
 * `gap` apart at every scroll position, for any mix of slide heights.
 */
import assert from "node:assert/strict";
import { buildStack, slideY, type Stack } from "./slider-loop.ts";

const GAP = 0.05;

/** Edge-to-edge distance between each slide and the next one around the ring. */
function ringGaps(heights: number[], stack: Stack, scroll: number) {
  const placed = heights
    .map((height, i) => ({ height, y: slideY(stack.offsets[i], scroll, stack) }))
    .sort((a, b) => a.y - b.y);

  return placed.map((a, i) => {
    const last = i === placed.length - 1;
    const b = placed[last ? 0 : i + 1];
    const bY = last ? b.y + stack.loopLength : b.y;
    return bY - b.height / 2 - (a.y + a.height / 2);
  });
}

const cases = [
  [1, 1, 1, 1, 1],
  [1.5, 1.5, 1.5, 1.5, 1.5],
  [1.0, 1.31, 1.47, 1.12, 1.5],
  [1.5, 1.0, 1.0, 1.5, 1.0],
  [1.2, 1.2],
];

let checked = 0;
for (const heights of cases) {
  const stack = buildStack(heights, GAP);
  // Sweep three loops either side of zero, in steps far finer than a frame.
  for (let s = -3 * stack.loopLength; s <= 3 * stack.loopLength; s += 0.017) {
    const gaps = ringGaps(heights, stack, s);
    for (const g of gaps) {
      assert.ok(
        Math.abs(g - GAP) < 1e-9,
        `heights=${heights} scroll=${s.toFixed(3)} gap=${g}, expected ${GAP}`
      );
    }
    const total =
      gaps.reduce((a, b) => a + b, 0) + heights.reduce((a, b) => a + b, 0);
    assert.ok(
      Math.abs(total - stack.loopLength) < 1e-9,
      `heights=${heights} ring measures ${total}, loopLength is ${stack.loopLength}`
    );
    checked++;
  }
}

// Guard the reason buildStack looks the way it does: drop the last slide's
// half-height and the seam must actually break, or the extra term is cargo.
{
  const heights = [1.0, 1.31, 1.47, 1.12, 1.5];
  const good = buildStack(heights, GAP);
  const short: Stack = {
    offsets: good.offsets,
    loopLength: good.loopLength - heights[heights.length - 1] / 2,
    halfLoop: (good.loopLength - heights[heights.length - 1] / 2) / 2,
  };
  assert.ok(
    ringGaps(heights, short, 2).some((g) => g < 0),
    "a short loopLength should overlap the seam"
  );
}

console.log(`OK - ${checked} scroll positions, every neighbour exactly ${GAP} apart`);
