"use client";

import { useCallback, useRef, useState } from "react";
import { GalleryOverlay } from "@/components/gallery-overlay";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { StatementBand } from "@/components/sections/statement-band";
import { ProjectGrid } from "@/components/sections/project-grid";
import { Colophon } from "@/components/sections/colophon";

export default function Home() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryBtn = useRef<HTMLButtonElement>(null);

  const openGallery = useCallback(() => setGalleryOpen(true), []);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
    galleryBtn.current?.focus();
  }, []);

  return (
    <>
      <main>
        <Hero
          galleryBtnRef={galleryBtn}
          onOpenGallery={openGallery}
        />
        <About />
        <Services />
        <StatementBand />
        <ProjectGrid />
        <Colophon />
      </main>
      <Footer />
      <GalleryOverlay open={galleryOpen} onClose={closeGallery} />
    </>
  );
}
