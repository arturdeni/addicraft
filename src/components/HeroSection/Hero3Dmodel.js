// src/components/HeroSection/Hero3Dmodel.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Hero3DModel {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.model = null;
    this.controls = null;
    this.animationMixer = null;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // Check for WebGL support
    if (!this.isWebGLAvailable()) {
      this.showWebGLError();
      return;
    }

    // Create a simple loading indicator
    this.createSimpleLoadingIndicator();

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000); // Black background to match your website

    // Create camera
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 5);

    // Create renderer - simplified settings
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = false; // Disable shadows for simplicity
    this.renderer.setClearColor(0x000000, 0); // Transparent background

    // Append renderer to container
    this.container.appendChild(this.renderer.domElement);

    // Fix touch scroll on mobile - disable pointer events on canvas for mobile devices
    this.setupMobileScrollFix();

    // Add lights - simplified, neutral lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Neutral white light
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(-1, -1, -1);
    this.scene.add(backLight);

    // Load 3D model
    this.loadModel();

    // Add orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.3;
    this.controls.enabled = false; // Disable manual control

    // Handle window resize
    window.addEventListener("resize", this.onWindowResize.bind(this));

    // Handle orientation change on mobile
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        this.setupMobileScrollFix();
        this.onWindowResize();
      }, 100);
    });

    // Start animation loop
    this.animate();
  }

  createSimpleLoadingIndicator() {
    const loadingElement = document.createElement("div");
    loadingElement.style.position = "absolute";
    loadingElement.style.top = "50%";
    loadingElement.style.left = "50%";
    loadingElement.style.transform = "translate(-50%, -50%)";
    loadingElement.style.textAlign = "center";
    loadingElement.style.color = "#fff";

    const text = document.createElement("div");
    text.textContent = "Cargando modelo 3D...";

    loadingElement.appendChild(text);
    this.container.appendChild(loadingElement);

    this.loadingIndicator = loadingElement;
  }

  loadModel() {
    const loader = new GLTFLoader();

    loader.load(
      "/assets/images/addiCraft-cube3D.glb",
      (gltf) => {
        this.model = gltf.scene;

        // Center the model
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.model.position.sub(center);

        // Scale model to fit view - slightly more conservative scaling
        const boxSize = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);
        const scale = 2.2 / maxDim; // Smaller scale factor for a more natural size
        this.model.scale.multiplyScalar(scale);

        // Keep original materials and colors - NO COLOR MODIFICATIONS
        // The model will display with its original textures and colors from the GLB file

        // Add model to scene
        this.scene.add(this.model);

        // If the model has animations, set up the mixer
        if (gltf.animations && gltf.animations.length) {
          this.animationMixer = new THREE.AnimationMixer(this.model);
          const clip = gltf.animations[0];
          const action = this.animationMixer.clipAction(clip);
          action.play();
        }

        // Remove loading indicator
        if (this.loadingIndicator && this.loadingIndicator.parentNode) {
          this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
        }
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error happened when loading the 3D model", error);
      }
    );
  }

  setupMobileScrollFix() {
    // Detect if we're on a mobile device
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;

    if (isMobile) {
      // Disable pointer events on canvas for mobile to allow scroll
      this.renderer.domElement.style.pointerEvents = "none";

      // Also disable controls for mobile since we can't interact anyway
      if (this.controls) {
        this.controls.enabled = false;
      }
    } else {
      // For desktop, keep pointer events enabled if needed for future interactions
      this.renderer.domElement.style.pointerEvents = "auto";
    }
  }

  onWindowResize() {
    if (this.container && this.camera && this.renderer) {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);

      // Re-check mobile status on resize
      this.setupMobileScrollFix();
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Automatic rotation for the model - slower rotation on both X and Y axes
    if (this.model) {
      this.model.rotation.y += 0.002; // Very slow rotation around Y axis
      this.model.rotation.x += 0.001; // Even slower rotation around X axis
    }

    // Update animation mixer if it exists
    if (this.animationMixer) {
      this.animationMixer.update(this.clock.getDelta());
    }

    // Update controls
    if (this.controls) {
      this.controls.update();
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    // Clean up resources when component unmounts
    window.removeEventListener("resize", this.onWindowResize.bind(this));
    window.removeEventListener(
      "orientationchange",
      this.setupMobileScrollFix.bind(this)
    );

    // Remove canvas from container
    if (this.renderer) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }

    // Dispose of Three.js resources
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();

          if (object.material.isMaterial) {
            this.cleanMaterial(object.material);
          } else {
            // Array of materials
            for (const material of object.material) {
              this.cleanMaterial(material);
            }
          }
        }
      });
    }
  }

  cleanMaterial(material) {
    material.dispose();

    // Dispose textures
    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && typeof value === "object" && "minFilter" in value) {
        value.dispose();
      }
    }
  }

  isWebGLAvailable() {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }

  showWebGLError() {
    // Remove loading indicator if it exists
    if (this.loadingIndicator && this.loadingIndicator.parentNode) {
      this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
    }

    // Create fallback image element
    const fallbackImg = document.createElement("img");
    fallbackImg.src = "/assets/images/cube3D.png";
    fallbackImg.alt = "Estructura optimizada topológicamente";
    fallbackImg.classList.add("cube-image");

    // Create error message
    const errorMsg = document.createElement("div");
    errorMsg.style.position = "absolute";
    errorMsg.style.bottom = "10px";
    errorMsg.style.left = "0";
    errorMsg.style.width = "100%";
    errorMsg.style.textAlign = "center";
    errorMsg.style.fontSize = "12px";
    errorMsg.style.color = "rgba(255,255,255,0.7)";
    errorMsg.textContent = "Tu navegador no soporta gráficos 3D";

    // Clear container and add fallback
    this.container.innerHTML = "";
    this.container.appendChild(fallbackImg);
    this.container.appendChild(errorMsg);
  }
}
