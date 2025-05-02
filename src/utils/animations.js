// utils/animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // --- HERO SECTION ANIMATIONS ---
  gsap.from(".hero-title", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.2,
  });

  gsap.from(".tagline", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.6,
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

  // Animación de hero-tagline con SplitType
  initHeroTaglineAnimation();

  // --- SERVICIOS ANIMATIONS ---
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

  // --- EQUIPO ANIMATIONS ---
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
}

// Función separada para la animación del tagline
function initHeroTaglineAnimation() {
  const heroTaglineElement = document.querySelector(".hero-tagline");
  if (!heroTaglineElement) return;

  // Aplicar el atributo "animate"
  heroTaglineElement.setAttribute("animate", "");

  // Inicializar SplitType (sin guardar la referencia ya que no la usamos)
  new SplitType("[animate]", {
    types: "lines, words, chars",
    tagName: "span",
  });

  // Primero ocultar todas las palabras con un set inicial
  gsap.set("[animate] .word", {
    y: "110%",
    opacity: 0,
    rotationZ: "10",
    visibility: "hidden",
  });

  // Aplicar la animación con GSAP
  gsap.to("[animate] .word", {
    y: "0%",
    opacity: 1,
    rotationZ: "0",
    visibility: "visible",
    duration: 0.5,
    ease: "power1.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "[animate]",
      start: "top 70%",
    },
  });
}
