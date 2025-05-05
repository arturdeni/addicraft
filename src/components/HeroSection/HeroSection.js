// src/components/HeroSection/HeroSection.js
import "./HeroSection.css";
import { Hero3DModel } from "./Hero3Dmodel.js";

export function createHeroSection() {
  const heroSection = document.createElement("section");
  heroSection.id = "home";
  heroSection.classList.add("hero-section");

  heroSection.innerHTML = `
    <div class="hero-container">
      <div class="hero-content">
        <div class="tagline">
          <p>Del diseño inteligente<br></br>al impacto positivo</p>
        </div>
        <h1 class="hero-title">
          <span class="main-title">AddiCraft</span>
          <span class="subtitle">Engineering</span>
        </h1>
        <p class="hero-description">
          Somos una ingeniería especializada en optimización topológica y fabricación aditiva. Reducimos peso, coste y complejidad en maquinaria industrial.
        </p>
        <div class="hero-buttons">
          <a href="#que-ofrecemos" class="btn btn-primary">Que Ofrecemos</a>
          <a href="#contacto" class="btn btn-secondary">Contacto</a>
        </div>
      </div>
      <div class="hero-image" id="hero3DContainer">
        <!-- 3D model will be inserted here by JavaScript -->
      </div>
    </div>
    <div class="hero-bottom">
      <h2 class="hero-tagline">Reducimos peso, material y coste.<br>Nunca el rendimiento</h2>
    </div>
  `;

  // Scroll suave para los botones de la sección hero
  const buttons = heroSection.querySelectorAll(".btn");
  buttons.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Asumiendo altura del header de 80px
          behavior: "smooth",
        });
      }
    });
  });

  // Initialize 3D model after the component is mounted
  setTimeout(() => {
    const container = document.getElementById("hero3DContainer");
    if (container) {
      // Store the instance for potential cleanup
      heroSection.modelInstance = new Hero3DModel(container);
    }
  }, 100);

  return heroSection;
}

// Inicializar la sección hero
export function initHeroSection() {
  const mainContainer = document.getElementById("app") || document.body;

  // Check if hero section already exists and remove it to avoid duplicates
  const existingHero = document.querySelector(".hero-section");
  if (existingHero) {
    // Clean up previous 3D model if it exists
    if (existingHero.modelInstance) {
      existingHero.modelInstance.dispose();
    }
    existingHero.remove();
  }

  const hero = createHeroSection();

  // Si ya existe el header, inserta el hero después del header
  const header = document.querySelector(".header");
  if (header) {
    header.after(hero);
  } else {
    // Si no hay header, añádelo al principio del contenedor principal
    mainContainer.prepend(hero);
  }

  return hero;
}
