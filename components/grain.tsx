export function Grain() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full opacity-[0.04] mix-blend-overlay"
    >
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  );
}
