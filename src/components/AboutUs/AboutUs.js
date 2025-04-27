// src/components/AboutUs/AboutUs.js
import "./AboutUs.css";

export function createAboutUs() {
  const aboutUsSection = document.createElement("section");
  aboutUsSection.id = "quienes-somos";
  aboutUsSection.classList.add("about-section");

  aboutUsSection.innerHTML = `
    <div class="about-container">
      <h2 class="section-title">Quiénes somos</h2>
      
      <div class="team-grid">
        <div class="team-member">
          <div class="member-image">
            <img src="/assets/images/alejandro.jpg" alt="Alejandro Falcones">
          </div>
          <h3 class="member-name">Alejandro Falcones</h3>
          <p class="member-title">Ingeniero en Diseño Industrial especializado en modelado 3D</p>
          <p class="member-bio">
            Con experiencia en automatización logística y 
            desarrollo de maquinaria avanzada.
            Actualmente también en Singular Logistics,
            combina innovación y precisión en cada proyecto.
          </p>
        </div>
        
        <div class="team-member">
          <div class="member-image">
            <img src="/assets/images/jose-maria.jpg" alt="Jose María Falcones">
          </div>
          <h3 class="member-name">Jose María Falcones</h3>
          <p class="member-title">Ingeniero Industrial Superior especializado en fabricación aditiva</p>
          <p class="member-bio">
            Con una sólida trayectoria en ingeniería industrial,
            aporta el enfoque práctico y sostenible que define a
            AddiCraft.
          </p>
        </div>
      </div>
      
      <div class="about-mission">
        <h3 class="mission-title">Nuestra Misión</h3>
        <p class="mission-text">
          En AddiCraft Engineering combinamos ingeniería avanzada, diseño paramétrico y optimización 
          topológica para revolucionar la fabricación industrial. Nuestro objetivo es crear soluciones 
          más eficientes, ligeras y sostenibles que impulsen la innovación en la industria.
        </p>
      </div>
    </div>
  `;

  return aboutUsSection;
}

export function initAboutUs() {
  const mainContainer = document.getElementById("app") || document.body;
  // Buscar los servicios para insertar el about-us después
  const servicesSection = document.querySelector(".services-section");
  if (servicesSection && !document.querySelector(".about-section")) {
    servicesSection.after(createAboutUs());
  } else if (!document.querySelector(".about-section")) {
    // Si no hay section de servicios, añadirlo al final del contenedor principal
    mainContainer.appendChild(createAboutUs());
  }
}
