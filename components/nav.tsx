"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white border-b-2 border-black transition-shadow duration-300 ${
          scrolled ? "shadow-[4px_4px_0px_0px_black]" : ""
        }`}
      >
        <nav className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 bg-black flex items-center justify-center group-hover:bg-white border-2 border-black transition-colors duration-200">
              <span className="text-white text-sm font-black tracking-tight group-hover:text-black transition-colors duration-200">
                IK
              </span>
            </div>
            <span className="hidden sm:block text-sm font-black tracking-widest uppercase">
              Ikhmal
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-bold overflow-hidden group"
              >
                {/* fill slides up on hover */}
                <span className="absolute inset-0 bg-black -translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-in-out" />
                <span className="relative z-10 text-black group-hover:text-white transition-colors duration-200">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 border-2 border-black px-4 py-1.5 text-sm font-bold bg-black text-white hover:bg-white hover:text-black transition-colors duration-200"
            >
              Let&apos;s Talk
              <span className="text-base leading-none">↗</span>
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden border-2 border-black p-1.5 hover:bg-black hover:text-white transition-colors duration-150"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-black flex flex-col md:hidden"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 h-16 border-b-2 border-white/20 shrink-0">
              <span className="text-white text-sm font-black tracking-widest uppercase">
                Ikhmal
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="border-2 border-white/30 p-1.5 text-white hover:border-white transition-colors"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Numbered links */}
            <nav className="flex-1 flex flex-col justify-center px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-5 py-5 border-b border-white/10 last:border-0"
                >
                  <span className="text-white/30 text-xs font-bold tabular-nums w-5 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-4xl font-black text-white group-hover:translate-x-2 transition-transform duration-200 inline-block">
                    {link.label}
                  </span>
                  <span className="ml-auto text-white/30 group-hover:text-white transition-colors text-xl shrink-0">
                    ↗
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Footer note */}
            <div className="px-8 pb-10 text-white/20 text-[10px] font-bold tracking-widest uppercase">
              Portfolio — {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
