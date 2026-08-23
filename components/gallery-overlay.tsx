"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { EASE, GALLERY } from "@/lib/motion";
import { galleryItems } from "@/data/content";
import { getLenis } from "@/components/smooth-scroll-provider";

const COUNT = galleryItems.length;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen gallery: a plain uniform grid of every project plate.
 *
 * a-21 (open) / a-68 (close), to the millisecond: the ground fades over 1.2s
 * while the grid rides up from 10% after a 300ms hold, and the chrome fades in
 * last. Closing runs the same three parts in reverse, with the grid leaving
 * 700ms late so the panel is already empty when it drops.
 */
export function GalleryOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // ── Open / close timeline ──
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(panel);

    // Nothing to play for the closed state on first mount.
    if (first.current) {
      first.current = false;
      if (!open) return;
    }

    if (reduce) {
      gsap.set(panel, { display: open ? "flex" : "none", autoAlpha: 1 });
      gsap.set(q("[data-gallery-cut], [data-gallery-chrome]"), {
        autoAlpha: 1,
        yPercent: 0,
      });
      return;
    }

    const tl = gsap.timeline();

    if (open) {
      tl.set(panel, { display: "flex" })
        .fromTo(
          panel,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: GALLERY.in.bg, ease: EASE.inOutQuart },
          0
        )
        .fromTo(
          q("[data-gallery-cut]"),
          { yPercent: 10 },
          { yPercent: 0, duration: GALLERY.in.cut.dur, ease: EASE.inOutCubic },
          GALLERY.in.cut.at
        )
        .fromTo(
          q("[data-gallery-chrome]"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: GALLERY.in.popup.dur, ease: EASE.outQuad },
          GALLERY.in.popup.at
        );
    } else {
      tl.to(panel, { autoAlpha: 0, duration: GALLERY.out.bg, ease: EASE.inOutQuart }, 0)
        .to(
          q("[data-gallery-chrome]"),
          { autoAlpha: 0, duration: GALLERY.out.popup, ease: EASE.outQuad },
          0
        )
        .to(
          q("[data-gallery-cut]"),
          { yPercent: 10, duration: GALLERY.out.cut.dur, ease: EASE.inOutCubic },
          GALLERY.out.cut.at
        )
        .set(panel, { display: "none" }, GALLERY.out.gone);
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  // ── Scroll lock, focus, keyboard ──
  useEffect(() => {
    if (!open) return;

    // Lenis drives window scroll itself, so overflow:hidden alone would not
    // stop it.
    const lenis = getLenis();
    const scrollY = window.scrollY;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;

    const panel = panelRef.current;
    // One tick late: `inert` is still on in the frame the state flips, and an
    // inert subtree cannot take focus.
    const focusTimer = window.setTimeout(
      () => panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus(),
      0
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const firstEl = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      window.scrollTo(0, scrollY);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project gallery"
      aria-hidden={!open}
      inert={!open}
      ref={panelRef}
      // Opaque, not a translucent wash: the page behind this is paper with a
      // full-bleed wordmark, and anything see-through reads as a render bug.
      className="fixed inset-0 z-20 hidden flex-col bg-[#141414] text-[var(--paper)]"
    >
      <div
        data-gallery-chrome
        className="flex shrink-0 items-center justify-between p-[var(--gutter)]"
      >
        <span className="t-label">Gallery:</span>
        <button type="button" onClick={onClose} className="t-label hov tap">
          [Close]
        </button>
      </div>

      <div
        data-gallery-cut
        data-lenis-prevent
        ref={scrollerRef}
        className="flex-1 overflow-y-auto px-[var(--gutter)] pb-[var(--gutter)]"
      >
        <ul className="grid grid-cols-1 gap-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((g) => (
            <li key={g.index}>
              <div className="relative aspect-[3/2] overflow-hidden bg-[#1e1e1e]">
                <Image
                  src={g.image}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  // Eager, not lazy. This panel sits at display:none until it
                  // is opened, and a lazy image inside a hidden container is
                  // never fetched — so the curtain would wipe off onto a grid
                  // of empty boxes that then populate in front of the visitor.
                  // Eager fetches them with the page, so the panel is complete
                  // before it is ever revealed.
                  loading="eager"
                  className="object-cover"
                />
              </div>
              <div className="mt-[7px] flex items-baseline justify-between gap-[7px]">
                <span className="truncate">{g.title}</span>
                <span className="shrink-0 tabular-nums">[{g.index}]</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-[43px] tabular-nums">
          {COUNT} of {COUNT}
        </p>
      </div>
    </div>
  );
}
