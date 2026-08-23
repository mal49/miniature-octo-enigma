"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { buildStack, slideY } from "@/lib/slider-loop";
import { stageItems } from "@/data/content";

/** Every magic number lives here. */
const config = {
  minHeight: 1,
  maxHeight: 1.5,
  aspectRatio: 1.5,
  gap: 0.05,
  /** Portrait fits a plate to the width, which makes it short: at the desktop
   *  gap the stack renders as plates 7px apart, reading as one filmstrip
   *  rather than separate work. */
  gapPortrait: 0.6,
  smoothing: 0.05,
  distortionStrength: 2.5,
  distortionSmoothing: 0.1,
  momentumFriction: 0.95,
  momentumThreshold: 0.001,
  dragSpeed: 0.01,
  dragMomentum: 0.01,
  /** Viewport heights the pane sticks for. One full pass of the stack. */
  span: 5,
  /** The nav scrolls away with the masthead, so the pane owns the full
   *  viewport rather than clearing a fixed bar. */
  navHeight: 0,
  /** Ground colour. --paper, not pure white: a #fff block between paper
   *  sections reads as a seam rather than as the same page. */
  background: 0xe7e4df,
  /** Camera distance on a landscape viewport. Portrait pulls back — see
   *  resize(). */
  cameraZ: 5,
  /** Breathing room either side of the widest plate, as a multiplier. */
  fit: 1.12,
};

/**
 * Infinite vertical WebGL carousel. The planes bend toward the viewer in
 * proportion to scroll velocity and flatten at rest.
 *
 * Two departures from a standalone build of this, both forced by living inside
 * a scrolling page rather than owning the whole window:
 *
 *   - Page scroll drives it, not a wheel handler. A `wheel` listener that
 *     preventDefault()s would swallow the page: once you reached this section
 *     you could never scroll past it. The pane sticks for `span` screens and
 *     maps that progress onto the loop instead, which also routes it through
 *     Lenis like every other scroll-linked thing on the site.
 *   - No touch drag, for the same reason. On a phone the page scroll IS the
 *     drag gesture, and two handlers on one finger fight each other.
 *
 * Mouse drag is kept: it has no page-scroll meaning, so it can add to the
 * scroll target directly, with its own momentum.
 */
