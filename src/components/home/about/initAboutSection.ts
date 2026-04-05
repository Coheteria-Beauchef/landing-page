import { gsap, ensureHomeGsapPlugins, prefersReducedMotion } from "../shared/gsap";

const SECTION_SELECTOR = "[data-about-section]";

function initAboutAnimations(section: HTMLElement) {
  const title = section.querySelector(".about-title");
  const subtitle = section.querySelector(".about-subtitle");
  const statItems = section.querySelectorAll(".about-stat-item");

  if (
    !(title instanceof HTMLElement) ||
    !(subtitle instanceof HTMLElement) ||
    statItems.length === 0
  ) {
    return;
  }

  ensureHomeGsapPlugins();

  if (prefersReducedMotion()) {
    gsap.set([title, subtitle], { opacity: 1, y: 0 });
    gsap.set(statItems, { opacity: 1, y: 0, scale: 1 });
    return;
  }

  gsap.set([title, subtitle], { opacity: 0 });
  gsap.set(title, { y: 120 });
  gsap.set(subtitle, { y: 60 });
  gsap.set(statItems, { opacity: 0, y: 50, scale: 0.9 });

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      end: "top 15%",
      toggleActions: "play none none none",
    },
  });

  masterTl
    .to(title, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power4.out",
    })
    .to(
      subtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.5",
    )
    .to(
      statItems,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.7)",
      },
      "-=0.3",
    );

  statItems.forEach((item) => {
    const value = item.querySelector(".stat-value");
    const label = item.querySelector(".stat-label");

    if (!(value instanceof HTMLElement) || !(label instanceof HTMLElement)) return;

    item.addEventListener("mouseenter", () => {
      gsap.to(value, { scale: 1.08, duration: 0.3, ease: "power2.out" });
      gsap.to(label, { x: 4, duration: 0.3, ease: "power2.out" });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(value, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(label, { x: 0, duration: 0.3, ease: "power2.out" });
    });
  });
}

export function initAboutSection() {
  const run = () => {
    const section = document.querySelector(SECTION_SELECTOR);
    if (!(section instanceof HTMLElement) || section.dataset.aboutInitialized === "true") return;

    section.dataset.aboutInitialized = "true";
    initAboutAnimations(section);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
    return;
  }

  run();
}
