document.documentElement.classList.add("js");

const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-nav]");
let imageLibrary = {};

const fallbackData = {
  rooms: [
    {
      name: "Matrimoniale Standard",
      slug: "matrimoniale-standard",
      summary: "Una camera essenziale e luminosa, pensata per soggiorni rilassati a pochi passi dal mare e dal centro.",
      details: "Ideale per coppie e soggiorni brevi, con comfort contemporanei, accesso indipendente e ambienti funzionali.",
      capacity: "2 persone",
      size: "18 mq",
      view: "Vista interna o scorcio sulla Villa Comunale",
      image: "assets/images/room-standard.svg",
      imageKey: "room-standard",
      featured: true
    },
    {
      name: "Matrimoniale Superior",
      slug: "matrimoniale-superior",
      summary: "Piu' ampia e ariosa, con un'atmosfera raffinata e dettagli pensati per chi desidera piu' comfort.",
      details: "Perfetta per una pausa sul Tirreno, spesso con affaccio piacevole verso la Villa Comunale e Torre Talao.",
      capacity: "2 persone",
      size: "22 mq",
      view: "Vista Villa Comunale / Torre Talao",
      image: "assets/images/room-superior.svg",
      imageKey: "room-superior",
      featured: true
    },
    {
      name: "Camera Familiare",
      slug: "camera-familiare",
      summary: "La soluzione piu' versatile per famiglie o piccoli gruppi che desiderano spazio, praticita' e accesso libero h24.",
      details: "Ambienti organizzati per accogliere fino a quattro ospiti con la comodita' di parcheggio privato e ingressi indipendenti.",
      capacity: "4 persone",
      size: "28 mq",
      view: "Vista interna o affaccio aperto",
      image: "assets/images/room-family.svg",
      imageKey: "room-family",
      featured: true
    }
  ],
  images: {
    "home-hero": "https://images.unsplash.com/photo-1504163782861-f53c245f6086?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aXRhbHklMjBjb2FzdHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=2200",
    "history-lounge": "https://images.unsplash.com/photo-1660557989725-f511e9fa6267?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWwlMjBsb2JieXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1800",
    "restaurant-evening": "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1800",
    "breakfast-terrace": "https://images.unsplash.com/photo-1755493872625-1dcb19e9457e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1800",
    "coast-view": "https://images.unsplash.com/photo-1504163782861-f53c245f6086?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aXRhbHklMjBjb2FzdHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1800",
    "coast-view-alt": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGl0YWx5JTIwY29hc3R8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=80&w=1800",
    "room-standard": "https://images.unsplash.com/photo-1549638441-b787d2e11f14?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1800",
    "room-superior": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1800",
    "room-family": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1800",
    "room-details": "https://images.unsplash.com/photo-1660557989725-f511e9fa6267?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWwlMjBsb2JieXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1800",
    "restaurant-gallery": "https://images.unsplash.com/photo-1538333581680-29dd4752ddf2?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1800",
    "restaurant-bar": "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1800"
  }
};

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

const yearNode = document.querySelector("[data-year]");
if (yearNode) yearNode.textContent = new Date().getFullYear();

function setPageLinkTargets(root = document) {
  root.querySelectorAll("a[href]").forEach((link) => {
    const href = (link.getAttribute("href") || "").trim();
    if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (error) {
      return;
    }

    if (!/^https?:$/.test(url.protocol) || url.origin === window.location.origin) return;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

setPageLinkTargets();

let revealObserver;

function observeReveal(items) {
  if (!items.length) return;
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  items.forEach((item) => revealObserver.observe(item));
}

observeReveal(document.querySelectorAll("[data-reveal]"));

async function get(resource, fallbackKey) {
  try {
    const response = await fetch(resource, { method: "GET" });
    if (!response.ok) throw new Error(`Errore nel caricamento di ${resource}`);
    return response.json();
  } catch (error) {
    return fallbackData[fallbackKey];
  }
}

function getPlaceholderImage(key) {
  return imageLibrary[key] || null;
}

function applyPlaceholderImages(root = document) {
  root.querySelectorAll("[data-image-key]").forEach((image) => {
    const key = image.dataset.imageKey;
    const src = getPlaceholderImage(key);
    if (!src) return;
    image.src = src;
    image.decoding = "async";
  });
}

let lightboxElement;
let lightboxSlides = [];
let lightboxIndex = 0;
let lightboxLastFocus = null;
let lightboxTouchStartX = 0;

function getSlideInfo(slide) {
  const image = slide.querySelector("img");
  const caption = slide.querySelector(".carousel__caption");
  return {
    src: image?.currentSrc || image?.src || "",
    alt: image?.alt || "",
    title: caption?.querySelector("strong")?.textContent || "",
    text: caption?.querySelector("span")?.textContent || ""
  };
}

function ensureLightbox() {
  if (lightboxElement) return lightboxElement;

  lightboxElement = document.createElement("div");
  lightboxElement.className = "lightbox";
  lightboxElement.setAttribute("aria-hidden", "true");
  lightboxElement.innerHTML = `
    <div class="lightbox__dialog" role="dialog" aria-modal="true" aria-label="Galleria fotografica">
      <button class="lightbox__close" type="button" data-lightbox-close aria-label="Chiudi galleria">x</button>
      <button class="lightbox__nav lightbox__nav--prev" type="button" data-lightbox-prev aria-label="Foto precedente">&lt;</button>
      <figure class="lightbox__figure">
        <img class="lightbox__image" src="" alt="">
        <figcaption class="lightbox__caption">
          <strong data-lightbox-title></strong>
          <span data-lightbox-text></span>
          <small class="lightbox__counter" data-lightbox-counter></small>
        </figcaption>
      </figure>
      <button class="lightbox__nav lightbox__nav--next" type="button" data-lightbox-next aria-label="Foto successiva">&gt;</button>
    </div>
  `;

  document.body.appendChild(lightboxElement);

  lightboxElement.addEventListener("click", (event) => {
    if (event.target === lightboxElement) closeLightbox();
  });

  lightboxElement.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
  lightboxElement.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => moveLightbox(-1));
  lightboxElement.querySelector("[data-lightbox-next]")?.addEventListener("click", () => moveLightbox(1));

  lightboxElement.addEventListener("touchstart", (event) => {
    lightboxTouchStartX = event.changedTouches[0]?.clientX || 0;
  });

  lightboxElement.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0]?.clientX || 0;
    const delta = touchEndX - lightboxTouchStartX;
    if (Math.abs(delta) < 45) return;
    moveLightbox(delta > 0 ? -1 : 1);
  });

  return lightboxElement;
}

