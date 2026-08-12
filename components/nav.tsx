"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // `fixed`, not `sticky`: ScrollTrigger pins the hero by wrapping it in a
  // pin-spacer and setting position:fixed, which slides a sticky bar over the
  // hero's own top bar. Fixed sidesteps the pin entirely — the nav just stays
  // hidden until the hero has been scrolled past.
  useIsoLayoutEffect(() => {
    const header = headerRef.current;
    const hero = document.getElementById("hero");
    if (!header || !hero) return;

    const show = gsap.quickTo(header, "yPercent", {
      duration: 0.6,
      ease: "expo.out",
    });

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "bottom 80%",
      onToggle: (self) => {
        show(self.isActive ? 0 : -100);
        gsap.to(header, {
          autoAlpha: self.isActive ? 1 : 0,
          duration: 0.4,
          ease: "expo.out",
        });
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(header);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-40 border-b-2 border-foreground bg-background"
        /* visibility:hidden, not just opacity — an invisible fixed bar would
           still swallow clicks on the hero's own top bar. */
        style={{ transform: "translateY(-100%)", opacity: 0, visibility: "hidden" }}
      >
        <nav className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          {/* Logo — the illustration is white-ground line art, so it keeps a
              light chip rather than being inverted. */}
          <a href="#hero" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 overflow-hidden bg-[#F2F0EB] shrink-0">
              <Image
                src="/me-cartoon-pic.svg"
                alt="Ikhmal"
                width={36}
                height={36}
                className="w-full h-full object-cover scale-110"
                priority
              />
            </div>
            <span className="hidden sm:block text-sm font-black tracking-widest uppercase">
              Ikhmal
            </span>
          </a>

          {/* Desktop links — label slides up, duplicate slides in from below */}
          <div className="hidden md:flex items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative block h-[1.25rem] overflow-hidden px-4 text-sm font-bold leading-[1.25rem]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  {link.label}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-4 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 border-2 border-foreground px-4 py-1.5 text-sm font-bold bg-foreground text-background hover:bg-background hover:text-foreground transition-colors duration-200">
              Let&apos;s Talk
              <ArrowUpRight />
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden border-2 border-foreground p-1.5 hover:bg-foreground hover:text-background transition-colors duration-150"
              aria-label="Open menu">
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
            className="fixed inset-0 z-50 bg-background flex flex-col md:hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 h-16 border-b-2 border-foreground/20 shrink-0">
              <span className="text-foreground text-sm font-black tracking-widest uppercase">
                Ikhmal
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="border-2 border-foreground/30 p-1.5 text-foreground hover:border-foreground transition-colors"
                aria-label="Close menu">
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
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center gap-5 py-5 border-b border-foreground/10 last:border-0">
                  <span className="text-foreground/30 text-xs font-bold tabular-nums w-5 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-4xl font-black text-foreground group-hover:translate-x-2 transition-transform duration-200 inline-block flex-1">
                    {link.label}
                  </span>
                  <ArrowUpRight className="size-5 text-foreground/50 shrink-0" />
                </motion.a>
              ))}
            </nav>

            {/* Footer note */}
            <div className="px-8 pb-10 text-foreground/20 text-[10px] font-bold tracking-widest uppercase">
              Portfolio — {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
