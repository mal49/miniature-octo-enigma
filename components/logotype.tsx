/**
 * The wordmark, set in the page's own typeface.
 *
 * This used to be hand-built SVG geometry — rectangles and polygons drawn to
 * approximate the letters, stretched with preserveAspectRatio="none". At any
 * real size it read as blocky slabs rather than type: the K was two
 * parallelograms, the O a rectangular ring, and the strokes changed weight
 * with the viewport. Actual glyphs cost less code and hold their proportions.
 *
 * Sized purely in vw so it always reaches both edges. There is deliberately no
 * vh cap: any cap below the full-bleed size leaves dead space at the right on
 * a wide, short window, which is the one thing this mark must never do. On a
 * very short window the hero simply grows past one screen instead.
 */
export function Logotype() {
  return (
    <span className="block whitespace-nowrap text-[40vw] font-extrabold leading-[0.72] tracking-[-0.055em] text-[var(--ink)]">
      NEKO
    </span>
  );
}