export function ProjectSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      // No WebGL context. The section still renders its caption over the
      // ground colour, and the list below it keeps the work reachable.
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(config.background);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      // `false`: the canvas is sized by CSS, the renderer must not fight it.
      renderer.setSize(w, h, false);
      camera.aspect = w / h;

      // A plate is 1.5x as wide as it is tall, so on a portrait viewport it is
      // wider than the frustum and gets cropped at both edges. Pull the camera
      // back until the widest one fits across. Landscape never triggers this,
      // so desktop keeps its framing exactly.
      const widest = config.maxHeight * config.aspectRatio * config.fit;
      const needed =
        widest / (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
      camera.position.z = Math.max(config.cameraZ, needed);

      camera.updateProjectionMatrix();
    };
    resize();

    // -- Stack layout --
    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];

    const slides = stageItems.map((item) => {
      const height =
        config.minHeight + Math.random() * (config.maxHeight - config.minHeight);
      const geometry = new THREE.PlaneGeometry(
        height * config.aspectRatio,
        height,
        32,
        16
      );
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        // Grey until the texture lands, so nothing flashes white.
        color: 0x999999,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      loader.load(item.image, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        textures.push(texture);
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;
        // Fit the plane to the image rather than stretching the image to the
        // plane: whichever axis is proportionally too long gets scaled back.
        const ratio =
          texture.image.width / texture.image.height / config.aspectRatio;
        if (ratio > 1) mesh.scale.y = 1 / ratio;
        else mesh.scale.x = ratio;
      });

      return {
        item,
        mesh,
        height,
        offset: 0,
        // Distortion is always computed from these, never accumulated onto the
        // live buffer, or the bend would compound frame over frame.
        base: Float32Array.from(geometry.attributes.position.array),
      };
    });

    const stack = buildStack(
      slides.map((s) => s.height),
      canvas.clientHeight > canvas.clientWidth ? config.gapPortrait : config.gap
    );
    slides.forEach((s, i) => (s.offset = stack.offsets[i]));

    const applyDistortion = (
      slide: (typeof slides)[number],
      positionY: number,
      strength: number
    ) => {
      const position = slide.mesh.geometry.attributes.position;
      const base = slide.base;
      for (let i = 0; i < position.count; i++) {
        const x = base[i * 3];
        const y = base[i * 3 + 1];
        const distance = Math.hypot(x, positionY + y);
        const falloff = Math.max(0, 1 - distance / 2);
        position.setZ(
          i,
          Math.pow(Math.sin((falloff * Math.PI) / 2), 1.5) * strength
        );
      }
      position.needsUpdate = true;
      // No computeVertexNormals(): MeshBasicMaterial never reads normals, so
      // recomputing them every frame is work that nothing looks at.
    };

    // -- Input: mouse drag, on top of page scroll --
    let dragOffset = 0;
    let momentum = 0;
    let burst = 0;
    let dragging = false;
    let lastY = 0;
    let lastDelta = 0;

    const onDown = (e: MouseEvent) => {
      dragging = true;
      lastY = e.clientY;
      lastDelta = 0;
      momentum = 0;
      canvas.style.cursor = "grabbing";
      e.preventDefault();
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      const delta = e.clientY - lastY;
      lastY = e.clientY;
      lastDelta = delta;
      dragOffset += -delta * config.dragSpeed;
      burst += Math.abs(delta) * 0.02;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      canvas.style.cursor = "grab";
      if (Math.abs(lastDelta) > 2) {
        momentum = -lastDelta * config.dragMomentum;
        burst += Math.abs(lastDelta) * 0.02;
      }
    };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("resize", resize);

    // -- Loop --
    let scrollPosition = 0;
    let scrollDirection = 1;
    let distortionTarget = 0;
    let distortionAmount = 0;
    let velocityPeak = 0;
    const samples: number[] = [];
    let lastTime = 0;
    let lastActive = -1;
    let raf = 0;

    const progress = () => {
      const travel = section.offsetHeight - window.innerHeight;
      if (travel <= 0) return 0;
      const top = section.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, -top / travel));
    };

    const tick = (time: number) => {
      raf = requestAnimationFrame(tick);
      const deltaTime = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0.016;
      lastTime = time;

      if (momentum !== 0) {
        dragOffset += momentum;
        momentum *= config.momentumFriction;
        if (Math.abs(momentum) < config.momentumThreshold) momentum = 0;
      }

      const scrollTarget = progress() * stack.loopLength + dragOffset;
      const previous = scrollPosition;
      scrollPosition += (scrollTarget - scrollPosition) * config.smoothing;
      const frameDelta = scrollPosition - previous;

      // Ease the sign rather than snapping it, so a reversal reads as the bend
      // rolling back through flat instead of inverting on one frame.
      if (frameDelta !== 0) {
        scrollDirection += ((frameDelta > 0 ? 1 : -1) - scrollDirection) * 0.08;
      }

      samples.push(Math.abs(frameDelta) / deltaTime);
      if (samples.length > 5) samples.shift();
      const velocity = samples.reduce((a, b) => a + b, 0) / samples.length;
      velocityPeak = Math.max(velocityPeak * 0.99, velocity);
      const decelerating = velocity / velocityPeak < 0.7 && velocityPeak > 0.5;

      if (decelerating) distortionTarget *= 0.95;
      else if (velocity > 0.5)
        distortionTarget = Math.max(distortionTarget, Math.min(1, velocity * 0.1));
      else distortionTarget *= 0.855;

      if (burst > 0) {
        distortionTarget = Math.min(1, distortionTarget + burst);
        burst = 0;
      }

      distortionAmount +=
        (distortionTarget - distortionAmount) * config.distortionSmoothing;
      const strength = reduce
        ? 0
        : distortionAmount * scrollDirection * config.distortionStrength;

      let nearest = 0;
      let nearestDistance = Infinity;

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const y = slideY(slide.offset, scrollPosition, stack);
        slide.mesh.position.y = y;
        applyDistortion(slide, y, strength);
        const distance = Math.abs(y);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = i;
        }
      }

      if (nearest !== lastActive) {
        lastActive = nearest;
        setActive(nearest);
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", resize);
      for (const s of slides) {
        s.mesh.geometry.dispose();
        (s.mesh.material as THREE.Material).dispose();
      }
      for (const t of textures) t.dispose();
      renderer.dispose();
    };
  }, []);

  const item = stageItems[active];

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-title"
      style={{ height: `${config.span * 100}vh` }}
      className="relative rule-b"
    >
      <div
        className="sticky select-none overflow-hidden bg-[var(--paper)]"
        style={{
          top: config.navHeight,
          height: `calc(100svh - ${config.navHeight}px)`,
        }}
      >
        {/* Inset on mobile so the plates never travel under the title or the
            caption. On desktop the plate is half the viewport wide and the
            chrome sits in the margins either side of it, so it can go edge to
            edge.

            The inset lives on a wrapper, not the canvas: a canvas is a
            replaced element, so an absolutely positioned one resolves `auto`
            width and height to its intrinsic size and ignores `right`/`bottom`
            entirely — it laid out at the renderer's 1200x600 buffer instead of
            filling the box. Percentages on a normal child have no such rule. */}
        <div className="absolute inset-x-0 top-[72px] bottom-[48px] md:inset-y-0">
          <canvas ref={canvasRef} className="h-full w-full cursor-grab" />
        </div>

        {/* Section title. Inside the sticky pane, not above the section, so it
            stays on screen for the whole scroll — a heading placed in the flow
            would be five screens behind you by the second plate. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] p-[var(--gutter)]">
          <h2 id="work-title" className="t-display-sm">
            Projects
          </h2>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between p-[var(--gutter)] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:px-[2rem]">
          <p>{item.name}</p>
          <p className="tabular-nums">{String(active + 1).padStart(2, "0")}</p>
        </div>
      </div>

      {/* The carousel is a canvas, so the work itself is unreachable without
          this: same projects, same order, real links. */}
      <ul className="sr-only">
        {stageItems.map((s) => (
          <li key={s.index}>
            <a href={s.href}>
              {s.index} {s.name}, {s.featured}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
