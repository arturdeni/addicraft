// src/components/Materials/Materials.js
import { createMaterialsCarousel } from "../EmblaCarousel/EmblaCarousel.js";
import "./Materials.css";

// Datos de los materiales actualizados con propiedades
const materialsData = [
  {
    id: 1,
    name: "316L",
    image: "/assets/images/316L.png",
    properties:
      "Excelente resistencia a la corrosión y buena soldabilidad. Ideal para aplicaciones marinas, químicas e intercambiadores de calor.",
  },
  {
    id: 2,
    name: "COPPER",
    image: "/assets/images/copper.png",
    properties:
      "Excelente conductividad térmica y eléctrica. Perfecto para componentes eléctricos, intercambiadores de calor, inductores, conectores.",
  },
  {
    id: 3,
    name: "17-4PH",
    image: "/assets/images/17-4ph.png",
    properties:
      "Alta resistencia mecánica combinada con buena resistencia a la corrosión. Aeroespacial, nuclear y aplicaciones de alta precisión.",
  },
  {
    id: 4,
    name: "INCONEL 625",
    image: "/assets/images/inconel625.png",
    properties:
      "Superaleación resistente a altas temperaturas y ambientes corrosivos. Turbinas de gas, reactores nucleares.",
  },
  {
    id: 5,
    name: "H13 Tool Steel",
    image: "/assets/images/h13-tool-steel.png",
    properties:
      "Dureza excepcional y resistencia al desgaste a altas temperaturas. Moldes de inyección, herramientas de forja.",
  },
  {
    id: 6,
    name: "D2 Tool Steel",
    image: "/assets/images/d2-tool-steel.png",
    properties:
      "Alta dureza y excelente resistencia al desgaste. Punzones, matrices, cuchillas industriales.",
  },
];

export function createMaterials() {
  const materialsSection = document.createElement("section");
  materialsSection.id = "materiales";
  materialsSection.classList.add("materials-section");

  const materialsCarousel = createMaterialsCarousel(materialsData, {
    loop: false, // Sin loop
    align: "center",
    autoplay: false, // Sin autoplay para mejor control
    className: "materials-showcase",
    showDots: false, // Sin dots
    blurSideSlides: true, // Con efecto blur
  });

  materialsSection.innerHTML = `
    <div class="materials-container">
      <h2 class="section-title">Materiales</h2>
      ${materialsCarousel.html}
    </div>
  `;

  // Inicializar el carousel después del DOM
  setTimeout(() => {
    const emblaApi = materialsCarousel.init();

    // Guardar referencia para cleanup posterior si es necesario
    materialsSection._emblaApi = emblaApi;
  }, 100);

  return materialsSection;
}

// Función simplificada para inicializar (compatible con tu main.js)
export function initMaterials() {
  const mainContainer = document.getElementById("app") || document.body;
  const processSection = document.querySelector(".process-section");

  // Remover sección existente si existe
  const existingMaterials = document.querySelector(".materials-section");
  if (existingMaterials) {
    // Cleanup del carousel anterior si existe
    if (existingMaterials._emblaApi) {
      existingMaterials._emblaApi.destroy();
    }
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
