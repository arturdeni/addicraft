// src/components/Materials/Materials.js
import "./Materials.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Datos de los materiales
const materialsData = [
  {
    id: 1,
    name: "COPPER",
    image: "/assets/images/copper.png",
  },
  {
    id: 2,
    name: "316L",
    image: "/assets/images/316L.png",
  },
  {
    id: 3,
    name: "17-4PH",
    image: "/assets/images/17-4ph.png",
  },
  {
    id: 4,
    name: "INCONEL 625",
    image: "/assets/images/inconel625.png",
  },
  {
    id: 5,
    name: "H13 Tool Steel",
    image: "/assets/images/h13-tool-steel.png",
  },
  {
    id: 6,
    name: "D2 Tool Steel",
    image: "/assets/images/d2-tool-steel.png",
  },
];

export function createMaterials() {
  const materialsSection = document.createElement("section");
  materialsSection.id = "materiales";
  materialsSection.classList.add("materials-section");

  materialsSection.innerHTML = `
    <div class="materials-container">
      <h2 class="section-title">Materiales</h2>
      
      <div class="materials-grid">
        ${materialsData
          .map(
            (material, index) => `
          <div class="material-item" data-material="${index}">
            <div class="material-circle">
              <img src="${material.image}" alt="${material.name}" class="material-image">
              <div class="material-glow"></div>
            </div>
            <h3 class="material-name">${material.name}</h3>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  // Inicializar animaciones después del DOM
  requestAnimationFrame(() => {
    initMaterialsAnimations();
  });

  return materialsSection;
}

function initMaterialsAnimations() {
  const materialsSection = document.getElementById("materiales");
  if (!materialsSection) return;

  const materialItems = document.querySelectorAll(".material-item");
  const materialCircles = document.querySelectorAll(".material-circle");
  const materialNames = document.querySelectorAll(".material-name");

  // Estado inicial
  gsap.set(materialItems, {
    y: 50,
    opacity: 0,
  });

  gsap.set(materialNames, {
    y: 20,
    opacity: 0,
  });

  // Animación de entrada con ScrollTrigger
  gsap.to(materialItems, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "back.out(1.2)",
    stagger: {
      amount: 0.6,
      grid: [2, 3],
      from: "start",
    },
    scrollTrigger: {
      trigger: ".materials-section",
      start: "25% 70%",
      end: "bottom 30%",
      toggleActions: "play none none reverse",
    },
  });

  // Animación de los nombres con delay
  gsap.to(materialNames, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    stagger: {
      amount: 0.4,
      grid: [2, 3],
      from: "start",
    },
    delay: 0.3,
    scrollTrigger: {
      trigger: ".materials-section",
      start: "top 70%",
      end: "bottom 30%",
      toggleActions: "play none none reverse",
    },
  });

  // Efectos hover para cada círculo
  materialCircles.forEach((circle, index) => {
    const glow = circle.querySelector(".material-glow");

    circle.addEventListener("mouseenter", () => {
      gsap.to(circle, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(glow, {
        opacity: 0.6,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    circle.addEventListener("mouseleave", () => {
      gsap.to(circle, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

export function initMaterials() {
  const mainContainer = document.getElementById("app") || document.body;
  const processSection = document.querySelector(".process-section");

  // Remover sección existente si existe
  const existingMaterials = document.querySelector(".materials-section");
  if (existingMaterials) {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.trigger === existingMaterials ||
        existingMaterials.contains(trigger.trigger)
      ) {
        trigger.kill();
      }
    });
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
