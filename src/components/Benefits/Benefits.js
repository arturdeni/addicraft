// src/components/Benefits/Benefits.js
import "./Benefits.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Constantes para reutilización
const ANIMATION_DEFAULTS = {
  duration: 0.8,
  ease: "power2.out",
};

export function createBenefits() {
  const benefitsSection = document.createElement("section");
  benefitsSection.id = "beneficios";
  benefitsSection.classList.add("benefits-section");

  benefitsSection.innerHTML = createBenefitsHTML();

  // Usar requestAnimationFrame en lugar de setTimeout para mejor rendimiento
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    requestAnimationFrame(() => {
      if (document.getElementById("beneficios")) {
        initBenefitsAnimations();
      }
    });
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.getElementById("beneficios")) {
        initBenefitsAnimations();
      }
    });
  }

  return benefitsSection;
}

function createBenefitsHTML() {
  return `
    <div class="benefits-container">
      <div class="benefits-message">
        <h2 class="benefits-title">
          Nuestro enfoque reduce<br>
          consumo energético y emisiones.<br>
          Ingeniería responsable para un<br>
          futuro más limpio.
        </h2>
      </div>
      
      <div class="benefits-showcase">
        <div class="benefit-images">
          <div class="benefit-image">
            <img src="/assets/images/benefit-image1.png" alt="Pieza optimizada - antes y después">
          </div>
          <div class="benefit-image">
            <img src="/assets/images/benefit-image2.png" alt="Diseño optimizado en uso">
          </div>
        </div>
        
        <div class="benefit-metrics">
          <div class="metric">
            <img src="/assets/icons/icono-peso.png" alt="Reducción de peso" class="metric-icon">
            <div class="metric-content">
              <span class="metric-sign">-</span>
              <span class="metric-number" data-value="60">0</span>
              <span class="metric-percent">%</span>
              <span class="metric-label">peso</span>
            </div>
          </div>
          
          <div class="metric">
            <img src="/assets/icons/icono-eficiencia.png" alt="Mejora de eficiencia" class="metric-icon">
            <div class="metric-content">
              <span class="metric-sign">+</span>
              <span class="metric-number" data-value="30">0</span>
              <span class="metric-percent">%</span>
              <span class="metric-label">eficiencia</span>
            </div>
          </div>
          
          <div class="metric">
            <img src="/assets/icons/icono-huella.png" alt="Reducción huella de carbono" class="metric-icon">
            <div class="metric-content">
              <span class="metric-sign">-</span>
              <span class="metric-number" data-value="40">0</span>
              <span class="metric-percent">%</span>
              <span class="metric-label">huella de carbono</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initBenefitsAnimations() {
  // Verificamos que GSAP y ScrollTrigger estén correctamente registrados
  if (!gsap || !ScrollTrigger) {
    console.error("GSAP o ScrollTrigger no están disponibles");
    return;
  }

  animateTitles();
  animateImages();
  animateMetrics();
}

function animateTitles() {
  gsap.from(".benefits-title", {
    ...ANIMATION_DEFAULTS,
    opacity: 0,
    y: 30,
    scrollTrigger: {
      trigger: ".benefits-section",
      start: "top 70%",
    },
  });
}

function animateImages() {
  gsap.from(".benefit-image", {
    ...ANIMATION_DEFAULTS,
    opacity: 0,
    scale: 0.9,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".benefit-images",
      start: "top 80%",
    },
  });
}

function animateMetrics() {
  const metrics = document.querySelectorAll(".metric");

  if (!metrics.length) {
    console.warn("No se encontraron elementos .metric");
    return;
  }

  metrics.forEach((metric, index) => {
    // Animar la aparición del contenedor
    gsap.from(metric, {
      opacity: 0,
      x: -20,
      duration: 0.5,
      delay: 0.1 * index,
      scrollTrigger: {
        trigger: ".benefit-metrics",
        start: "top 85%",
      },
    });

    animateMetricCounter(metric, index);
  });
}

function animateMetricCounter(metric, index) {
  if (!metric) return;

  const numberElement = metric.querySelector(".metric-number");
  if (!numberElement) return;

  const targetValue = parseInt(numberElement.getAttribute("data-value") || "0");

  gsap.fromTo(
    numberElement,
    { innerText: 0 },
    {
      innerText: targetValue,
      duration: 1.5,
      delay: 0.3 + 0.1 * index,
      ease: "power2.out",
      snap: { innerText: 1 }, // Asegura que los valores sean enteros
      scrollTrigger: {
        trigger: ".benefit-metrics",
        start: "top 85%",
      },
    }
  );
}

export function initBenefits() {
  const mainContainer = document.getElementById("app") || document.body;
  const processSection = document.querySelector(".process-section");
  const benefitsExists = document.querySelector(".benefits-section");

  if (!benefitsExists) {
    if (processSection) {
      processSection.after(createBenefits());
    } else {
      mainContainer.appendChild(createBenefits());
    }
  }
}
