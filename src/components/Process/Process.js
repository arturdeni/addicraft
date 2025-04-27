// src/components/Process/Process.js
import "./Process.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function createProcess() {
  const processSection = document.createElement("section");
  processSection.id = "como-lo-hacemos";
  processSection.classList.add("process-section");

  processSection.innerHTML = `
    <div class="process-container">
      <h2 class="section-title">¿Cómo lo hacemos?</h2>
      
      <div class="process-flow">
        <svg class="process-path" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
          <!-- Línea de fondo (gris) -->
          <path class="path-background" d="M 150,150 H 600 H 1050 V 450 H 600 H 150 Z" fill="none" stroke="#333" stroke-width="3" />
          
          <!-- Línea de animación (verde) que se irá revelando -->
          <path class="path-animated" d="M 150,150 H 600 H 1050 V 450 H 600 H 150 Z" fill="none" stroke="#9eff00" stroke-width="3" stroke-dasharray="2000" stroke-dashoffset="2000" />
        </svg>
        
        <div class="process-steps">
          <!-- Paso 1 -->
          <div class="process-step" data-step="1">
            <div class="step-image">
              <img src="/assets/images/process-step1.jpg" alt="Estudio de la pieza">
            </div>
            <p class="step-title">Estudio de la pieza a optimizar</p>
          </div>
          
          <!-- Paso 2 -->
          <div class="process-step" data-step="2">
            <div class="step-image">
              <img src="/assets/images/process-step2.jpg" alt="Aplicación de esfuerzos">
            </div>
            <p class="step-title">Aplicación de los esfuerzo que sufre la pieza</p>
          </div>
          
          <!-- Paso 3 -->
          <div class="process-step" data-step="3">
            <div class="step-image">
              <img src="/assets/images/process-step3.jpg" alt="Realización del análisis">
            </div>
            <p class="step-title">Realización del análisis</p>
          </div>
          
          <!-- Paso 4 -->
          <div class="process-step" data-step="4">
            <div class="step-image">
              <img src="/assets/images/process-step4.jpg" alt="Análisis de resultados">
            </div>
            <p class="step-title">Análisis de resultados</p>
          </div>
          
          <!-- Paso 5 -->
          <div class="process-step" data-step="5">
            <div class="step-image">
              <img src="/assets/images/process-step5.jpg" alt="Rediseño de la pieza">
            </div>
            <p class="step-title">Rediseño de la pieza</p>
          </div>
          
          <!-- Paso 6 -->
          <div class="process-step" data-step="6">
            <div class="step-image">
              <img src="/assets/images/process-step6.jpg" alt="Fabricación">
            </div>
            <p class="step-title">Fabricación</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inicializar las animaciones cuando el elemento esté en el DOM
  setTimeout(() => {
    initProcessAnimations();
  }, 100);

  return processSection;
}

function initProcessAnimations() {
  // Asegurarse de que el elemento esté en el DOM
  const processSection = document.getElementById("como-lo-hacemos");
  if (!processSection) return;

  // Animar la línea de proceso
  gsap.to(".path-animated", {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".process-section",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
    },
  });

  // Animar cada paso del proceso para que aparezcan secuencialmente
  const steps = document.querySelectorAll(".process-step");
  steps.forEach((step, index) => {
    gsap.fromTo(
      step,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".process-section",
          start: `top ${80 - index * 5}%`,
          end: `top ${50 - index * 5}%`,
          scrub: 1,
          // markers: true, // Descomentar para depuración
        },
      }
    );
  });
}

export function initProcess() {
  const mainContainer = document.getElementById("app") || document.body;
  // Buscar el about-us para insertar el proceso después
  const aboutSection = document.querySelector(".about-section");
  if (aboutSection && !document.querySelector(".process-section")) {
    aboutSection.after(createProcess());
  } else if (!document.querySelector(".process-section")) {
    // Si no hay section de about-us, añadirlo al final del contenedor principal
    mainContainer.appendChild(createProcess());
  }
}
