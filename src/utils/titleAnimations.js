// src/utils/titleAnimations.js - SIMPLIFICADO
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSectionTitleAnimations() {
  // Esperar un poco para asegurar que todos los elementos estén en el DOM
  setTimeout(() => {
    // Get all section titles
    const sectionTitles = document.querySelectorAll(".section-title");

    // Process each title
    sectionTitles.forEach((title, index) => {
      // Add a class to make targeting easier
      title.classList.add("animate-title");

      // Set initial state - text is visible but covered
      gsap.set(title, {
        opacity: 1, // Text is always visible
      });

      // Create the reveal animation
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onUpdate: (self) => {
            if (self.progress > 0.7) {
              title.classList.add("is-inview");
            } else {
              title.classList.remove("is-inview");
            }
          },
          onComplete: () => {
            title.classList.add("is-inview");
          },
          onReverseComplete: () => {
            title.classList.remove("is-inview");
          },
        },
      });
    });

    // Add a delayed refresh to account for any layout shifts
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // Refresh on window resize to recalculate positions
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }, 500);
}
