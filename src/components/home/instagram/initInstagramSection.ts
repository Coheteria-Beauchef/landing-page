import { gsap, ensureHomeGsapPlugins, prefersReducedMotion } from "../shared/gsap";

const SECTION_SELECTOR = "[data-instagram-section]";

function initInstagramAnimations(section: HTMLElement) {
  const header = section.querySelector(".ig-header");
  const handleWrap = section.querySelector(".ig-handle-wrap");
  const cards = section.querySelectorAll(".ig-card-wrap");
  const cornerBlock = section.querySelector(".ig-bg-el--corner-block");

  if (
    !(header instanceof HTMLElement) ||
    !(handleWrap instanceof HTMLElement) ||
    cards.length === 0 ||
    !(cornerBlock instanceof HTMLElement)
  ) {
    return;
  }

  ensureHomeGsapPlugins();

  if (prefersReducedMotion()) {
    gsap.set([header, handleWrap, cards, cornerBlock], { opacity: 1, y: 0 });
    return;
  }

  gsap.set([header, handleWrap], { opacity: 0, y: 80 });
  gsap.set(cards, { opacity: 0 });
  gsap.set(cornerBlock, { opacity: 0 });

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      end: "top 20%",
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
      handleWrap,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      cards,
      {
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      },
      "-=0.3",
    )
    .to(
      cornerBlock,
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.6",
    );

  gsap.to(cornerBlock, {
    rotation: "+=30",
    scale: 1.05,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(cards, {
    y: (i) => -20 + i * 8,
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    ease: "none",
  });

  cards.forEach((card) => {
    const inner = card.querySelector("a") || card.firstElementChild;
    if (!(inner instanceof HTMLElement)) return;

    card.addEventListener("mouseenter", () => {
      gsap.to(inner, {
        y: -8,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(inner, {
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    });
  });
}

export function initInstagramSection() {
  const run = () => {
    const section = document.querySelector(SECTION_SELECTOR);
    if (!(section instanceof HTMLElement) || section.dataset.instagramInitialized === "true")
      return;

    section.dataset.instagramInitialized = "true";
    initInstagramAnimations(section);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
    return;
  }

  run();
}
