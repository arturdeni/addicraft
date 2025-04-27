// src/components/HeroSection/HeroSection.js
import "./HeroSection.css";

export function createHeroSection() {
  const heroSection = document.createElement("section");
  heroSection.id = "home";
  heroSection.classList.add("hero-section");

  heroSection.innerHTML = `
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="main-title">AddiCraft</span>
          <span class="subtitle">Engineering</span>
        </h1>
        <div class="tagline">
          <p>Del diseño inteligente al impacto positivo</p>
        </div>
        <p class="hero-description">
          Somos una ingeniería especializada en optimización topológica y fabricación aditiva. Reducimos peso, coste y complejidad en maquinaria industrial.
        </p>
        <div class="hero-buttons">
          <a href="#que-ofrecemos" class="btn btn-primary">Que Ofrecemos</a>
          <a href="#contacto" class="btn btn-secondary">Contacto</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="/assets/images/cube3D.png" alt="Estructura optimizada topológicamente" class="cube-image">
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

  return heroSection;
}

// Inicializar la sección hero
export function initHeroSection() {
  const mainContainer = document.getElementById("app") || document.body;
  if (!document.querySelector(".hero-section")) {
    // Si ya existe el header, inserta el hero después del header
    const header = document.querySelector(".header");
    if (header) {
      header.after(createHeroSection());
    } else {
      // Si no hay header, añádelo al principio del contenedor principal
      mainContainer.prepend(createHeroSection());
    }
  }
}
