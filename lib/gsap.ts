"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Module scope, not inside an effect: child effects run before parent effects,
// so effect-time registration is order-dependent. gsap defers _initCore until
// `document` exists, so importing this on the server is safe.
gsap.registerPlugin(ScrollTrigger, SplitText);

export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger, SplitText };
