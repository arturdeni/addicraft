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

  // Inicializar animaciones
  requestAnimationFrame(() => {
    if (document.getElementById("beneficios")) {
      initBenefitsAnimations();
    }
  });

  return benefitsSection;
}

function initBenefitsAnimations() {
  if (!gsap || !ScrollTrigger) return;

  animateTitles();
  animateImages();
  animateMetrics();
}

function animateTitles() {
  gsap.from(".benefits-title", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".benefits-section",
      start: "top 70%",
    },
  });
}

function animateImages() {
  gsap.from(".benefit-image", {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".benefit-images",
      start: "top 80%",
    },
  });
}

function animateMetrics() {
  const metrics = document.querySelectorAll(".metric");
  if (!metrics.length) return;

  let countersTriggered = false;

  // Animar aparición de contenedores
  metrics.forEach((metric, index) => {
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
  });

  // Configurar detección de visibilidad para contadores
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !countersTriggered &&
          entry.intersectionRatio >= 0.5
        ) {
          countersTriggered = true;

          metrics.forEach((metric, index) => {
            animateCounter(metric, index);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-10% 0px -10% 0px",
    }
  );

  // Observar números para activar contadores
  document.querySelectorAll(".metric-number").forEach((numberEl) => {
    observer.observe(numberEl);
  });
}

function animateCounter(metric, index) {
  const numberElement = metric.querySelector(".metric-number");
  if (!numberElement) return;

  const targetValue = parseInt(numberElement.getAttribute("data-value") || "0");
  const counterObj = { value: 0 };

  gsap.to(counterObj, {
    value: targetValue,
    duration: 2,
    delay: 0.1 * index,
    ease: "power2.out",
    onUpdate() {
      numberElement.textContent = Math.round(counterObj.value);
    },
    onStart() {
      numberElement.classList.add("counting");
    },
    onComplete() {
      numberElement.textContent = targetValue;
      numberElement.classList.remove("counting");
      numberElement.classList.add("count-complete");

      // Efecto final de "pop"
      gsap.fromTo(
        numberElement,
        { scale: 1 },
        {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        }
      );
    },
  });
}

export function initBenefits() {
  const mainContainer = document.getElementById("app") || document.body;
  const processSection = document.querySelector(".process-section");

  if (!document.querySelector(".benefits-section")) {
    if (processSection) {
      processSection.after(createBenefits());
    } else {
      mainContainer.appendChild(createBenefits());
    }
  }
}
