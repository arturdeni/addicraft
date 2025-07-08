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
      
      <!-- Desktop Version -->
      <div class="process-flow desktop-only">
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
              <img src="/assets/images/process-step1.png" alt="Pieza original">
            </div>
            <p class="step-title">Pieza original</p>
          </div>
          
          <!-- Paso 2 -->
          <div class="process-step" data-step="2">
            <div class="step-image">
              <img src="/assets/images/process-step2.png" alt="Estudio de fuerzas">
            </div>
            <p class="step-title">Estudio de fuerzas</p>
          </div>
          
          <!-- Paso 3 -->
          <div class="process-step" data-step="3">
            <div class="step-image">
              <img src="/assets/images/process-step3.png" alt="Resultado de la optimización">
            </div>
            <p class="step-title">Resultado de la optimización</p>
          </div>
          
          <!-- Paso 4 -->
          <div class="process-step" data-step="4">
            <div class="step-image">
              <img src="/assets/images/process-step4.png" alt="Validación del diseño">
            </div>
            <p class="step-title">Validación del diseño</p>
          </div>
          
          <!-- Paso 5 -->
          <div class="process-step" data-step="5">
            <div class="step-image">
              <img src="/assets/images/process-step5.png" alt="Diseño final">
            </div>
            <p class="step-title">Diseño final</p>
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

      <!-- Mobile Version -->
      <div class="process-flow-mobile mobile-only">
        <svg class="process-path-mobile" viewBox="0 0 100 1400" preserveAspectRatio="xMidYMid meet">
          <!-- Línea de fondo vertical (gris) -->
          <path class="path-background-mobile" d="M 50,0 V 1400" fill="none" stroke="#333" stroke-width="4" />
          
          <!-- Línea de animación vertical (verde) -->
          <path class="path-animated-mobile" d="M 50,0 V 1400" fill="none" stroke="#CCFF02" stroke-width="4" />
        </svg>
        
        <div class="process-steps-mobile">
          <!-- Paso 1 Mobile -->
          <div class="process-step-mobile" data-step="1">
            <div class="step-number">01</div>
            <div class="step-content">
              <div class="step-image-mobile">
                <img src="/assets/images/process-step1.png" alt="Pieza original">
              </div>
              <p class="step-title-mobile">Pieza original a optimizar</p>
            </div>
          </div>
          
          <!-- Paso 2 Mobile -->
          <div class="process-step-mobile" data-step="2">
            <div class="step-number">02</div>
            <div class="step-content">
              <div class="step-image-mobile">
                <img src="/assets/images/process-step2.png" alt="Estudio de fuerzas">
              </div>
              <p class="step-title-mobile">Estudio de fuerzas</p>
            </div>
          </div>
          
          <!-- Paso 3 Mobile -->
          <div class="process-step-mobile" data-step="3">
            <div class="step-number">03</div>
            <div class="step-content">
              <div class="step-image-mobile">
                <img src="/assets/images/process-step3.png" alt="Resultado de la optimización">
              </div>
              <p class="step-title-mobile">Resultado de la optimización</p>
            </div>
          </div>
          
          <!-- Paso 4 Mobile -->
          <div class="process-step-mobile" data-step="4">
            <div class="step-number">04</div>
            <div class="step-content">
              <div class="step-image-mobile">
                <img src="/assets/images/process-step4.png" alt="Validación del diseño">
              </div>
              <p class="step-title-mobile">Validación del diseño</p>
            </div>
          </div>
          
          <!-- Paso 5 Mobile -->
          <div class="process-step-mobile" data-step="5">
            <div class="step-number">05</div>
            <div class="step-content">
              <div class="step-image-mobile">
                <img src="/assets/images/process-step5.png" alt="Diseño final">
              </div>
              <p class="step-title-mobile">Diseño final</p>
            </div>
          </div>
          
          <!-- Paso 6 Mobile -->
          <div class="process-step-mobile" data-step="6">
            <div class="step-number">06</div>
            <div class="step-content">
              <div class="step-image-mobile">
                <img src="/assets/images/process-step6.png" alt="Fabricación">
              </div>
              <p class="step-title-mobile">Fabricación</p>
            </div>
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

  // Detectar si estamos en mobile
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    initMobileAnimations();
  } else {
    initDesktopAnimations();
  }

  // Listener para cambios de tamaño de ventana
  window.addEventListener("resize", () => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      // Limpiar animaciones existentes
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === processSection ||
          processSection.contains(trigger.trigger)
        ) {
          trigger.kill();
        }
      });

      // Reinicializar animaciones
      setTimeout(() => {
        if (newIsMobile) {
          initMobileAnimations();
        } else {
          initDesktopAnimations();
        }
      }, 100);
    }
  });
}

function initDesktopAnimations() {
  // Configuración específica para el trazo desktop
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

  // Crear una timeline para la animación desktop
  const processTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".process-section",
      start: "top -8%",
      end: "+=1500",
      pin: true,
      pinSpacing: true,
      scrub: 0.7,
    },
  });

  // Animar el trazo para que se dibuje
  processTl.to(".path-animated", {
    strokeDashoffset: 0,
    duration: 0.8,
    ease: "power1.inOut",
  });

  // Coordinar la aparición de los pasos con el avance de la línea
  const steps = document.querySelectorAll(".process-step");
  const stepTriggerPoints = [0.15, 0.5, 0.65, 0.8, 1, 1.3];

  steps.forEach((step, index) => {
    processTl.to(
      step,
      {
        opacity: 1,
        y: 0,
        duration: 0.04,
        ease: "power1.out",
      },
      stepTriggerPoints[index] * 0.5
    );
  });
}

function initMobileAnimations() {
  // Configuración para la línea vertical mobile
  const pathAnimatedMobile = document.querySelector(".path-animated-mobile");
  if (pathAnimatedMobile) {
    const pathLength = pathAnimatedMobile.getTotalLength();

    gsap.set(pathAnimatedMobile, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      strokeLinecap: "round",
    });
  }

  // Configuración inicial para los pasos mobile
  const stepsMobile = document.querySelectorAll(".process-step-mobile");
  gsap.set(stepsMobile, {
    opacity: 1,
    y: 30,
  });

  // Crear ScrollTrigger para la línea mobile (animación más rápida y mejor sincronizada)
  gsap.to(".path-animated-mobile", {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".process-flow-mobile",
      start: "top 80%",
      end: "bottom 20%",
      scrub: 0.5,
    },
  });

  // Animar cada paso mobile individualmente con mejor timing
  stepsMobile.forEach((step, index) => {
    gsap.to(step, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: step,
        start: "top 85%",
        end: "bottom 50%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
