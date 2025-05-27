// src/components/Header/Header.js
import "./Header.css";

export function createHeader() {
  // Crear elemento header
  const header = document.createElement("header");
  header.classList.add("header");

  // Crear contenido interno
  header.innerHTML = `
    <div class="container">
      <div class="logo">
        <a href="#home">
          <img src="/assets/logos/addiCraftLogo.png" alt="AddiCraft Engineering Logo">
        </a>
      </div>
      
      <!-- Navegación Desktop -->
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item"><a href="#home" class="nav-link">Home</a></li>
          <li class="nav-item"><a href="#que-ofrecemos" class="nav-link">Qué Ofrecemos</a></li>
          <li class="nav-item"><a href="#quienes-somos" class="nav-link">Quiénes somos</a></li>
          <li class="nav-item"><a href="#contacto" class="nav-link">Contacto</a></li>
        </ul>
      </nav>
      
      <!-- Botón Hamburguesa Mobile -->
      <button class="hamburger-menu" id="hamburger-menu" aria-label="Abrir menú">
        <div class="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
    
    <!-- Modal de Navegación Mobile -->
    <nav class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav-overlay"></div>
      <ul class="mobile-nav-list">
        <li class="mobile-nav-item">
          <a href="#home" class="mobile-nav-link">Home</a>
        </li>
        <li class="mobile-nav-item">
          <a href="#que-ofrecemos" class="mobile-nav-link">Qué Ofrecemos</a>
        </li>
        <li class="mobile-nav-item">
          <a href="#quienes-somos" class="mobile-nav-link">Quiénes somos</a>
        </li>
        <li class="mobile-nav-item">
          <a href="#contacto" class="mobile-nav-link">Contacto</a>
        </li>
      </ul>
    </nav>
  `;

  // Inicializar funcionalidad del menú hamburguesa
  setTimeout(() => {
    initMobileMenu();
  }, 100);

  return header;
}

function initMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburger-menu");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");

  if (!hamburgerBtn || !mobileNav) return;

  let isMenuOpen = false;

  // Función para abrir el menú
  function openMenu() {
    isMenuOpen = true;
    hamburgerBtn.classList.add("active");
    mobileNav.classList.add("active");
    document.body.classList.add("menu-open");
    hamburgerBtn.setAttribute("aria-label", "Cerrar menú");
  }

  // Función para cerrar el menú
  function closeMenu() {
    isMenuOpen = false;
    hamburgerBtn.classList.remove("active");
    mobileNav.classList.remove("active");
    document.body.classList.remove("menu-open");
    hamburgerBtn.setAttribute("aria-label", "Abrir menú");
  }

  // Toggle del menú al hacer click en hamburguesa
  hamburgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerrar menú al hacer click en un link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Cerrar menú al hacer click en el overlay
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", () => {
      closeMenu();
    });
  }

  // Cerrar menú con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });

  // Cerrar menú al cambiar a desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMenu();
    }
  });

  // Prevenir scroll cuando el menú está abierto
  mobileNav.addEventListener(
    "touchmove",
    (e) => {
      if (isMenuOpen) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
}

// Inicializar el header
export function initHeader() {
  const headerContainer =
    document.getElementById("header-container") || document.body;
  if (!document.querySelector(".header")) {
    headerContainer.prepend(createHeader());
  }
}
