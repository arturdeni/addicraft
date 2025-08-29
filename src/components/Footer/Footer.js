// Footer.js
import "./Footer.css";

export function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  footer.innerHTML = `
    <div class="footer-container">
      <div class="tech-section">
        <h2 class="tech-title">Tecnología que usamos</h2>
        <p class="tech-description">
          Optimizamos y diseñamos con Catia 3D Experience, software líder que ofrece recursos técnicos avanzados para el desarrollo y la ingeniería de producto. Gracias a sus potentes herramientas de simulación, podemos analizar con gran realismo el comportamiento de las piezas y sistemas, asegurando soluciones fiables y de alto rendimiento. Fabricamos a través de una red de proveedores cuidadosamente seleccionados, eligiendo para cada proyecto la tecnología y el material que mejor se adapten, garantizando así resultados óptimos y totalmente personalizados.
        </p>
        
        <div class="tech-logos">
          <div class="tech-logo">
            <img src="/assets/logos/catia.png" alt="CATIA">
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">© ${new Date().getFullYear()} AddiCraft Engineering. Todos los derechos reservados.</p>
      </div>
    </div>
  `;

  return footer;
}
