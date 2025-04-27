// utils/animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Animación para el hero section
  gsap.from(".hero-title", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.2,
  });

  // Más animaciones...
}
