// src/components/EmblaCarousel/EmblaCarousel.js
import EmblaCarousel from "embla-carousel";
import "./EmblaCarousel.css";

export function createEmblaCarousel(options = {}) {
  const {
    slides = [],
    autoplay = false,
    autoplayDelay = 4000,
    loop = true,
    align = "center",
    slidesToScroll = 1,
    className = "",
    renderSlide = (slide, index) => `
      <div class="embla__slide">
        <div class="embla__slide__number">${index + 1}</div>
      </div>
    `,
    showControls = true,
    showDots = true,
    // NUEVO: Opción para efecto blur en slides laterales
    blurSideSlides = false,
    // NUEVO: Índice de inicio
    startIndex = 0,
  } = options;

  const carouselId = `embla-carousel-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const carouselHTML = `
    <div class="embla ${className} ${
    blurSideSlides ? "embla--blur-sides" : ""
  }" id="${carouselId}">
      <div class="embla__viewport">
        <div class="embla__container">
          ${slides.map((slide, index) => renderSlide(slide, index)).join("")}
        </div>
      </div>
      
      ${
        showControls
          ? `
        <div class="embla__controls">
          <div class="embla__buttons">
            <button class="embla__button embla__button--prev" type="button" disabled>
              <svg class="embla__button__svg" viewBox="0 0 532 532">
                <path fill="currentColor" d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"></path>
              </svg>
            </button>
            <button class="embla__button embla__button--next" type="button">
              <svg class="embla__button__svg" viewBox="0 0 532 532">
                <path fill="currentColor" d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"></path>
              </svg>
            </button>
          </div>
          ${showDots ? '<div class="embla__dots"></div>' : ""}
        </div>
      `
          : ""
      }
    </div>
  `;

  return {
    html: carouselHTML,
    init: function () {
      return initEmblaCarousel(carouselId, {
        loop,
        align,
        slidesToScroll,
        autoplay,
        autoplayDelay,
        showDots,
        blurSideSlides,
        startIndex,
      });
    },
  };
}

function initEmblaCarousel(carouselId, options) {
  const emblaNode = document.getElementById(carouselId);
  if (!emblaNode) return null;

  const viewportNode = emblaNode.querySelector(".embla__viewport");
  const prevBtnNode = emblaNode.querySelector(".embla__button--prev");
  const nextBtnNode = emblaNode.querySelector(".embla__button--next");
  const dotsNode = emblaNode.querySelector(".embla__dots");

  // 🎯 NUEVA FUNCIÓN: Detectar si hay spacers y calcular startIndex correcto
  const slides = emblaNode.querySelectorAll(".embla__slide");
  let actualStartIndex = options.startIndex;

  // Si hay spacers (detectamos por la clase spacer-slide), ajustar el startIndex
  const hasSpacers = emblaNode.querySelector(".spacer-slide");
  if (hasSpacers && window.innerWidth > 768) {
    // En desktop con spacers, mantener el startIndex original
    actualStartIndex = options.startIndex;
  } else if (hasSpacers && window.innerWidth <= 768) {
    // En mobile, si por alguna razón hay spacers, ignorarlos
    actualStartIndex = 0;
  } else {
    // Sin spacers (mobile), empezar desde 0
    actualStartIndex = 0;
  }

  // Configuración de Embla
  const emblaApi = EmblaCarousel(viewportNode, {
    loop: options.loop,
    align: options.align,
    slidesToScroll: options.slidesToScroll,
    containScroll: "trimSnaps",
    startIndex: actualStartIndex,
  });

  // Funciones de utilidad
  const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
    emblaApi,
    prevBtnNode,
    nextBtnNode
  );

  const removeDotBtnsAndClickHandlers = options.showDots
    ? addDotBtnsAndClickHandlers(emblaApi, dotsNode)
    : () => {};

  const removeTweenScale = addTweenScale(emblaApi);

  // NUEVO: Añadir efecto blur si está habilitado
  const removeTweenBlur = options.blurSideSlides
    ? addTweenBlur(emblaApi)
    : () => {};

  // Autoplay si está habilitado
  let autoplayTimer;
  if (options.autoplay) {
    const startAutoplay = () => {
      autoplayTimer = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else if (options.loop) {
          emblaApi.scrollTo(0);
        }
      }, options.autoplayDelay);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
      }
    };

    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("init", startAutoplay);
  }

  // Cleanup function
  emblaApi.on("destroy", () => {
    removePrevNextBtnsClickHandlers();
    removeDotBtnsAndClickHandlers();
    removeTweenScale();
    removeTweenBlur();
    if (autoplayTimer) clearInterval(autoplayTimer);
  });

  return emblaApi;
}

// NUEVA FUNCIÓN: Efecto blur para slides laterales
function addTweenBlur(emblaApi) {
  const BLUR_FACTOR_BASE = 8; // Intensidad del blur

  const numberWithinRange = (number, min, max) =>
    Math.min(Math.max(number, min), max);

  const setTweenNodes = (emblaApi) => {
    return emblaApi.slideNodes().map((slideNode) => {
      return slideNode;
    });
  };

  const tweenBlur = (emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        // Calcular blur basado en la distancia del centro
        const blurValue = Math.abs(diffToTarget) * BLUR_FACTOR_BASE;
        const blur = numberWithinRange(blurValue, 0, 8).toString();

        const tweenNode = tweenNodes[slideIndex];
        tweenNode.style.filter = `blur(${blur}px)`;

        // También aplicar opacidad reducida
        const opacity = 1 - Math.abs(diffToTarget) * 0.3;
        const finalOpacity = numberWithinRange(opacity, 0.4, 1).toString();
        tweenNode.style.opacity = finalOpacity;
      });
    });
  };

  const tweenNodes = setTweenNodes(emblaApi);

  emblaApi.on("reInit", () => {
    tweenNodes.splice(0);
    tweenNodes.push(...setTweenNodes(emblaApi));
  });

  emblaApi.on("reInit", tweenBlur).on("scroll", tweenBlur);

  return () => {
    emblaApi.off("reInit", tweenBlur).off("scroll", tweenBlur);
  };
}

// Función para el efecto de escala (ACTUALIZADA para slide activo más grande)
function addTweenScale(emblaApi) {
  const TWEEN_FACTOR_BASE = 0.2;

  const numberWithinRange = (number, min, max) =>
    Math.min(Math.max(number, min), max);

  const setTweenNodes = (emblaApi) => {
    return emblaApi.slideNodes().map((slideNode) => {
      return (
        slideNode.querySelector(".embla__slide__number") ||
        slideNode.querySelector(".embla__slide__content") ||
        slideNode
      );
    });
  };

  const setTweenFactor = (emblaApi) => {
    return TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  };

  const tweenScale = (emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";
    const selectedIndex = emblaApi.selectedScrollSnap();

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        // NUEVO: Escala más grande para el slide activo (responsive)
        let scale;
        if (slideIndex === selectedIndex) {
          // Detectar si estamos en mobile
          const isMobile = window.innerWidth <= 768;
          // Slide activo: escala diferente según dispositivo
          scale = isMobile ? "1.05" : "1.15"; // 5% en mobile, 15% en desktop
        } else {
          // Slides no activos: escala normal con efecto de distancia
          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor);
          scale = numberWithinRange(tweenValue, 0.7, 1).toString();
        }

        const tweenNode = tweenNodes[slideIndex];
        tweenNode.style.transform = `scale(${scale})`;

        // NUEVO: Añadir atributo data para identificar slide activo
        const slideElement = emblaApi.slideNodes()[slideIndex];
        if (slideIndex === selectedIndex) {
          slideElement.setAttribute("data-active", "true");
        } else {
          slideElement.removeAttribute("data-active");
        }
      });
    });
  };

  const tweenNodes = setTweenNodes(emblaApi);
  const tweenFactor = setTweenFactor(emblaApi);

  emblaApi.on("reInit", () => {
    tweenNodes.splice(0);
    tweenNodes.push(...setTweenNodes(emblaApi));
  });

  emblaApi
    .on("reInit", tweenScale)
    .on("scroll", tweenScale)
    .on("select", tweenScale);

  return () => {
    emblaApi
      .off("reInit", tweenScale)
      .off("scroll", tweenScale)
      .off("select", tweenScale);
  };
}

// 🎯 MODIFICADA: Función para manejar botones prev/next sin spacers en mobile
function addPrevNextBtnsClickHandlers(emblaApi, prevBtn, nextBtn) {
  const togglePrevNextBtnsState = () => {
    const currentIndex = emblaApi.selectedScrollSnap();
    const totalSlides = emblaApi.scrollSnapList().length;
    const isMobile = window.innerWidth <= 768;
    const hasSpacers = document.querySelector(".spacer-slide");

    let firstSlide, lastSlide;

    if (hasSpacers && !isMobile) {
      // Desktop con spacers: saltar los 2 primeros y 2 últimos
      firstSlide = 2;
      lastSlide = totalSlides - 3;
    } else {
      // Mobile sin spacers: usar todo el rango
      firstSlide = 0;
      lastSlide = totalSlides - 1;
    }

    // Bloquear botón prev si estamos en el primer slide real
    if (currentIndex <= firstSlide) {
      prevBtn.setAttribute("disabled", "disabled");
    } else {
      prevBtn.removeAttribute("disabled");
    }

    // Bloquear botón next si estamos en el último slide real
    if (currentIndex >= lastSlide) {
      nextBtn.setAttribute("disabled", "disabled");
    } else {
      nextBtn.removeAttribute("disabled");
    }
  };

  const onPrevBtnClick = () => {
    emblaApi.scrollPrev();
  };

  const onNextBtnClick = () => {
    emblaApi.scrollNext();
  };

  prevBtn.addEventListener("click", onPrevBtnClick, false);
  nextBtn.addEventListener("click", onNextBtnClick, false);
  emblaApi.on("select", togglePrevNextBtnsState);
  emblaApi.on("init", togglePrevNextBtnsState);

  return () => {
    prevBtn.removeEventListener("click", onPrevBtnClick, false);
    nextBtn.removeEventListener("click", onNextBtnClick, false);
    emblaApi.off("select", togglePrevNextBtnsState);
    emblaApi.off("init", togglePrevNextBtnsState);
  };
}

function addDotBtnsAndClickHandlers(emblaApi, dotsNode) {
  let dotNodes = [];

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join("");

    const scrollTo = (index) => {
      emblaApi.scrollTo(index);
    };

    dotNodes = Array.from(dotsNode.querySelectorAll(".embla__dot"));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener("click", () => scrollTo(index), false);
    });
  };

  const toggleDotBtnsState = () => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    dotNodes[previous].classList.remove("embla__dot--selected");
    dotNodes[selected].classList.add("embla__dot--selected");
  };

  emblaApi
    .on("init", addDotBtnsWithClickHandlers)
    .on("reInit", addDotBtnsWithClickHandlers)
    .on("init", toggleDotBtnsState)
    .on("reInit", toggleDotBtnsState)
    .on("select", toggleDotBtnsState);

  return () => {
    dotsNode.innerHTML = "";
  };
}

// 🎯 FUNCIÓN PRINCIPAL MODIFICADA: createMaterialsCarousel con detección responsiva
export function createMaterialsCarousel(materials, options = {}) {
  // 🎯 NUEVA LÓGICA: Detectar si estamos en mobile
  const isMobile = window.innerWidth <= 768;

  let materialsToUse;
  let startIndexToUse;

  if (isMobile) {
    // 🎯 MOBILE: Sin spacers, usar materiales directamente
    materialsToUse = materials;
    startIndexToUse = 0; // Empezar desde el primer material real
  } else {
    // 🎯 DESKTOP: Con spacers para centrado
    materialsToUse = [
      // Spacers al inicio (invisibles)
      {
        id: "spacer-start-1",
        name: "",
        image: "",
        properties: "",
        isSpacer: true,
      },
      {
        id: "spacer-start-2",
        name: "",
        image: "",
        properties: "",
        isSpacer: true,
      },
      // Materiales reales
      ...materials,
      // Spacers al final (invisibles)
      {
        id: "spacer-end-1",
        name: "",
        image: "",
        properties: "",
        isSpacer: true,
      },
      {
        id: "spacer-end-2",
        name: "",
        image: "",
        properties: "",
        isSpacer: true,
      },
    ];
    startIndexToUse = 2; // Empezar en el primer material real (después de 2 spacers)
  }

  return createEmblaCarousel({
    slides: materialsToUse,
    renderSlide: (material, index) => {
      // Si es un spacer, renderizar slide vacío e invisible
      if (material.isSpacer) {
        return `
          <div class="embla__slide">
            <div class="embla__slide__content material-slide spacer-slide">
              <!-- Slide invisible para centrado -->
            </div>
          </div>
        `;
      }

      // Slide normal de material
      return `
        <div class="embla__slide">
          <div class="embla__slide__content material-slide">
            <div class="material-content">
              <img src="${material.image}" alt="${
        material.name
      }" class="material-sphere">
              <div class="material-title">${material.name}</div>
              <div class="material-description">
                <div class="material-properties">${
                  material.properties || ""
                }</div>
              </div>
            </div>
          </div>
        </div>
      `;
    },
    align: "center",
    loop: false,
    blurSideSlides: true,
    showDots: false,
    slidesToScroll: 1,
    startIndex: startIndexToUse, // Usar el índice calculado según el dispositivo
    ...options,
  });
}
