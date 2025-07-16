// src/components/Services/Services.js
import "./Services.css";

const servicesData = [
  {
    id: 1,
    title: "Optimización topológica",
    description:
      "Estudio técnico de la pieza y optimización adaptada según las necesidades.",
    image: "/assets/images/pieza-topologica.jpg",
  },
  {
    id: 2,
    title: "Diseño",
    description:
      "Modificamos la pieza según los resultados obtenidos en la optimización.",
    image: "/assets/images/pieza-diseno.jpg",
  },
  {
    id: 3,
    title: "Fabricación",
    description:
      "Impresión 3D de última generación para conseguir el mejor resultado.",
    image: "/assets/images/pieza-fabricacion.jpg",
  },
];

export function createServices() {
  const servicesSection = document.createElement("section");
  servicesSection.id = "que-ofrecemos";
  servicesSection.classList.add("services-section");

  servicesSection.innerHTML = `
    <div class="services-container">
      <h2 class="section-title">Qué ofrecemos</h2>
      
      <div class="services-content">
        <!-- Desktop: imagen + lista -->
        <div class="desktop-layout">
          <div class="services-image">
            <img src="${servicesData[0].image}" alt="${
    servicesData[0].title
  }" class="current-image">
          </div>
          
          <div class="services-list">
            ${servicesData
              .map(
                (service, index) => `
              <div class="service-item ${
                index === 0 ? "active" : ""
              }" data-index="${index}">
                <div class="service-text">
                  <h3 class="service-title">${service.title}</h3>
                  <p class="service-description">${service.description}</p>
                </div>
                <div class="service-icon ${index === 0 ? "active" : ""}">
                  <img src="/assets/logos/addiCraftLogo.png" alt="Logo">
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        
        <!-- Mobile: servicios con imagen pequeña integrada -->
        <div class="mobile-layout">
          ${servicesData
            .map(
              (service, index) => `
            <div class="mobile-service">
              <div class="mobile-service-image">
                <img src="${service.image}" alt="${service.title}">
              </div>
              <div class="mobile-service-content">
                <h3 class="mobile-service-title">${service.title}</h3>
                <p class="mobile-service-description">${service.description}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  // Solo inicializar interacciones en desktop
  setTimeout(() => {
    if (window.innerWidth > 768) {
      initDesktopInteractions();
    }
  }, 100);

  return servicesSection;
}

function initDesktopInteractions() {
  const serviceItems = document.querySelectorAll(".service-item");
  const serviceIcons = document.querySelectorAll(".service-icon");
  const currentImage = document.querySelector(".current-image");

  serviceItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      // Activar elemento actual
      serviceItems.forEach((el) => el.classList.remove("active"));
      serviceIcons.forEach((el) => el.classList.remove("active"));

      item.classList.add("active");
      serviceIcons[index].classList.add("active");

      // Cambiar imagen
      changeImage(currentImage, servicesData[index].image);
    });
  });
}

function changeImage(imageElement, newSrc) {
  const container = imageElement.parentElement;

  // Crear nueva imagen
  const newImage = document.createElement("img");
  newImage.src = newSrc;
  newImage.className = "swipe-image";

  container.appendChild(newImage);

  // Animar
  setTimeout(() => newImage.classList.add("active"), 10);

  // Limpiar
  setTimeout(() => {
    imageElement.src = newSrc;
    container.removeChild(newImage);
  }, 500);
}

export function initServices() {
  const mainContainer = document.getElementById("app") || document.body;
  const heroSection = document.querySelector(".hero-section");

  const existingServices = document.querySelector(".services-section");
  if (existingServices) {
    existingServices.remove();
  }

  const newServices = createServices();

  if (heroSection) {
    heroSection.after(newServices);
  } else {
    mainContainer.appendChild(newServices);
  }

  return newServices;
}
