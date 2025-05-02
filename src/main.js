import "./fonts.css";
import "./style.css";
import { createHeader } from "./components/Header/Header.js";
import { createHeroSection } from "./components/HeroSection/HeroSection.js";
import { createServices } from "./components/Services/Services.js";
import { createProcess } from "./components/Process/Process.js";
import { createAboutUs } from "./components/AboutUs/AboutUs.js";
import { createBenefits } from "./components/Benefits/Benefits.js";
import { createContactForm } from "./components/ContactForm/ContactForm.js";
import { createFooter } from "./components/Footer/Footer.js";
import { initAnimations } from "./utils/animations.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");

  // Añadir los componentes al DOM
  app.appendChild(createHeader());
  app.appendChild(createHeroSection());
  app.appendChild(createServices());
  app.appendChild(createAboutUs());
  app.appendChild(createProcess());
  app.appendChild(createBenefits());
  app.appendChild(createContactForm());
  app.appendChild(createFooter());

  // Inicializar animaciones GSAP
  initAnimations();
});
