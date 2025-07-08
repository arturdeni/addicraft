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
          Optimizamos y diseñamos con Catia 3D Experience, software líder que abarca los procesos completos de innovación y desarrollo para imaginar, diseñar y simular nuevos productos y sistemas con el fin de ofrecer a los clientes experiencias impactantes hacia un mundo más sostenible.
          Fabricamos con la impresora Markforged METAL X. Una solución de impresión 3D en metal accesible e integral para obtener piezas de metal funcionales de un día para otro.
        </p>
        
        <div class="tech-logos">
          <div class="tech-logo">
            <img src="/assets/logos/catia.png" alt="CATIA">
          </div>
          <div class="tech-logo">
            <img src="/assets/logos/markforged.png" alt="Markforged">
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
