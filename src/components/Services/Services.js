// src/components/Services/Services.js
import "./Services.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function createServices() {
  const servicesSection = document.createElement("section");
  servicesSection.id = "que-ofrecemos";
  servicesSection.classList.add("services-section");

  servicesSection.innerHTML = `
    <div class="services-container">
      <h2 class="section-title">Qué ofrecemos</h2>
      
      <div class="services-showcase">
        <div class="logo-container">
          <img src="/assets/logos/addiCraftLogo.png" alt="AddiCraft Engineering Logo" class="central-logo">
        </div>
        
        <div class="services-items">
          <div class="service-item service-top">
            <div class="service-image">
              <img src="/assets/images/pieza-topologica.jpg" alt="Optimización topológica">
            </div>
            <h3 class="service-title">Optimización topológica</h3>
            <p class="service-description">Estudio técnico de la pieza y optimización adaptada según sus necesidades.</p>
          </div>
          
          <div class="service-item service-right">
            <div class="service-image">
              <img src="/assets/images/pieza-fabricacion.jpg" alt="Fabricación">
            </div>
            <h3 class="service-title">Fabricación</h3>
            <p class="service-description">Impresión 3D de última generación para conseguir el mejor resultado.</p>
          </div>
          
          <div class="service-item service-left">
            <div class="service-image">
              <img src="/assets/images/pieza-diseno.jpg" alt="Diseño">
            </div>
            <h3 class="service-title">Diseño</h3>
            <p class="service-description">Modificamos la pieza según los resultados obtenidos en la optimización.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inicializar las animaciones después de que el elemento esté en el DOM
  setTimeout(() => {
    initServicesAnimations();
  }, 100);

  return servicesSection;
}

function initServicesAnimations() {
  // Asegurarnos de que los elementos existen
  const servicesSection = document.getElementById("que-ofrecemos");
  const logoElement = document.querySelector(".central-logo");
  const serviceItems = document.querySelectorAll(".service-item");

  if (!servicesSection || !logoElement || serviceItems.length === 0) return;

  // Configuración inicial - todos los servicios ocultos en el centro (donde está el logo)
  gsap.set(serviceItems, {
    opacity: 0,
    scale: 0.5,
    x: 0,
    y: 0,
    xPercent: -50,
    yPercent: -50,
    transformOrigin: "center center",
    position: "absolute",
    top: "50%",
    left: "50%",
  });

  // Crear la timeline controlada por scroll - ajustada para empezar antes y ser más rápida
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".services-showcase",
      start: "top 45%",
      end: "top 15%",
      scrub: 0.8,
      // markers: true,
      toggleActions: "play none reverse none",
    },
  });

  // Animación para el elemento superior con rebote
  tl.to(
    ".service-top",
    {
      opacity: 1,
      scale: 1,
      y: -260,
      duration: 0.5,
      ease: "back.out(1.7)", // Añadido efecto de rebote
    },
    0
  );

  // Animación para el elemento derecho con rebote
  tl.to(
    ".service-right",
    {
      opacity: 1,
      scale: 1,
      x: 260,
      y: 150,
      duration: 0.5,
      ease: "back.out(1.7)", // Añadido efecto de rebote
    },
    0
  );

  // Animación para el elemento izquierdo con rebote
  tl.to(
    ".service-left",
    {
      opacity: 1,
      scale: 1,
      x: -260,
      y: 150,
      duration: 0.5,
      ease: "back.out(1.7)", // Añadido efecto de rebote
    },
    0
  );
}

export function initServices() {
  const mainContainer = document.getElementById("app") || document.body;
  // Buscar el hero section para insertar los servicios después
  const heroSection = document.querySelector(".hero-section");
  if (heroSection && !document.querySelector(".services-section")) {
    heroSection.after(createServices());
  } else if (!document.querySelector(".services-section")) {
    // Si no hay hero section, añadirlo al final del contenedor principal
    mainContainer.appendChild(createServices());
  }
}
