// src/utils/titleAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function initSectionTitleAnimations() {
  // Get all section titles
  const sectionTitles = document.querySelectorAll(".section-title");

  // Process each title
  sectionTitles.forEach((title) => {
    // Add a class to make targeting easier
    title.classList.add("animate-title");

    // Initialize SplitType to split text into characters
    const splitTitle = new SplitType(title, {
      types: "chars,words",
      tagName: "span",
    });

    // Hide all characters initially
    gsap.set(splitTitle.chars, {
      y: 60,
      opacity: 0,
      rotateX: -90,
      transformOrigin: "50% 50% -20",
    });

    // Create animation that triggers on scroll
    gsap.to(splitTitle.chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.02, // Time between each character animation
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: title,
        start: "top 60%", // Start animation when the top of the title is 80% from the top of the viewport
        // end: "bottom 20%",
        // scrub: false, // Animation plays independent of scroll position once triggered
        // markers: false, // Set to true during development to see the trigger points
        toggleActions: "play none none none", // play on enter, no reverse
      },
    });
  });
}
