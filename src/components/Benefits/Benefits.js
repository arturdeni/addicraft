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
            <img src="/assets/images/benefit-image1.jpg" alt="Pieza optimizada - antes y después">
          </div>
          <div class="benefit-image">
            <img src="/assets/images/benefit-image2.jpg" alt="Diseño optimizado en uso">
          </div>
        </div>
        
        <div class="benefit-metrics">
          ${createMetrics([
            { value: -60, icon: "▼", label: "peso" },
            { value: 30, icon: "🔄", label: "eficiencia" },
            { value: -40, icon: "🌍", label: "huella de carbono" },
          ])}
        </div>
      </div>
    </div>
  `;
}

function createMetrics(metrics) {
  return metrics
    .map(
      ({ value, icon, label }) => `
    <div class="metric" data-value="${value}">
      <span class="metric-icon">${icon}</span>
      <span class="metric-value">${value < 0 ? "-" : "+"}${Math.abs(
        value
      )}% ${label}</span>
    </div>
  `
    )
    .join("");
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

  const metricValue = parseInt(metric.getAttribute("data-value") || "0");
  const isPositive = metricValue > 0;
  const absoluteValue = Math.abs(metricValue);
  const prefix = isPositive ? "+" : "-";

  const metricText = metric.querySelector(".metric-value");
  if (!metricText) return;

  // Extraer partes del texto inicial para separar el número del resto
  const originalText = metricText.textContent || "";
  const textParts = originalText.split("%");
  if (textParts.length < 2) return;

  // La parte después del símbolo "%"
  const labelPart = textParts[1].trim();

  const obj = { value: 0 };
  gsap.to(obj, {
    value: absoluteValue,
    duration: 1.5,
    delay: 0.3 + 0.1 * index,
    ease: "power2.out",
    onUpdate: function () {
      const currentValue = Math.round(obj.value);
      metricText.textContent = `${prefix}${currentValue}% ${labelPart}`;
    },
    scrollTrigger: {
      trigger: ".benefit-metrics",
      start: "top 85%",
    },
  });
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
