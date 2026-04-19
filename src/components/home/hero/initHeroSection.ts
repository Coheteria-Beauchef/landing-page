import { gsap, ensureHomeGsapPlugins, prefersReducedMotion } from "../shared/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTION_SELECTOR = "[data-home-hero]";

function initHeroScroll(section: HTMLElement) {
  const nav = section.querySelector("[data-home-nav]");
  if (!(nav instanceof HTMLElement)) return;

  ensureHomeGsapPlugins();

  if (prefersReducedMotion()) {
    nav.classList.add("is-scrolled");
    nav.style.background = "linear-gradient(180deg, rgba(16,37,185,0.94), rgba(16,37,185,0.9208))";
    nav.style.boxShadow = "0 18px 48px rgba(16,37,185,0.28)";
    nav.style.backdropFilter = "blur(18px)";
    nav.style.setProperty("-webkit-backdrop-filter", "blur(18px)");
    return;
  }

  gsap.set(nav, {
    background: "transparent",
    boxShadow: "none",
  });

  ScrollTrigger.create({
    trigger: section,
    start: "bottom 100",
    end: "bottom -60",
    onUpdate: (self) => {
      const progress = self.progress;
      const eased =
        progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const bgAlpha = eased * 0.94;
      const shadowAlpha = eased * 0.28;
      const blur = eased * 18;

      nav.style.background = `linear-gradient(180deg, rgba(16,37,185,${bgAlpha}), rgba(16,37,185,${bgAlpha * 0.98}))`;
      nav.style.boxShadow = `0 18px 48px rgba(16,37,185,${shadowAlpha})`;
      nav.style.backdropFilter = `blur(${blur}px)`;
      nav.style.setProperty("-webkit-backdrop-filter", `blur(${blur}px)`);
    },
  });
}

function initHamburger(section: HTMLElement) {
  const nav = section.querySelector("[data-home-nav]");
  const btn = nav?.querySelector("[data-hamburger]");
  const menu = nav?.querySelector("[data-mobile-menu]") as HTMLElement | null;
  const bar1 = btn?.querySelector("[data-bar-1]") as HTMLElement | null;
  const bar2 = btn?.querySelector("[data-bar-2]") as HTMLElement | null;
  const bar3 = btn?.querySelector("[data-bar-3]") as HTMLElement | null;
  if (!btn || !menu || !bar1 || !bar2 || !bar3) return;

  let open = false;

  btn.addEventListener("click", () => {
    open = !open;
    btn.setAttribute("aria-expanded", String(open));
    menu.style.maxHeight = open ? `${menu.scrollHeight}px` : "0";
    bar1.style.transform = open ? "translateY(6.5px) rotate(45deg)" : "";
    bar2.style.opacity = open ? "0" : "1";
    bar3.style.transform = open ? "translateY(-6.5px) rotate(-45deg)" : "";
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      open = false;
      btn.setAttribute("aria-expanded", "false");
      menu.style.maxHeight = "0";
      bar1.style.transform = "";
      bar2.style.opacity = "1";
      bar3.style.transform = "";
    });
  });
}

export function initHeroSection() {
  const run = () => {
    const section = document.querySelector(SECTION_SELECTOR);
    if (!(section instanceof HTMLElement) || section.dataset.homeHeroInitialized === "true") return;

    section.dataset.homeHeroInitialized = "true";
    initHeroScroll(section);
    initHamburger(section);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
    return;
  }

  run();
}
