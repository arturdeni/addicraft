// src/components/Services/Services.js
import "./Services.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Datos de los servicios
const servicesData = [
  {
    id: 1,
    title: "Optimización topológica",
    description:
      "Estudio técnico de la pieza y optimización adaptada según sus necesidades.",
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

let currentAnimationInstance = null;

export function createServices() {
  const servicesSection = document.createElement("section");
  servicesSection.id = "que-ofrecemos";
  servicesSection.classList.add("services-section");

  servicesSection.innerHTML = `
    <div class="services-container">
      <h2 class="section-title">Qué ofrecemos</h2>
      
      <div class="services-showcase">
        <!-- Slides de servicios -->
        <div class="services-content">
          ${servicesData
            .map(
              (service, index) => `
            <div class="service-slide" data-service="${index}">
              <div class="service-image-container">
                <img src="${service.image}" alt="${service.title}" class="service-image">
              </div>
              <div class="service-text-container">
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        
        <!-- Indicadores de progreso - solo desktop -->
        <div class="progress-indicators">
          ${servicesData
            .map(
              (_, index) => `
            <div class="progress-dot" data-index="${index}"></div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  // Inicializar animaciones después del DOM
  requestAnimationFrame(() => {
    initServicesAnimations();
  });

  return servicesSection;
}

function initServicesAnimations() {
  // Limpiar animaciones previas si existen
  if (currentAnimationInstance) {
    currentAnimationInstance.kill();
    currentAnimationInstance = null;
  }

  const servicesSection = document.getElementById("que-ofrecemos");
  if (!servicesSection) return;

  // Inicializar animaciones para todos los tamaños de pantalla
  initUnifiedAnimations();

  // Manejar cambios de tamaño de ventana
  const handleResize = gsap.utils.debounce(() => {
    if (currentAnimationInstance) {
      currentAnimationInstance.kill();
    }

    requestAnimationFrame(() => {
      initUnifiedAnimations();
    });
  }, 250);

  window.addEventListener("resize", handleResize);
}

function initUnifiedAnimations() {
  const serviceSlides = document.querySelectorAll(".service-slide");
  const progressDots = document.querySelectorAll(".progress-dot");

  if (!serviceSlides.length) {
    console.warn("Services elements not found");
    return;
  }

  // Reset inicial - ocultar slides
  gsap.set(serviceSlides, {
    y: "100%",
    opacity: 0,
  });

  gsap.set(progressDots, {
    scale: 0.5,
    opacity: 0.3,
  });

  // Timeline principal con pin - MÁS TIEMPO PARA CADA SLIDE
  const masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".services-section",
      start: "top top", // CAMBIADO de "top -15%" a "top 20%" para que el pin empiece más tarde
      end: "+=1800vh", // AUMENTADO para más scroll
      pin: true,
      pinSpacing: true,
      scrub: 1.2, // AUMENTADO de 0.8 a 1.2 para movimiento más lento
      anticipatePin: 1,
      onUpdate: (self) => {
        updateProgressIndicators(self.progress, progressDots);
      },
      onStart: () => {
        console.log("Services animation started");
      },
    },
  });

  // Guardar referencia para cleanup
  currentAnimationInstance = masterTimeline;

  // Secuencia de animación
  buildAnimationSequence(masterTimeline, serviceSlides, progressDots);
}

function buildAnimationSequence(timeline, serviceSlides, progressDots) {
  const totalServices = serviceSlides.length;

  // Fase 1: Mostrar primer servicio (0.0 - 0.3) - MÁS TIEMPO
  timeline
    .to(
      serviceSlides[0],
      {
        y: "0%",
        opacity: 1,
        duration: 0.2, // AUMENTADO de 0.15 a 0.2
        ease: "power2.out",
      },
      0
    )
    .to(
      progressDots[0],
      {
        scale: 1.2,
        opacity: 1,
        duration: 0.1,
      },
      0.1
    );

  // Fase 2: Transiciones entre servicios - MÁS ESPACIADAS
  for (let i = 1; i < totalServices; i++) {
    const startTime = 0.3 + (i - 1) * 0.35; // AUMENTADO de 0.2 + 0.3 a 0.3 + 0.35

    // Salida del servicio anterior
    timeline
      .to(
        serviceSlides[i - 1],
        {
          y: "-100%",
          opacity: 0,
          duration: 0.15, // AUMENTADO de 0.1 a 0.15
          ease: "power2.in",
        },
        startTime
      )
      .to(
        progressDots[i - 1],
        {
          scale: 0.5,
          opacity: 0.7,
          duration: 0.1,
        },
        startTime
      );

    // Entrada del nuevo servicio
    timeline
      .to(
        serviceSlides[i],
        {
          y: "0%",
          opacity: 1,
          duration: 0.2, // AUMENTADO de 0.15 a 0.2
          ease: "power2.out",
        },
        startTime + 0.1
      )
      .to(
        progressDots[i],
        {
          scale: 1.2,
          opacity: 1,
          duration: 0.1,
        },
        startTime + 0.15
      );
  }
}

function updateProgressIndicators(progress, progressDots) {
  const totalServices = servicesData.length;
  const currentIndex = Math.min(
    Math.floor(progress * totalServices),
    totalServices - 1
  );

  progressDots.forEach((dot, index) => {
    if (index === currentIndex) {
      // Servicio activo
      gsap.to(dot, {
        scale: 1.2,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else if (index < currentIndex) {
      // Servicios completados
      gsap.to(dot, {
        scale: 1,
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Servicios pendientes
      gsap.to(dot, {
        scale: 0.5,
        opacity: 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });
}

export function initServices() {
  const mainContainer = document.getElementById("app") || document.body;
  const heroSection = document.querySelector(".hero-section");

  // Remover sección existente si existe
  const existingServices = document.querySelector(".services-section");
  if (existingServices) {
    // Limpiar animaciones antes de remover
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.trigger === existingServices ||
        existingServices.contains(trigger.trigger)
      ) {
        trigger.kill();
      }
    });
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