function updateLightbox() {
  if (!lightboxElement || !lightboxSlides.length) return;
  const slide = lightboxSlides[lightboxIndex];
  const image = lightboxElement.querySelector(".lightbox__image");
  const title = lightboxElement.querySelector("[data-lightbox-title]");
  const text = lightboxElement.querySelector("[data-lightbox-text]");
  const counter = lightboxElement.querySelector("[data-lightbox-counter]");

  if (image) {
    image.src = slide.src;
    image.alt = slide.alt;
  }
  if (title) title.textContent = slide.title;
  if (text) text.textContent = slide.text;
  if (counter) counter.textContent = `${lightboxIndex + 1} / ${lightboxSlides.length}`;
}

function openLightbox(slides, index) {
  lightboxSlides = slides.map(getSlideInfo);
  if (!lightboxSlides.length) return;
  lightboxIndex = Math.min(Math.max(index, 0), lightboxSlides.length - 1);

  const lightbox = ensureLightbox();
  lightboxLastFocus = document.activeElement;
  document.body.classList.add("has-lightbox");
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  updateLightbox();
  lightbox.querySelector("[data-lightbox-close]")?.focus();
}

function closeLightbox() {
  if (!lightboxElement) return;
  document.body.classList.remove("has-lightbox");
  lightboxElement.classList.remove("is-open");
  lightboxElement.setAttribute("aria-hidden", "true");
  lightboxLastFocus?.focus?.();
}

function moveLightbox(step) {
  if (!lightboxSlides.length) return;
  lightboxIndex = (lightboxIndex + step + lightboxSlides.length) % lightboxSlides.length;
  updateLightbox();
}

document.addEventListener("keydown", (event) => {
  if (!lightboxElement?.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

function initCarousels(root = document) {
  root.querySelectorAll("[data-carousel]").forEach((carousel) => {
    if (carousel.dataset.carouselReady === "true") return;

    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.querySelector("[data-carousel-dots]");

    if (!track || slides.length === 0) return;

    carousel.dataset.carouselReady = "true";

    if (dotsContainer) {
      dotsContainer.innerHTML = slides
        .map(
          (_, slideIndex) => `
            <button
              class="carousel__dot${slideIndex === 0 ? " is-active" : ""}"
              type="button"
              data-carousel-dot="${slideIndex}"
              aria-label="Vai alla foto ${slideIndex + 1}"
              aria-current="${slideIndex === 0 ? "true" : "false"}"
            ></button>
          `
        )
        .join("");
    }

    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    let activeIndex = 0;

    const updateCarousel = (nextIndex) => {
      activeIndex = (nextIndex + slides.length) % slides.length;
      track.style.transform = `translateX(-${activeIndex * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", String(isActive));
      });
    };

    prevButton?.addEventListener("click", () => updateCarousel(activeIndex - 1));
    nextButton?.addEventListener("click", () => updateCarousel(activeIndex + 1));

    slides.forEach((slide, slideIndex) => {
      slide.tabIndex = 0;
      slide.setAttribute("role", "button");
      slide.setAttribute("aria-label", `Apri foto ${slideIndex + 1}`);
      slide.addEventListener("click", () => openLightbox(slides, slideIndex));
      slide.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openLightbox(slides, slideIndex);
      });
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        updateCarousel(Number(dot.dataset.carouselDot));
      });
    });

    updateCarousel(0);
  });
}

imageLibrary = fallbackData.images;
applyPlaceholderImages(document);
initCarousels();

function roomTemplate(room) {
  return `
    <article class="room-card" data-reveal>
      <img src="${room.image}" data-image-key="${room.imageKey || ""}" alt="${room.name}" loading="lazy" width="1200" height="900">
      <div class="room-card__body">
        <div class="tag">${room.capacity}</div>
        <h3>${room.name}</h3>
        <p>${room.summary}</p>
        <p class="mini-copy">${room.size} &middot; ${room.view}</p>
      </div>
    </article>
  `;
}

function renderRooms(rooms) {
  const featuredContainer = document.querySelector("[data-featured-rooms]");
  const fullContainer = document.querySelector("[data-all-rooms]");
  if (featuredContainer) {
    featuredContainer.innerHTML = rooms.filter((room) => room.featured).map(roomTemplate).join("");
    applyPlaceholderImages(featuredContainer);
    observeReveal(featuredContainer.querySelectorAll("[data-reveal]"));
  }
  if (fullContainer) {
    fullContainer.innerHTML = rooms.map(roomTemplate).join("");
    applyPlaceholderImages(fullContainer);
    observeReveal(fullContainer.querySelectorAll("[data-reveal]"));
  }
}

Promise.all([
  get("data/rooms.json", "rooms"),
  get("data/images.json", "images")
]).then(([rooms, images]) => {
  imageLibrary = images || {};
  applyPlaceholderImages(document);
  renderRooms(rooms || []);
});
