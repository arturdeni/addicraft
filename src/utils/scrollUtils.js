// src/utils/scrollUtils.js
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function smoothScrollTo(targetId) {
  const targetElement = document.querySelector(targetId);
  const header = document.querySelector(".header");

  if (!targetElement) {
    console.warn(`Element with selector ${targetId} not found`);
    return;
  }

  // Calcular la altura del header dinámicamente
  const headerHeight = header ? header.offsetHeight : 80;

  // Para secciones con pin, necesitamos calcular la posición correcta
  let targetPosition;

  if (targetId === "#que-ofrecemos") {
    // Para la sección de servicios que tiene pin, usar ScrollTrigger para obtener la posición correcta
    const servicesSection = document.querySelector(".services-section");
    if (servicesSection) {
      // Buscar el ScrollTrigger asociado a esta sección
      const triggers = ScrollTrigger.getAll();
      const servicesTrigger = triggers.find(
        (trigger) => trigger.trigger === servicesSection
      );

      if (servicesTrigger) {
        // Usar la posición de inicio del trigger
        targetPosition = servicesTrigger.start - headerHeight;
      } else {
        // Fallback si no hay trigger
        targetPosition = servicesSection.offsetTop - headerHeight;
      }
    } else {
      targetPosition = targetElement.offsetTop - headerHeight;
    }
  } else {
    // Para otras secciones, usar el cálculo normal
    targetPosition = targetElement.offsetTop - headerHeight;
  }

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: "smooth",
  });
}

// Función para inicializar todos los enlaces de navegación
export function initSmoothScroll() {
  // Seleccionar todos los enlaces de navegación
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      smoothScrollTo(targetId);
    });
  });
}
