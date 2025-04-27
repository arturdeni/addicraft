// src/components/Services/Services.js
import "./Services.css";

export function createServices() {
  const servicesSection = document.createElement("section");
  servicesSection.id = "que-ofrecemos";
  servicesSection.classList.add("services-section");

  servicesSection.innerHTML = `
    <div class="services-container">
      <h2 class="section-title">Qué ofrecemos</h2>
      
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">
            <img src="/assets/images/service-icon1.svg" alt="Estudio técnico">
          </div>
          <h3 class="service-title">Estudio técnico</h3>
          <p class="service-description">Estudio técnico de la pieza y optimización adaptada según sus necesidades.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <img src="/assets/images/service-icon2.svg" alt="Impresión 3D">
          </div>
          <h3 class="service-title">Impresión 3D</h3>
          <p class="service-description">Impresión 3D de piezas prototipos para comparar el diseño original.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <img src="/assets/images/service-icon3.svg" alt="Diseño">
          </div>
          <h3 class="service-title">Diseño</h3>
          <p class="service-description">Modificamos la pieza según los resultados obtenidos en la optimización.</p>
        </div>
      </div>
      
      <div class="services-benefits">
        <div class="benefit">
          <span class="benefit-highlight">Ahorro de hasta 70% de material</span>
        </div>
        <div class="benefit">
          <span class="benefit-highlight">Producción en menos tiempo</span>
        </div>
        <div class="benefit">
          <span class="benefit-highlight">Personalización 100%</span>
        </div>
        <div class="benefit">
          <span class="benefit-highlight">Tecnología puntera</span>
        </div>
      </div>
    </div>
  `;

  return servicesSection;
}

export function initServices() {
  const mainContainer = document.getElementById("app") || document.body;
  // Buscar el hero section para insertar los servicios después
  const heroSection = document.querySelector(".hero-section");
  if (heroSection && !document.querySelector(".services-section")) {
    heroSection.after(createServices());
  } else if (!document.querySelector(".services-section")) {
    // Si no hay hero section, añadirlo al final del contenedor principal
    mainContainer.appendChild(createServices());
  }
}
