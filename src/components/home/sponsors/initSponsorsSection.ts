import { gsap, ensureHomeGsapPlugins, prefersReducedMotion } from "../shared/gsap";

const SECTION_SELECTOR = "[data-sponsors-section]";

function initSponsorsAnimations(section: HTMLElement) {
  const header = section.querySelector(".sponsor-header");
  const sub = section.querySelector(".sponsor-sub");
  const marqueeWrap = section.querySelector(".sponsor-marquee-wrap");
  const bigRing = section.querySelector(".sponsor-bg-el--big-ring");
  const marqueeTrack = section.querySelector("[data-sponsors-marquee-track]");

  if (
    !(header instanceof HTMLElement) ||
    !(sub instanceof HTMLElement) ||
    !(marqueeWrap instanceof HTMLElement) ||
    !(bigRing instanceof HTMLElement) ||
    !(marqueeTrack instanceof HTMLElement)
  ) {
    return;
  }

  ensureHomeGsapPlugins();

  if (prefersReducedMotion()) {
    gsap.set([header, sub, marqueeWrap, bigRing], { opacity: 1, y: 0 });
    gsap.set(marqueeTrack, { x: 0 });
    return;
  }

  gsap.set([header, sub], { opacity: 0, y: 70 });
  gsap.set(marqueeWrap, { opacity: 0, y: 40 });
  gsap.set(bigRing, { opacity: 0 });

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      end: "top 30%",
      toggleActions: "play none none none",
    },
  });

  masterTl
    .to(header, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.out",
    })
    .to(
      sub,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      marqueeWrap,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.3",
    )
    .to(
      bigRing,
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5",
    );

  gsap.to(bigRing, {
    rotation: 360,
    duration: 35,
    repeat: -1,
    ease: "none",
  });

  const totalWidth = marqueeTrack.scrollWidth / 2;
  gsap.to(marqueeTrack, {
    x: -totalWidth,
    duration: 25,
    repeat: -1,
    ease: "none",
    modifiers: {
      x: gsap.utils.unitize((x: number) => x % totalWidth),
    },
  });
}

export function initSponsorsSection() {
  const run = () => {
    const section = document.querySelector(SECTION_SELECTOR);
    if (!(section instanceof HTMLElement) || section.dataset.sponsorsInitialized === "true") return;

    section.dataset.sponsorsInitialized = "true";
    initSponsorsAnimations(section);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
    return;
  }

  run();
}
