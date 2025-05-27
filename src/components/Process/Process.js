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
          <!-- Línea de fondo (gris) - El rectángulo completo -->
          <path class="path-background" d="M 150,150 H 600 H 1050 V 450 H 600 H 150 Z" fill="none" stroke="#333" stroke-width="3" />
          
          <!-- Línea de animación (verde) - Modificada para terminar en la esquina inferior izquierda -->
          <path class="path-animated" d="M 150,150 H 600 H 1050 V 450 H 600 H 150" fill="none" stroke="#CCFF02" stroke-width="3" />
        </svg>
        
        <div class="process-steps">
          <!-- Paso 1 -->
          <div class="process-step" data-step="1">
            <div class="step-image">
              <img src="/assets/images/process-step1.png" alt="Estudio de la pieza">
            </div>
            <p class="step-title">Estudio de la pieza a optimizar</p>
          </div>
          
          <!-- Paso 2 -->
          <div class="process-step" data-step="2">
            <div class="step-image">
              <img src="/assets/images/process-step2.png" alt="Aplicación de esfuerzos">
            </div>
            <p class="step-title">Aplicación de los esfuerzo que sufre la pieza</p>
          </div>
          
          <!-- Paso 3 -->
          <div class="process-step" data-step="3">
            <div class="step-image">
              <img src="/assets/images/process-step3.png" alt="Realización del análisis">
            </div>
            <p class="step-title">Realización del análisis</p>
          </div>
          
          <!-- Paso 4 -->
          <div class="process-step" data-step="4">
            <div class="step-image">
              <img src="/assets/images/process-step4.png" alt="Análisis de resultados">
            </div>
            <p class="step-title">Análisis de resultados</p>
          </div>
          
          <!-- Paso 5 -->
          <div class="process-step" data-step="5">
            <div class="step-image">
              <img src="/assets/images/process-step5.png" alt="Rediseño de la pieza">
            </div>
            <p class="step-title">Rediseño de la pieza</p>
          </div>
          
          <!-- Paso 6 -->
          <div class="process-step" data-step="6">
            <div class="step-image">
              <img src="/assets/images/process-step6.png" alt="Fabricación">
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

  // Configuración específica para el trazo
  const pathAnimated = document.querySelector(".path-animated");
  if (pathAnimated) {
    // Obtener la longitud total del path
    const pathLength = pathAnimated.getTotalLength();

    // Configurar el dasharray y offset
    gsap.set(pathAnimated, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      strokeLinecap: "butt",
    });
  }

  // Crear una timeline para la animación
  // Aumentamos el valor de end para hacer que la sección permanezca fija por más tiempo
  // permitiendo que la línea se dibuje más lentamente
  const processTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".process-section",
      start: "top -14%", // Cambiado para que inicie antes
      end: "+=1500", // Aumentado de 1000 a 1500 para hacer que la animación sea más lenta
      pin: true,
      pinSpacing: true,
      scrub: 0.7, // Aumentado de 0.5 a 0.7 para hacer la animación más suave y lenta
      // markers: true, // Descomentar para depuración
    },
  });

  // Animar el trazo para que se dibuje - aumentamos la duración relativa
  processTl.to(".path-animated", {
    strokeDashoffset: 0,
    duration: 0.8, // Aumentado de 0.5 a 0.8 para ralentizar específicamente la línea verde
    ease: "power1.inOut",
  });

  // Coordinar la aparición de los pasos con el avance de la línea
  const steps = document.querySelectorAll(".process-step");

  // Definir en qué punto de la animación debe aparecer cada paso (valores entre 0 y 1)
  const stepTriggerPoints = [
    0.15, // Paso 1 aparece cuando la línea ha avanzado 15%
    0.5, // Paso 2 aparece cuando la línea ha avanzado 32%
    0.65, // Paso 3
    0.8, // Paso 4
    1, // Paso 5
    1.3, // Paso 6
  ];

  // Animar cada paso según su punto de activación
  steps.forEach((step, index) => {
    processTl.to(
      step,
      {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: "power1.out",
      },
      stepTriggerPoints[index] * 0.5 // Mantener el mismo tiempo relativo para los pasos
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
