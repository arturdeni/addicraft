// src/components/Services/Services.js
import "./Services.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function createServices() {
  const servicesSection = document.createElement("section");
  servicesSection.id = "que-ofrecemos";
  servicesSection.classList.add("services-section");

  servicesSection.innerHTML = `
    <div class="services-container">
      <h2 class="section-title">Qué ofrecemos</h2>
      
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">
            <img src="/assets/images/service-icon1.svg" alt="Estudio técnico">
          </div>
          <h3 class="service-title">Estudio técnico</h3>
          <p class="service-description">Estudio técnico de la pieza y optimización adaptada según sus necesidades.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <img src="/assets/images/service-icon2.svg" alt="Impresión 3D">
          </div>
          <h3 class="service-title">Impresión 3D</h3>
          <p class="service-description">Impresión 3D de piezas prototipos para comparar el diseño original.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <img src="/assets/images/service-icon3.svg" alt="Diseño">
          </div>
          <h3 class="service-title">Diseño</h3>
          <p class="service-description">Modificamos la pieza según los resultados obtenidos en la optimización.</p>
        </div>
      </div>
      
      <div class="services-benefits">
        <div class="benefit" id="benefit-container">
          <span class="benefit-highlight" id="benefit-text">Ahorro de hasta 70% de material</span>
        </div>
      </div>
    </div>
  `;

  // Inicializar la animación del texto de beneficios después de que el elemento esté en el DOM
  setTimeout(() => {
    initTextAnimation();
  }, 100);

  return servicesSection;
}

// Variable global para controlar la inicialización
let textAnimationInitialized = false;

function initTextAnimation() {
  // Evitar inicializar múltiples veces
  if (textAnimationInitialized) return;

  // Asegurarse de que el elemento esté en el DOM
  const benefitContainer = document.getElementById("benefit-container");
  const benefitText = document.getElementById("benefit-text");

  if (!benefitContainer || !benefitText) {
    console.error("No se encontraron los elementos para la animación");
    return;
  }

  // Textos a mostrar en secuencia
  const benefitTexts = [
    "Ahorro de hasta 70% de material",
    "Producción en menos tiempo",
    "Personalización 100%",
    "Tecnología puntera",
  ];

  let currentIndex = 0;

  // Marcar como inicializado
  textAnimationInitialized = true;

  // Enfoque alternativo: usar elementos diferentes para cada texto
  // y mostrarlos/ocultarlos en lugar de modificar el contenido de texto

  // Crear elementos para cada texto
  const textElements = [];

  // Ocultar el elemento original
  benefitText.style.display = "none";

  // Crear elementos nuevos para cada texto
  benefitTexts.forEach((text, index) => {
    const element = document.createElement("span");
    element.className = "benefit-highlight text-element";
    element.id = `benefit-text-${index}`;
    element.textContent = text;

    // Ocultar todos excepto el primero
    if (index !== 0) {
      element.style.display = "none";
    }

    // Añadir al contenedor y a la lista
    benefitContainer.appendChild(element);
    textElements.push(element);
  });

  // Inicializar SplitType para todos los elementos
  const splitInstances = textElements.map((element) => {
    return new SplitType(`#${element.id}`, {
      types: "words",
      tagName: "span",
    });
  });

  // Comprobar que SplitType ha funcionado en todos los elementos
  const allSplitValid = splitInstances.every((split, index) => {
    if (!split.words || split.words.length === 0) {
      console.error(
        `SplitType falló para el texto ${index}: ${benefitTexts[index]}`
      );
      return false;
    }
    return true;
  });

  if (!allSplitValid) {
    console.error(
      "Al menos un SplitType falló. Mostrando textos sin animación."
    );
    textElements.forEach((element, index) => {
      if (index !== 0) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    });
    return;
  }

  // Configurar las posiciones iniciales para todos excepto el primero
  for (let i = 1; i < textElements.length; i++) {
    gsap.set(`#${textElements[i].id} .word`, {
      y: "100%",
      opacity: 0,
    });
  }

  // Función para cambiar al siguiente texto
  function showNextText() {
    const currentElement = textElements[currentIndex];
    const nextIndex = (currentIndex + 1) % textElements.length;
    const nextElement = textElements[nextIndex];


    // Animación de salida del texto actual
    gsap.to(`#${currentElement.id} .word`, {
      y: "-100%",
      opacity: 0,
      duration: 0.4,
      ease: "power1.in",
      stagger: 0.03,
      onComplete: () => {
        // Ocultar el elemento actual
        currentElement.style.display = "none";

        // Mostrar el siguiente elemento
        nextElement.style.display = "block";

        // Animar entrada del siguiente texto
        gsap.to(`#${nextElement.id} .word`, {
          y: "0%",
          opacity: 1,
          duration: 0.4,
          ease: "power1.out",
          stagger: 0.03,
          onComplete: () => {
            // Actualizar el índice
            currentIndex = nextIndex;

            // Programar el siguiente cambio
            gsap.delayedCall(3, showNextText);
          },
        });
      },
    });
  }

  // Iniciar el ciclo de animación después de un tiempo
  gsap.delayedCall(3, showNextText);
}

export function initServices() {
  const mainContainer = document.getElementById("app") || document.body;
  // Buscar el hero section para insertar los servicios después
  const heroSection = document.querySelector(".hero-section");
  if (heroSection && !document.querySelector(".services-section")) {
    heroSection.after(createServices());
  } else if (!document.querySelector(".services-section")) {
    // Si no hay hero section, añadirlo al final del contenedor principal
    mainContainer.appendChild(createServices());
  }
}
