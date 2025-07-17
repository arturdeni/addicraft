// src/components/Services/Services.js
import "./Services.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 1,
    title: "Optimización topológica",
    description:
      "Estudio técnico de la pieza y optimización adaptada según las necesidades.",
    image: "/assets/images/pieza-topologica.jpg",
  },
  {
    id: 2,
    title: "Diseño",
    description:
      "Modificamos la pieza según los resultados obtenidos en la optimización.",
    image: "/assets/images/pieza-diseno.jpg",
  },
  {
    id: 3,
    title: "Fabricación",
    description:
      "Impresión 3D de última generación para conseguir el mejor resultado.",
    image: "/assets/images/pieza-fabricacion.jpg",
  },
];

export function createServices() {
  const servicesSection = document.createElement("section");
  servicesSection.id = "que-ofrecemos";
  servicesSection.classList.add("services-section");

  servicesSection.innerHTML = `
    <div class="services-container">
      <h2 class="section-title">Qué ofrecemos</h2>
      
      <div class="services-content">
        <!-- Desktop: imagen + lista -->
        <div class="desktop-layout">
          <div class="services-image">
            <img src="${servicesData[0].image}" alt="${
    servicesData[0].title
  }" class="current-image">
          </div>
          
          <div class="services-list">
            ${servicesData
              .map(
                (service, index) => `
              <div class="service-item ${
                index === 0 ? "active" : ""
              }" data-index="${index}">
                <div class="service-text">
                  <h3 class="service-title">${service.title}</h3>
                  <p class="service-description">${service.description}</p>
                </div>
                <div class="service-icon ${index === 0 ? "active" : ""}">
                  <img src="/assets/logos/addiCraftLogo.png" alt="Logo">
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        
        <!-- Mobile: servicios con imagen pequeña integrada -->
        <div class="mobile-layout">
          ${servicesData
            .map(
              (service, index) => `
            <div class="mobile-service mobile-service-item" data-mobile-index="${index}">
              <div class="mobile-service-image">
                <img src="${service.image}" alt="${service.title}">
              </div>
              <div class="mobile-service-content">
                <h3 class="mobile-service-title">${service.title}</h3>
                <p class="mobile-service-description">${service.description}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  // Inicializar interacciones después del DOM
  setTimeout(() => {
    if (window.innerWidth > 768) {
      initDesktopInteractions();
    } else {
      initMobileAnimations();
    }

    // Listener para cambios de tamaño de ventana
    window.addEventListener("resize", handleResize);
  }, 100);

  return servicesSection;
}

function handleResize() {
  // Limpiar animaciones existentes
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger && trigger.trigger.closest(".services-section")) {
      trigger.kill();
    }
  });

  // Reinicializar según el tamaño de pantalla
  if (window.innerWidth > 768) {
    // Reset mobile styles
    gsap.set(".mobile-service-item", { opacity: 1, y: 0 });
    initDesktopInteractions();
  } else {
    initMobileAnimations();
  }
}

function initMobileAnimations() {
  // Solo ejecutar si estamos en móvil
  if (window.innerWidth > 768) return;

  const mobileServices = document.querySelectorAll(".mobile-service-item");

  if (!mobileServices.length) return;

  // Estado inicial: ocultos y desplazados hacia abajo
  gsap.set(mobileServices, {
    opacity: 0,
    y: 30,
  });

  // Animar cada servicio individualmente con stagger
  mobileServices.forEach((service, index) => {
    gsap.to(service, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: service,
        start: "top 85%",
        end: "bottom 50%",
        toggleActions: "play none none reverse",
        // Pequeño delay basado en el índice para efecto stagger
        delay: index * 0.1,
      },
    });
  });
}

function initDesktopInteractions() {
  const serviceItems = document.querySelectorAll(".service-item");
  const serviceIcons = document.querySelectorAll(".service-icon");
  const currentImage = document.querySelector(".current-image");

  serviceItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      // Activar elemento actual
      serviceItems.forEach((el) => el.classList.remove("active"));
      serviceIcons.forEach((el) => el.classList.remove("active"));

      item.classList.add("active");
      serviceIcons[index].classList.add("active");

      // Cambiar imagen
      changeImage(currentImage, servicesData[index].image);
    });
  });
}

function changeImage(imageElement, newSrc) {
  const container = imageElement.parentElement;

  // Crear nueva imagen
  const newImage = document.createElement("img");
  newImage.src = newSrc;
  newImage.className = "swipe-image";

  container.appendChild(newImage);

  // Animar
  setTimeout(() => newImage.classList.add("active"), 10);

  // Limpiar
  setTimeout(() => {
    imageElement.src = newSrc;
    container.removeChild(newImage);
  }, 500);
}

export function initServices() {
  const mainContainer = document.getElementById("app") || document.body;
  const heroSection = document.querySelector(".hero-section");

  const existingServices = document.querySelector(".services-section");
  if (existingServices) {
    // Limpiar listeners y animaciones anteriores
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger && trigger.trigger.closest(".services-section")) {
        trigger.kill();
      }
    });
    window.removeEventListener("resize", handleResize);
    existingServices.remove();
  }

  const newServices = createServices();

  if (heroSection) {
    heroSection.after(newServices);
  } else {
    mainContainer.appendChild(newServices);
  }

  return newServices;
}
