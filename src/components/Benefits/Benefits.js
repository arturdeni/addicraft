// src/components/Benefits/Benefits.js
import "./Benefits.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function createBenefits() {
  const benefitsSection = document.createElement("section");
  benefitsSection.id = "beneficios";
  benefitsSection.classList.add("benefits-section");

  benefitsSection.innerHTML = `
    <div class="benefits-container">
      <div class="benefits-message">
        <h2 class="benefits-title">
          Nuestro enfoque reduce
          consumo energético y emisiones.
          Ingeniería responsable para un
          futuro más limpio.
        </h2>
      </div>
      
      <div class="benefits-showcase">
        <!-- Contenedor de imágenes superpuestas -->
        <div class="benefit-images-container">
          <div class="benefit-image benefit-image-1">
            <img src="/assets/images/benefit-image1.png" alt="Pieza optimizada - antes y después">
          </div>
          <div class="benefit-image benefit-image-2">
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
      
      <!-- 🎯 NUEVO: SOLO el indicador de progreso -->
      <div class="scroll-progress-indicator">
        <div class="progress-circle">
          <svg class="progress-ring" width="60" height="60">
            <circle
              class="progress-ring-background"
              stroke="#333"
              stroke-width="3"
              fill="transparent"
              r="26"
              cx="30"
              cy="30"/>
            <circle
              class="progress-ring-progress"
              stroke="#CCFF02"
              stroke-width="3"
              fill="transparent"
              r="26"
              cx="30"
              cy="30"/>
          </svg>
          <div class="progress-percentage">0%</div>
        </div>
        <div class="progress-text">Sigue scrolleando</div>
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

  // 🎯 EFECTO OVERLAY - SIN CAMBIOS + añadir indicador
  setTimeout(() => {
    initOverlayEffect();
    initProgressIndicator(); // 🎯 NUEVA función separada
  }, 1000); // Delay para evitar conflictos con otros pins
}

// 🎯 FUNCIÓN ORIGINAL SIN CAMBIOS
function initOverlayEffect() {
  const image1 = document.querySelector(".benefit-image-1");
  const image2 = document.querySelector(".benefit-image-2");

  // Configuración inicial de las imágenes
  gsap.set(image1, { opacity: 1 });
  gsap.set(image2, { opacity: 0 });

  // Timeline para la transición de imágenes durante el pin
  const imageTransitionTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".benefits-section",
      start: "bottom bottom",
      end: "+=2250vh",
      pin: true,
      pinSpacing: true,
      scrub: 1,
      id: "benefits-overlay",
      onUpdate: (self) => {
        // Transición de opacidad basada en el progreso del scroll
        const progress = self.progress;

        if (progress < 0.5) {
          // Primera mitad: mostrar imagen 1
          gsap.set(image1, { opacity: 1 - progress * 2 });
          gsap.set(image2, { opacity: progress * 2 });
        } else {
          // Segunda mitad: mostrar imagen 2
          gsap.set(image1, { opacity: 0 });
          gsap.set(image2, { opacity: 1 });
        }
      },
    },
  });
}

// 🎯 NUEVA FUNCIÓN: Solo para el indicador de progreso
function initProgressIndicator() {
  const progressIndicator = document.querySelector(
    ".scroll-progress-indicator"
  );
  const progressRing = document.querySelector(".progress-ring-progress");
  const progressPercentage = document.querySelector(".progress-percentage");
  const progressText = document.querySelector(".progress-text");

  if (!progressIndicator || !progressRing) {
    console.log("Progress indicator elements not found");
    return;
  }

  // Configurar el círculo de progreso
  const circumference = 2 * Math.PI * 26; // r=26
  progressRing.style.strokeDasharray = circumference;
  progressRing.style.strokeDashoffset = circumference;
  progressRing.style.transform = "rotate(-90deg)";
  progressRing.style.transformOrigin = "50% 50%";

  // Textos contextuales según el progreso
  const progressTexts = [
    "Sigue scrolleando",
    "Optimizando estructura...",
    "Aplicando mejoras...",
    "¡Optimización completa!",
  ];

  // 🎯 NUEVO: Variable para controlar cambio de texto
  let currentTextIndex = 0;

  // 🎯 NUEVA FUNCIÓN: Cambio suave de texto
  function updateTextSmooth(newTextIndex) {
    if (newTextIndex !== currentTextIndex) {
      // Desvanecer texto actual
      progressText.classList.add("changing");

      // Después de la transición, cambiar texto y volver a mostrar
      setTimeout(() => {
        progressText.textContent = progressTexts[newTextIndex];
        progressText.classList.remove("changing");
        currentTextIndex = newTextIndex;
      }, 200); // La mitad de la duración de la transición CSS (0.4s)
    }
  }

  // ScrollTrigger independiente
  ScrollTrigger.create({
    trigger: ".benefits-section",
    start: "bottom bottom",
    end: "+=1250vh",
    scrub: true,
    onEnter: () => {
      gsap.to(progressIndicator, { opacity: 1, duration: 0.5 });
    },
    onUpdate: (self) => {
      const progress = self.progress;

      // Actualizar círculo de progreso
      const offset = circumference - progress * circumference;
      progressRing.style.strokeDashoffset = offset;

      // Actualizar porcentaje
      const percentage = Math.round(progress * 100);
      progressPercentage.textContent = `${percentage}%`;

      // 🎯 ARREGLADO: Actualizar texto con transición suave
      let textIndex = Math.floor(progress * (progressTexts.length - 1));
      if (progress >= 0.95) textIndex = progressTexts.length - 1;

      updateTextSmooth(textIndex);

      // Cambiar color del círculo según progreso
      if (progress < 0.3) {
        progressRing.style.stroke = "#CCFF02";
      } else if (progress < 0.7) {
        progressRing.style.stroke = "#FFD700";
      } else {
        progressRing.style.stroke = "#00FF88";
      }
    },
  });

  console.log("Progress indicator ScrollTrigger created");
}

// 🎯 TODAS LAS FUNCIONES SIGUIENTES SIN CAMBIOS
function animateTitles() {
  const benefitsTitleElement = document.querySelector(".benefits-title");
  if (!benefitsTitleElement) return;

  // Aplicar el atributo "animate"
  benefitsTitleElement.setAttribute("animate", "");

  // Inicializar SplitType
  new SplitType(benefitsTitleElement, {
    types: "words",
    tagName: "span",
  });

  // Obtener las palabras
  const words = [...benefitsTitleElement.querySelectorAll(".word")];
  if (!words.length) return;

  // Añadir perspectiva a los elementos padre
  words.forEach((word) => gsap.set(word.parentNode, { perspective: 1000 }));

  // Configurar los estados iniciales de las palabras de manera aleatoria
  // Rangos más pequeños para una animación más sutil
  words.forEach((word) => {
    gsap.set(word, {
      z: gsap.utils.random(200, 600), // Menor profundidad para animación más rápida
      opacity: 0,
      xPercent: gsap.utils.random(-50, 50), // Menor movimiento horizontal
      yPercent: gsap.utils.random(-10, 10), // Menor movimiento vertical
      rotationX: gsap.utils.random(-60, 60), // Menor rotación
    });
  });

  // Crear la animación vinculada al scroll, más rápida
  gsap.to(words, {
    ease: "power1.out", // Easing más suave
    opacity: 1,
    rotationX: 0,
    rotationY: 0,
    xPercent: 0,
    yPercent: 0,
    z: 0,
    stagger: {
      each: 0.03, // Menor tiempo entre palabras
      from: "random", // Animar las palabras en orden aleatorio
    },
    scrollTrigger: {
      trigger: benefitsTitleElement, // Usar el elemento directamente como trigger
      start: "top 90%",
      end: "center 30%",
      scrub: 0.3, // Menor retraso para animación más rápida
      invalidateOnRefresh: true, // Recalcular en caso de cambio de tamaño
    },
  });
}

function animateImages() {
  // Solo animar la primera imagen inicialmente
  gsap.from(".benefit-image-1", {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".benefit-images-container",
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
