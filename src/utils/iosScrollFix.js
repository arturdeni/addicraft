// src/utils/iosScrollFix.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Detectar iOS Safari específicamente
function isIOSSafari() {
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const safari = /^((?!chrome|android).)*safari/i.test(ua);
  return iOS && safari;
}

// Detectar si estamos en un dispositivo táctil
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function initIOSScrollOptimization() {
  // Configuración específica para iOS Safari
  if (isIOSSafari()) {
    console.log("Configurando optimizaciones para iOS Safari");

    // 1. Configurar ScrollTrigger para iOS
    ScrollTrigger.config({
      // Reducir la frecuencia de actualización en iOS
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    });

    // 2. Configurar el refresh más conservador
    ScrollTrigger.defaults({
      // Reducir scrub para hacer el scroll más fluido
      scrub: true,
      // Configuración más suave para iOS
      anticipatePin: 0.5,
    });

    // 3. Configurar el scroll del documento para iOS
    gsap.config({
      // Optimizar para dispositivos táctiles
      force3D: "auto",
      nullTargetWarn: false,
    });

    // 4. Mejorar el comportamiento del scroll con inercia
    let scrollTimeout;
    let isScrolling = false;

    // Detectar inicio del scroll
    window.addEventListener(
      "touchstart",
      () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
      },
      { passive: true }
    );

    // Detectar fin del scroll
    window.addEventListener(
      "touchend",
      () => {
        // Dar tiempo para que la inercia termine naturalmente
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          // Refresh suave después de que termine el scroll
          ScrollTrigger.refresh();
        }, 200);
      },
      { passive: true }
    );

    // 5. Optimizar el scroll mientras está en movimiento
    let lastScrollTime = 0;
    window.addEventListener(
      "scroll",
      () => {
        const now = Date.now();
        // Throttle el refresh durante el scroll rápido
        if (now - lastScrollTime > 16 && !isScrolling) {
          // ~60fps
          lastScrollTime = now;
          ScrollTrigger.update();
        }
      },
      { passive: true }
    );

    // 6. Configurar CSS para mejor scroll en iOS
    document.documentElement.style.setProperty(
      "-webkit-overflow-scrolling",
      "touch"
    );
    document.body.style.setProperty("-webkit-overflow-scrolling", "touch");

    // Prevenir el bounce en iOS si es necesario (opcional)
    // document.body.style.setProperty('overscroll-behavior', 'none');
  }

  // Configuración para todos los dispositivos táctiles
  if (isTouchDevice()) {
    // Mejorar la respuesta táctil
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // Configurar refreshes menos agresivos
    let refreshTimeout;
    const debouncedRefresh = () => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("orientationchange", debouncedRefresh);
    window.addEventListener("resize", debouncedRefresh);
  }
}

// Función para optimizar animaciones específicas en iOS
export function createIOSOptimizedTimeline(options = {}) {
  const defaultOptions = {
    // Configuración más suave para iOS
    ease: "none",
    // Reducir scrub para scroll más fluido
    scrub: isIOSSafari() ? 0.5 : 1,
    // Configuración de pin más conservadora
    anticipatePin: isIOSSafari() ? 0.5 : 1,
    ...options,
  };

  return gsap.timeline({
    scrollTrigger: defaultOptions,
  });
}

// Función para configurar ScrollTriggers más amigables con iOS
export function createIOSFriendlyScrollTrigger(element, options = {}) {
  const baseConfig = {
    trigger: element,
    // Configuración más suave para iOS
    start: "top 80%",
    end: "bottom 20%",
    // Reducir scrub en iOS
    scrub: isIOSSafari() ? 0.3 : 0.8,
    // Configuración más conservadora
    anticipatePin: isIOSSafari() ? 0.5 : 1,
    // Mejor invalidación
    invalidateOnRefresh: true,
    refreshPriority: isIOSSafari() ? -1 : 0,
    ...options,
  };

  return ScrollTrigger.create(baseConfig);
}
