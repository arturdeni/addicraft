// src/main.js
import "./fonts.css";
import "./style.css";
import { createHeader } from "./components/Header/Header.js";
import { createHeroSection } from "./components/HeroSection/HeroSection.js";
import { createServices } from "./components/Services/Services.js";
import { createProcess } from "./components/Process/Process.js";
import { createMaterials } from "./components/Materials/Materials.js";
import { createBenefits } from "./components/Benefits/Benefits.js";
import { createContactForm } from "./components/ContactForm/ContactForm.js";
import { createFooter } from "./components/Footer/Footer.js";
import { initAnimations } from "./utils/animations.js";
import { initSectionTitleAnimations } from "./utils/titleAnimations.js";
import { initSmoothScroll } from "./utils/scrollUtils.js";
import { initIOSScrollOptimization } from "./utils/iosScrollFix.js";
import "./utils/titleAnimations.css";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");

  // Inicializar optimizaciones iOS ANTES que todo lo demás
  initIOSScrollOptimization();

  // Añadir los componentes al DOM
  app.appendChild(createHeader());
  app.appendChild(createHeroSection());
  app.appendChild(createServices());
  app.appendChild(createProcess());
  app.appendChild(createMaterials());
  app.appendChild(createBenefits());
  app.appendChild(createContactForm());
  app.appendChild(createFooter());

  // Inicializar animaciones GSAP con delay para iOS
  setTimeout(() => {
    initAnimations();
    initSectionTitleAnimations();
  }, 100); // Pequeño delay para que iOS se estabilice

  // Inicializar scroll suave unificado para toda la aplicación
  initSmoothScroll();
});
