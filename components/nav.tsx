"use client";

import { forwardRef } from "react";
import { navLinks, site } from "@/data/content";

export const Nav = forwardRef<
  HTMLButtonElement,
  { onOpenGallery: () => void }
>(function Nav({ onOpenGallery }, galleryBtnRef) {
  return (
    <header data-nav className="sticky top-0 z-[19] rule-t rule-b bg-[var(--paper)]">
      <nav className="flex items-center justify-between gap-[var(--gutter)] px-[var(--gutter)] py-[7px]">
        <a href="#top" className="t-label hov tap shrink-0">
          {site.handle}
        </a>

        <div className="flex items-center gap-[14px]">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="t-label hov tap"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          ref={galleryBtnRef}
          type="button"
          onClick={onOpenGallery}
          className="t-label tap"
        >
          <span className="swap">
            <span className="swap-a">[Gallery]</span>
            <span className="swap-b" aria-hidden>
              [Gallery]
            </span>
          </span>
        </button>

        <span className="t-label hidden shrink-0 sm:block">
          {site.fullName} &copy; {new Date().getFullYear()}
        </span>
      </nav>
    </header>
  );
});
