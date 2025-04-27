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

  gsap.from(".hero-description", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.4,
  });

  gsap.from(".hero-buttons", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.6,
  });

  gsap.from(".hero-image", {
    opacity: 0,
    x: 50,
    duration: 1.2,
    delay: 0.3,
  });

  // Animaciones para servicios
  gsap.from(".service-card", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".services-section",
      start: "top 70%",
    },
  });

  // Animaciones para equipo
  gsap.from(".team-member", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 70%",
    },
  });

  gsap.from(".about-mission", {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
      trigger: ".about-mission",
      start: "top 80%",
    },
  });

  // Las animaciones del process-section se manejan en su propio componente
  // para tener mayor control sobre el efecto de la línea de tiempo
}
