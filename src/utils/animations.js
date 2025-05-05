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

  // Inicializar SplitType
  new SplitType("[animate]", {
    types: "words",
    tagName: "span",
  });

  // Obtener las palabras
  const words = [...heroTaglineElement.querySelectorAll(".word")];
  if (!words.length) return;

  // Añadir perspectiva a los elementos padre
  words.forEach((word) => gsap.set(word.parentNode, { perspective: 1000 }));

  // Configurar los estados iniciales de las palabras de manera aleatoria
  // Rangos más pequeños para una animación más sutil
  words.forEach((word) => {
    gsap.set(word, {
      z: gsap.utils.random(200, 600), // Menor profundidad para animación más rápida
      opacity: 0,
      xPercent: gsap.utils.random(-50, 50), // Menor movimiento horizontal
      yPercent: gsap.utils.random(-10, 10), // Menor movimiento vertical
      rotationX: gsap.utils.random(-60, 60), // Menor rotación
    });
  });

  // Crear la animación vinculada al scroll, más rápida
  gsap.to(words, {
    ease: "power1.out", // Easing más suave
    opacity: 1,
    rotationX: 0,
    rotationY: 0,
    xPercent: 0,
    yPercent: 0,
    z: 0,
    stagger: {
      each: 0.03, // Menor tiempo entre palabras
      from: "random", // Animar las palabras en orden aleatorio
    },
    scrollTrigger: {
      trigger: heroTaglineElement, // Usar el elemento directamente como trigger
      start: "top 85%", // Comienza antes en el viewport
      end: "top 55%", // Termina rápidamente (sólo 30% de scroll necesario)
      scrub: 0.3, // Menor retraso para animación más rápida
      invalidateOnRefresh: true, // Recalcular en caso de cambio de tamaño
      markers: false, // Para depuración
    },
  });
}
