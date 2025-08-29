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
    if (!this.isWebGLAvailable()) {
      this.showWebGLError();
      return;
    }

    this.createSimpleLoadingIndicator();

    // Escena (fondo negro como tu web; si quieres blanco: 0xffffff)
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // Cámara
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 5);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.8; // ↓ Menos brillo global
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x000000, 0);

    // (si tu versión de three aún lo soporta)
    this.renderer.physicallyCorrectLights = true;

    this.container.appendChild(this.renderer.domElement);

    this.setupMobileScrollFix();
    this.setupAdvancedLighting();
    this.loadModel();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.3;
    this.controls.enabled = false;

    window.addEventListener("resize", this.onWindowResize.bind(this));
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        this.setupMobileScrollFix();
        this.onWindowResize();
      }, 100);
    });

    this.animate();
  }

  // --- ILUMINACIÓN: estudio suave, sin quemar highlights ---
  setupAdvancedLighting() {
    // ambiente mínimo para no “aplastar” el metal
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(ambientLight);

    // Key light (principal)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(8, 10, 6);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.bias = -0.0001;
    this.scene.add(mainLight);

    // Fill light (relleno suave)
    const fillLight = new THREE.DirectionalLight(0xffffff, 3);
    fillLight.position.set(-6, 3, 4);
    this.scene.add(fillLight);

    // Rim light (contorno más discreto)
    const rimLight = new THREE.DirectionalLight(0xffffff, 4);
    rimLight.position.set(-8, 4, -6);
    this.scene.add(rimLight);

    // Luces puntuales muy contenidas (solo para volumen)
    const topLight = new THREE.PointLight(0xffffff, 0.35, 18);
    topLight.position.set(0, 10, 2);
    this.scene.add(topLight);

    const sideLight = new THREE.PointLight(0xffffff, 0.3, 14);
    sideLight.position.set(8, 2, 8);
    this.scene.add(sideLight);

    // Environment para reflejos
    this.setupEnvironmentMap();
  }

  setupEnvironmentMap() {
    this.createProceduralEnvironment();
  }

  createProceduralEnvironment() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    const renderTarget = pmremGenerator.fromScene(
      this.createEnvironmentScene()
    );
    this.scene.environment = renderTarget.texture;

    pmremGenerator.dispose();
  }

  // Environment: cúpula gris + “light cards” grises (no blancas puras) → reflejo controlado
  createEnvironmentScene() {
    const envScene = new THREE.Scene();

    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(50, 36, 18),
      new THREE.MeshBasicMaterial({ color: 0xe8e8e8, side: THREE.BackSide })
    );
    envScene.add(dome);

    const makePanel = (
      w,
      h,
      x,
      y,
      z,
      rx = 0,
      ry = 0,
      rz = 0,
      color = 0xf2f2f2
    ) => {
      const m = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
      const g = new THREE.PlaneGeometry(w, h);
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      envScene.add(mesh);
    };

    // Paneles algo más grises (evitan “hotspots”)
    makePanel(18, 8, 0, 12, 16, -0.25, 0.0, 0.0, 0xeeeeee);
    makePanel(16, 8, 16, 4, 0, 0.0, Math.PI / 2, 0.0, 0xededed);
    makePanel(16, 8, -16, 4, 0, 0.0, -Math.PI / 2, 0.0, 0xededed);
    makePanel(18, 8, 0, 2, -18, 0.0, Math.PI, 0.0, 0xeeeeee);

    return envScene;
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
      "/assets/images/addiCraft-cube3D-2.glb",
      (gltf) => {
        this.model = gltf.scene;

        // Centrar y escalar
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.model.position.sub(center);

        const boxSize = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);
        const scale = 2.2 / maxDim;
        this.model.scale.multiplyScalar(scale);

        // Material
        this.enhanceMaterials(this.model);

        this.scene.add(this.model);

        // Sombras
        this.model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Animaciones
        if (gltf.animations && gltf.animations.length) {
          this.animationMixer = new THREE.AnimationMixer(this.model);
          const clip = gltf.animations[0];
          const action = this.animationMixer.clipAction(clip);
          action.play();
        }

        // Quitar loader
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

  // --- Texturas procedurales sutiles para micro-rugosidad ---
  createNoiseRoughnessTexture(size = 256, repeat = 8) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const img = ctx.createImageData(size, size);
    const d = img.data;

    // Ruido suave y claro (gris 195–230): suficiente para romper reflejo plástico
    for (let i = 0; i < d.length; i += 4) {
      const g = 195 + Math.random() * 35;
      d[i] = d[i + 1] = d[i + 2] = g;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat, repeat);
    tex.anisotropy = 4;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true;
    return tex;
  }

  // --- Material de ACERO OSCURO satinado, sin clearcoat ni transparencia ---
  enhanceMaterials(object) {
    const roughTex = this.createNoiseRoughnessTexture();

    object.traverse((child) => {
      if (child.isMesh && child.material) {
        const newMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x6b6b6b, // ← acero oscuro (ajusta a 0x4d4d4d si lo quieres más oscuro)
          metalness: 1.0, // metal puro
          roughness: 0.32, // satinado (más alto = menos brillo)
          roughnessMap: roughTex,
          envMapIntensity: 0.9, // reflejo contenido
          // sin barniz para evitar look plástico
          clearcoat: 0.0,
          clearcoatRoughness: 0.0,
          // Garantizar que NO sea transparente
          transparent: false,
          opacity: 1.0,
          side: THREE.FrontSide,
          // sin mapas extra
          map: null,
          normalMap: null,
          metalnessMap: null,
        });

        child.material = newMaterial;
        child.material.needsUpdate = true;

        // Normales suaves si faltaran
        if (
          child.geometry &&
          child.geometry.attributes &&
          !child.geometry.attributes.normal
        ) {
          child.geometry.computeVertexNormals();
        }

        console.log("Material acero oscuro aplicado a:", child.name || "mesh");
      }
    });
  }

  setupMobileScrollFix() {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;

    if (isMobile) {
      this.renderer.domElement.style.pointerEvents = "none";
      if (this.controls) {
        this.controls.enabled = false;
      }
    } else {
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

      this.setupMobileScrollFix();
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    if (this.model) {
      this.model.rotation.y += 0.002;
      this.model.rotation.x += 0.001;
    }

    if (this.animationMixer) {
      this.animationMixer.update(this.clock.getDelta());
    }

    if (this.controls) {
      this.controls.update();
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
    window.removeEventListener(
      "orientationchange",
      this.setupMobileScrollFix.bind(this)
    );

    if (this.renderer) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }

    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();

          if (object.material.isMaterial) {
            this.cleanMaterial(object.material);
          } else {
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
    if (this.loadingIndicator && this.loadingIndicator.parentNode) {
      this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
    }

    const fallbackImg = document.createElement("img");
    fallbackImg.src = "/assets/images/cube3D.png";
    fallbackImg.alt = "Estructura optimizada topológicamente";
    fallbackImg.classList.add("cube-image");

    const errorMsg = document.createElement("div");
    errorMsg.style.position = "absolute";
    errorMsg.style.bottom = "10px";
    errorMsg.style.left = "0";
    errorMsg.style.width = "100%";
    errorMsg.style.textAlign = "center";
    errorMsg.style.fontSize = "12px";
    errorMsg.style.color = "rgba(255,255,255,0.7)";
    errorMsg.textContent = "Tu navegador no soporta gráficos 3D";

    this.container.innerHTML = "";
    this.container.appendChild(fallbackImg);
    this.container.appendChild(errorMsg);
  }
}
