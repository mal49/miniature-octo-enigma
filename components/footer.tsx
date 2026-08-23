import { Reveal } from "@/components/reveal";
import { site } from "@/data/content";

export function Footer() {
  return (
    <footer className="bg-[var(--paper)]">
      {/* No min-height: the footer is only as tall as the mark row plus the
          wordmark, so the closing title is the whole of it. */}
      <Reveal
        variant="item"
        className="flex items-end justify-end gap-[var(--gutter)] p-[var(--gutter)]"
      >
        <span>
          {site.fullName} &copy;{new Date().getFullYear()}
        </span>
      </Reveal>

      {/* Closing wordmark. Sized in vw rather than rem so it stays bled to
          both gutters at every width — the point is the line filling the page,
          which a fixed scale only manages at one viewport.

          Deliberately not a Reveal: this is the last element in the document,
          so its top never climbs past the 85%-of-viewport trigger line, and a
          masked reveal here stays hidden forever. */}
      <p className="whitespace-nowrap px-[var(--gutter)] pb-[var(--gutter)] text-[11.4vw] font-medium leading-[0.8] tracking-[-0.04em]">
        {site.fullName}
      </p>
    </footer>
  );
}
