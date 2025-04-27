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
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item"><a href="#home" class="nav-link">Home</a></li>
          <li class="nav-item"><a href="#quienes-somos" class="nav-link">Quiénes somos</a></li>
          <li class="nav-item"><a href="#que-ofrecemos" class="nav-link">Que Ofrecemos</a></li>
          <li class="nav-item"><a href="#contacto" class="nav-link">Contacto</a></li>
        </ul>
      </nav>
    </div>
  `;

  // Añadir event listeners para scroll suave
  const navLinks = header.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - header.offsetHeight,
          behavior: "smooth",
        });
      }
    });
  });

  return header;
}

// Exportar función para inicializar el header
export function initHeader() {
  const headerContainer =
    document.getElementById("header-container") || document.body;
  if (!document.querySelector(".header")) {
    headerContainer.prepend(createHeader());
  }
}
