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
      <div class="mobile-nav-content">
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
        
        <!-- Información de contacto en menú móvil -->
        <div class="mobile-contact-info">
          <a href="mailto:info@addicrafteng.com" class="mobile-contact-email">info@addicrafteng.com</a>
          
          <div class="mobile-social-links">
            <a href="https://www.instagram.com/addicrafteng" target="_blank" class="mobile-social-link instagram">
              <span class="mobile-social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                </svg>
              </span>
            </a>
            
            <a href="https://www.tiktok.com/@addicrafteng" target="_blank" class="mobile-social-link tiktok">
              <span class="mobile-social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="currentColor"/>
                </svg>
              </span>
            </a>
            
            <a href="https://www.linkedin.com/company/addicrafteng" target="_blank" class="mobile-social-link linkedin">
              <span class="mobile-social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="currentColor"/>
                </svg>
              </span>
            </a>
            
            <a href="https://wa.me/34123456789" target="_blank" class="mobile-social-link whatsapp">
              <span class="mobile-social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.301-.767.966-.94 1.164-.173.199-.347.223-.646.075-.3-.15-1.267-.465-2.411-1.485-.893-.795-1.494-1.781-1.67-2.081-.173-.3-.018-.465.13-.615.134-.135.301-.345.452-.523.151-.177.2-.301.3-.502.099-.2.05-.375-.025-.524-.075-.149-.672-1.625-.922-2.225-.24-.6-.487-.51-.672-.51-.172 0-.371-.011-.571-.011-.2 0-.522.074-.797.375-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.209 2.096 3.195 5.076 4.483.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.571-.347m-5.498 7.5h-.004a9.545 9.545 0 01-4.852-1.322l-.348-.207-3.61.945.964-3.52-.227-.36a9.507 9.507 0 01-1.458-5.077c.001-5.233 4.267-9.5 9.504-9.5 2.535.001 4.922.986 6.711 2.775s2.774 4.174 2.772 6.71c-.001 5.232-4.267 9.5-9.501 9.5m8.098-17.596c-2.174-2.174-5.055-3.374-8.098-3.374-6.304 0-11.43 5.126-11.43 11.43 0 2.015.526 3.979 1.524 5.713l-1.626 5.929 6.075-1.591a11.384 11.384 0 005.45 1.38h.005c6.304 0 11.43-5.126 11.43-11.43 0-3.05-1.186-5.91-3.33-8.057z" fill="currentColor"/>
                </svg>
              </span>
            </a>
          </div>
          
          <address class="mobile-contact-address">
            Rambla Catalunya 38, Planta 9, 08007, Barcelona
          </address>
        </div>
      </div>
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
