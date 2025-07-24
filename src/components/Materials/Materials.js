// src/components/Materials/Materials.js
import { createMaterialsCarousel } from "../EmblaCarousel/EmblaCarousel.js";
import "./Materials.css";

const materialsData = [
  {
    id: 1,
    name: "316L",
    image: "/assets/images/316L.png",
    properties: `<span class="property-title">Propiedades:</span> Alta resistencia a la corrosión, buena tenacidad y resistencia mecánica.<br>
    <span class="property-title">Aplicaciones:</span> Industrias alimentaria, automotriz, química, médica y marina.<br>
    <span class="property-title">Ventaja:</span> Ideal para ambientes agresivos donde la resistencia química es esencial.`,
  },
  {
    id: 2,
    name: "COPPER",
    image: "/assets/images/copper.png",
    properties: `<span class="property-title">Propiedades:</span> Excelente conductividad térmica y eléctrica.<br>
    <span class="property-title">Aplicaciones:</span> Componentes eléctricos, intercambiadores de calor, inductores, conectores.<br>
    <span class="property-title">Ventaja:</span> Mucho más fácil de imprimir en 3D con buena precisión, a diferencia de los métodos tradicionales.`,
  },
  {
    id: 3,
    name: "17-4PH",
    image: "/assets/images/17-4ph.png",
    properties: `<span class="property-title">Propiedades:</span> Alta resistencia mecánica y dureza (hasta 36 HRC), buena resistencia a la corrosión.<br>
    <span class="property-title">Aplicaciones:</span> Aeroespacial, herramientas, dispositivos médicos, moldes.<br>
    <span class="property-title">Ventaja:</span> Se puede tratar térmicamente para mejorar aún más su dureza y rendimiento.`,
  },
  {
    id: 4,
    name: "INCONEL 625",
    image: "/assets/images/inconel625.png",
    properties: `<span class="property-title">Propiedades:</span> Aleación de níquel-cromo con gran resistencia a la corrosión y al calor.<br>
    <span class="property-title">Aplicaciones:</span> Aeroespacial, petroquímica, ambientes extremos y marinos.<br>
    <span class="property-title">Ventaja:</span> Mantiene integridad estructural hasta los 600 °C, cumpliendo normas ASTM B443.`,
  },
  {
    id: 5,
    name: "D2 Tool Steel",
    image: "/assets/images/d2-tool-steel.png",
    properties: `<span class="property-title">Propiedades:</span> Alto contenido de carbono y cromo, excelente resistencia al desgaste y compresión.<br>
    <span class="property-title">Aplicaciones:</span> Troqueles, cuchillas, moldes, herramientas de corte.<br>
    <span class="property-title">Ventaja:</span> Puede tratarse térmicamente para alcanzar alta dureza y es ideal para trabajos en frío.`,
  },
  {
    id: 6,
    name: "H13 Tool Steel",
    image: "/assets/images/h13-tool-steel.png",
    properties: `<span class="property-title">Propiedades:</span> Alta dureza (hasta 45 HRC), buena resistencia al calor y a la tracción (UTS: 1680 MPa).<br>
    <span class="property-title">Aplicaciones:</span> Moldes de inyección, herramientas de estampado, piezas de soldadura fuerte.<br>
    <span class="property-title">Ventaja:</span> Excelente retención de propiedades mecánicas a altas temperaturas.`,
  },
];

// 🎯 NUEVA VARIABLE GLOBAL para almacenar la instancia actual
let currentEmblaApi = null;
let currentMaterialsSection = null;

export function createMaterials() {
  const materialsSection = document.createElement("section");
  materialsSection.id = "materiales";
  materialsSection.classList.add("materials-section");

  // 🎯 NUEVO: Guardar referencia de la sección
  currentMaterialsSection = materialsSection;

  const materialsCarousel = createMaterialsCarousel(materialsData, {
    loop: false,
    align: "center",
    autoplay: false,
    className: "materials-showcase",
    showDots: false,
    blurSideSlides: true,
  });

  materialsSection.innerHTML = `
    <div class="materials-container">
      <h2 class="section-title">Materiales</h2>
      ${materialsCarousel.html}
    </div>
  `;

  // 🎯 NUEVO: Inicializar el carousel y configurar listener de resize
  setTimeout(() => {
    initializeCarousel();
    setupResizeListener();
  }, 100);

  return materialsSection;
}

// 🎯 NUEVA FUNCIÓN: Inicializar o reinicializar el carousel
function initializeCarousel() {
  if (!currentMaterialsSection) return;

  // Limpiar instancia anterior si existe
  if (currentEmblaApi) {
    currentEmblaApi.destroy();
    currentEmblaApi = null;
  }

  // Crear nuevo carousel
  const materialsCarousel = createMaterialsCarousel(materialsData, {
    loop: false,
    align: "center",
    autoplay: false,
    className: "materials-showcase",
    showDots: false,
    blurSideSlides: true,
  });

  // Actualizar el HTML del carousel
  const carouselContainer = currentMaterialsSection.querySelector(
    ".materials-container"
  );
  if (carouselContainer) {
    carouselContainer.innerHTML = `
      <h2 class="section-title">Materiales</h2>
      ${materialsCarousel.html}
    `;
  }

  // Inicializar el nuevo carousel
  setTimeout(() => {
    currentEmblaApi = materialsCarousel.init();
  }, 50);
}

// 🎯 NUEVA FUNCIÓN: Configurar listener de resize con debounce
function setupResizeListener() {
  let resizeTimer;

  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Solo reinicializar si realmente cambió el breakpoint
      const wasMobile = !document.querySelector(".spacer-slide");
      const isMobileNow = window.innerWidth <= 768;

      if ((wasMobile && !isMobileNow) || (!wasMobile && isMobileNow)) {
        console.log("Breakpoint changed, reinitializing carousel...");
        initializeCarousel();
      }
    }, 250); // Debounce de 250ms
  };

  // Añadir listener si no existe ya
  if (!window.materialsResizeListener) {
    window.materialsResizeListener = handleResize;
    window.addEventListener("resize", handleResize);
  }
}

// 🎯 NUEVA FUNCIÓN: Limpiar listeners y referencias
function cleanup() {
  if (currentEmblaApi) {
    currentEmblaApi.destroy();
    currentEmblaApi = null;
  }

  if (window.materialsResizeListener) {
    window.removeEventListener("resize", window.materialsResizeListener);
    window.materialsResizeListener = null;
  }

  currentMaterialsSection = null;
}

// Función simplificada para inicializar (compatible con tu main.js)
export function initMaterials() {
  const mainContainer = document.getElementById("app") || document.body;
  const processSection = document.querySelector(".process-section");

  // 🎯 MODIFICADO: Limpiar sección existente con cleanup completo
  const existingMaterials = document.querySelector(".materials-section");
  if (existingMaterials) {
    cleanup(); // Limpiar todo antes de remover
    existingMaterials.remove();
  }

  const newMaterials = createMaterials();

  if (processSection) {
    processSection.after(newMaterials);
  } else {
    mainContainer.appendChild(newMaterials);
  }

  return newMaterials;
}

// 🎯 NUEVA FUNCIÓN: Exportar cleanup para uso externo si es necesario
export function cleanupMaterials() {
  cleanup();
}
