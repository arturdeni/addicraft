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
