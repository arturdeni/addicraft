// src/components/Benefits/Benefits.js
import "./Benefits.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function createBenefits() {
  const benefitsSection = document.createElement("section");
  benefitsSection.id = "beneficios";
  benefitsSection.classList.add("benefits-section");

  benefitsSection.innerHTML = `
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
          <div class="metric" data-value="-60">
            <span class="metric-icon">▼</span>
            <span class="metric-value">-60 peso</span>
          </div>
          <div class="metric" data-value="30">
            <span class="metric-icon">🔄</span>
            <span class="metric-value">+30 eficiencia</span>
          </div>
          <div class="metric" data-value="-40">
            <span class="metric-icon">🌍</span>
            <span class="metric-value">-40 huella de carbono</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inicializar las animaciones cuando el elemento esté en el DOM
  setTimeout(() => {
    initBenefitsAnimations();
  }, 100);

  return benefitsSection;
}

function initBenefitsAnimations() {
  // Asegurarse de que el elemento esté en el DOM
  const benefitsSection = document.getElementById("beneficios");
  if (!benefitsSection) return;

  // Animar el título de beneficios
  gsap.from(".benefits-title", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".benefits-section",
      start: "top 70%",
    },
  });

  // Animar las imágenes con un ligero retraso entre ellas
  gsap.from(".benefit-image", {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".benefit-images",
      start: "top 80%",
    },
  });

  // Animar las métricas con contador
  const metrics = document.querySelectorAll(".metric");
  metrics.forEach((metric, index) => {
    // Primero, animamos la aparición del contenedor
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

    // Luego, animamos el valor numérico
    const metricValue = metric.getAttribute("data-value");
    const isPositive = metricValue > 0;
    const absoluteValue = Math.abs(parseInt(metricValue));
    const prefix = isPositive ? "+" : "-";

    // Crear una animación de contador para cada métrica
    const metricText = metric.querySelector(".metric-value");
    const originalText = metricText.textContent;
    const numericPart = originalText.match(/[+-]?\d+/)[0];
    const textPart = originalText.replace(numericPart, "");

    gsap.fromTo(
      {},
      { value: 0 },
      {
        value: absoluteValue,
        duration: 1.5,
        delay: 0.3 + 0.1 * index,
        ease: "power2.out",
        onUpdate: function () {
          const currentValue = Math.round(this.targets()[0].value);
          metricText.textContent = `${prefix}${currentValue}% ${textPart.trim()}`;
        },
        scrollTrigger: {
          trigger: ".benefit-metrics",
          start: "top 85%",
        },
      }
    );
  });
}

export function initBenefits() {
  const mainContainer = document.getElementById("app") || document.body;
  // Buscar la sección de proceso para insertar los beneficios después
  const processSection = document.querySelector(".process-section");
  if (processSection && !document.querySelector(".benefits-section")) {
    processSection.after(createBenefits());
  } else if (!document.querySelector(".benefits-section")) {
    // Si no hay section de proceso, añadirlo al final del contenedor principal
    mainContainer.appendChild(createBenefits());
  }
}
