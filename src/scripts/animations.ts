import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll Reveal - fade + translateY entrance
export function initScrollReveal() {
  const elements = document.querySelectorAll(".scroll-reveal");
  elements.forEach((el) => {
    const delay = parseFloat((el as HTMLElement).dataset.revealDelay || "0");
    const y = parseFloat((el as HTMLElement).dataset.revealY || "40");

    gsap.set(el, { opacity: 0, y });

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "expo.out",
        });
      },
    });
  });
}

// Staggered Text Reveal - line by line reveal
export function initStaggeredTextReveal() {
  const elements = document.querySelectorAll("[data-str]");
  elements.forEach((el) => {
    const lines = el.querySelectorAll(".str-line");
    if (lines.length === 0) return;

    gsap.set(lines, { y: "110%", opacity: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
        });
      },
    });
  });
}

// Decorative Rule Animation - width tween
export function initRuleAnimations() {
  const rules = document.querySelectorAll("[data-rule]");
  rules.forEach((rule) => {
    gsap.set(rule, { width: 0 });

    ScrollTrigger.create({
      trigger: rule,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(rule, { width: 60, duration: 0.8, ease: "power2.out" });
      },
    });
  });
}

// Card stagger entrance
export function initCardEntrance(selector: string) {
  const containers = document.querySelectorAll(selector);
  containers.forEach((container) => {
    const cards = container.querySelectorAll("[data-card]");
    if (cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 60 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.12,
        });
      },
    });
  });
}
