import { gsap, ensureHomeGsapPlugins, prefersReducedMotion } from "../shared/gsap";
import { buildFlightPath } from "./buildFlightPath";

const SECTION_SELECTOR = "[data-cta-section]";

function initCtaAnimation(section: HTMLElement) {
  if (section.dataset.ctaAnimated === "true") return;

  const svg = section.querySelector("[data-cta-flight]");
  const path = section.querySelector("[data-cta-path]");
  const rocket = section.querySelector("[data-cta-rocket]");
  const impact = section.querySelector("[data-cta-impact]");
  const impactRing = section.querySelector("[data-cta-impact-ring]");
  const sparks = section.querySelectorAll("[data-cta-sparks] path");
  const buttonWrap = section.querySelector("[data-cta-button-wrap]");
  const button = buttonWrap?.querySelector("a");

  if (
    !(svg instanceof SVGSVGElement) ||
    !(path instanceof SVGPathElement) ||
    !(rocket instanceof SVGGElement) ||
    !(impact instanceof SVGGElement) ||
    !(impactRing instanceof SVGCircleElement) ||
    !(buttonWrap instanceof HTMLElement) ||
    !(button instanceof HTMLElement)
  ) {
    return;
  }

  ensureHomeGsapPlugins();

  if (prefersReducedMotion()) {
    section.dataset.ctaAnimated = "true";
    return;
  }

  const buttonSpan = button.querySelector("[data-action-label]");
  const buttonSvg = button.querySelector("[data-action-icon]");

  if (!(buttonSpan instanceof HTMLElement) || !(buttonSvg instanceof SVGElement)) {
    return;
  }

  const sectionRect = section.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  const width = Math.max(sectionRect.width, 320);
  const height = Math.max(sectionRect.height, 320);

  const rocketScale = width < 640 ? 0.58 : 0.72;
  const rocketTipOffset = 28 * rocketScale;

  const impactX = buttonRect.left - sectionRect.left - rocketTipOffset + 20;
  const impactY = buttonRect.top - sectionRect.top + buttonRect.height * 0.25;

  const pathData = buildFlightPath(width, height, impactX, impactY);

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  path.setAttribute("d", pathData);
  impact.setAttribute("transform", `translate(${impactX + rocketTipOffset} ${impactY})`);

  const trailLength = path.getTotalLength();
  const ringCircumference = 2 * Math.PI * Number(impactRing.getAttribute("r") ?? "18");

  gsap.set(path, {
    strokeDasharray: `${trailLength * 0.26} ${trailLength * 0.74}`,
    strokeDashoffset: trailLength * 0.88,
    opacity: 0,
  });
  gsap.set(rocket, {
    xPercent: -50,
    yPercent: -50,
    scale: rocketScale,
    transformOrigin: "50% 50%",
    opacity: 1,
  });
  gsap.set(impact, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
  gsap.set(impactRing, {
    strokeDasharray: ringCircumference,
    strokeDashoffset: ringCircumference,
    opacity: 0.8,
    transformOrigin: "50% 50%",
  });
  gsap.set(sparks, {
    opacity: 0,
    scale: 0.35,
    transformOrigin: "50% 50%",
  });
  gsap.set(buttonWrap, { "--cta-hit-glow": 0 });

  const timeline = gsap.timeline({
    defaults: { ease: "power2.out" },
    onComplete: () => {
      section.dataset.ctaAnimated = "true";
    },
  });

  timeline
    .to(path, {
      opacity: 0.42,
      duration: 0.22,
    })
    .to(
      path,
      {
        strokeDashoffset: 0,
        duration: 4.5,
        ease: "power1.inOut",
      },
      0,
    )
    .to(
      rocket,
      {
        duration: 4.5,
        ease: "power1.inOut",
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
        },
      },
      0,
    )
    .to(
      button,
      {
        scale: 1.035,
        backgroundColor: "#ffffff",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.2), 0 0 28px rgba(255,255,255,0.42), 0 16px 42px rgba(255,255,255,0.22)",
        duration: 0.28,
        ease: "power2.out",
      },
      4.45,
    )
    .to(
      [buttonSpan, buttonSvg],
      {
        color: "#1025B9",
        duration: 0.28,
        ease: "power2.out",
      },
      4.45,
    )
    .fromTo(
      buttonWrap,
      {
        "--cta-hit-glow": 0,
      },
      {
        "--cta-hit-glow": 1,
        duration: 0.28,
        ease: "power2.out",
      },
      4.45,
    )
    .to(
      impact,
      {
        opacity: 1,
        scale: 1,
        duration: 0.08,
        ease: "power3.out",
      },
      4.45,
    )
    .to(
      impactRing,
      {
        strokeDashoffset: 0,
        scale: 1.9,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      4.45,
    )
    .to(
      sparks,
      {
        opacity: 1,
        scale: 1,
        duration: 0.12,
        stagger: 0.015,
      },
      4.45,
    )
    .to(
      sparks,
      {
        opacity: 0,
        scale: 1.5,
        duration: 0.36,
        stagger: 0.018,
        ease: "power2.in",
      },
      4.57,
    )
    .to(
      rocket,
      {
        opacity: 0,
        scale: "+=0.06",
        duration: 0.1,
        ease: "power1.out",
      },
      4.48,
    )
    .to(
      path,
      {
        opacity: 0.16,
        duration: 0.45,
        ease: "power1.out",
      },
      4.5,
    );
}

function setupCtaObserver() {
  const sections = document.querySelectorAll(SECTION_SELECTOR);

  sections.forEach((section) => {
    if (!(section instanceof HTMLElement) || section.dataset.ctaObserverAttached === "true") return;

    section.dataset.ctaObserverAttached = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          initCtaAnimation(section);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(section);
  });
}

export function initCtaSection() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupCtaObserver, { once: true });
    return;
  }

  setupCtaObserver();
}
