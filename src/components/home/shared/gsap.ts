import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

export { gsap };

export function ensureHomeGsapPlugins() {
  if (pluginsRegistered) return;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  pluginsRegistered = true;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
