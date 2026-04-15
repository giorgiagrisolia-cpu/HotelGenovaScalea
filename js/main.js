document.documentElement.classList.add("js");

const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-nav]");
let imageLibrary = {};

const fallbackData = {
  reviews: [
    {
      name: "Martina R.",
      rating: 5,
      source: "Google",
      text: "Posizione comodissima tra centro e mare, atmosfera familiare e una cura rara nei dettagli. Perfetto per chi cerca un soggiorno semplice ma di carattere."
    },
    {
      name: "Lars H.",
      rating: 5,
      source: "Google",
      text: "Struttura storica con un'identita' autentica. Camera silenziosa, ottima accoglienza e ristorante molto piacevole anche la sera."
    },
    {
      name: "Chiara e Paolo",
      rating: 4,
      source: "Google",
      text: "Abbiamo apprezzato la vicinanza alla spiaggia, il parcheggio privato e la facilita' di accesso. Personale gentile e disponibile."
    },
    {
      name: "Antonio G.",
      rating: 5,
      source: "Google",
      text: "Hotel storico di Scalea con un bel senso di ospitalita'. Aperitivo serale piacevole e contatto diretto molto pratico via WhatsApp."
    }
  ],
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
    "home-hero": "https://unsplash.com/photos/coastal-italian-town-with-a-beautiful-beach-ACCwzsy1_1A/download?force=true&w=1600&q=80",
    "history-lounge": "https://unsplash.com/photos/elegant-wooden-paneled-hotel-lobby-with-inviting-seating-0Kkv20z795A/download?force=true&w=1400&q=80",
    "restaurant-evening": "https://unsplash.com/photos/modern-restaurant-interior-seen-through-glass-doors-at-night-RucMtKnJDr8/download?force=true&w=1400&q=80",
    "breakfast-terrace": "https://unsplash.com/photos/a-table-filled-with-various-breakfast-dishes-and-drinks-QBlBRC29qTE/download?force=true&w=1400&q=80",
    "coast-view": "https://unsplash.com/photos/coastal-city-with-beach-and-blue-sea-qQyXrhHwz5A/download?force=true&w=1400&q=80",
    "coast-view-alt": "https://unsplash.com/photos/rocky-coastline-meets-the-calm-blue-ocean-r3zZ7fNNSfg/download?force=true&w=1400&q=80",
    "room-standard": "https://unsplash.com/photos/a-hotel-room-with-a-bed-and-television-1b6fWdOEMM8/download?force=true&w=1400&q=80",
    "room-superior": "https://unsplash.com/photos/a-modern-hotel-room-with-a-bed-and-bathroom-thb9M2F4QTs/download?force=true&w=1400&q=80",
    "room-family": "https://unsplash.com/photos/a-cozy-hotel-room-with-two-beds-yNfJFVqxyi8/download?force=true&w=1400&q=80",
    "room-details": "https://unsplash.com/photos/a-modern-and-elegant-hotel-lobby-cAzgaiABdY4/download?force=true&w=1400&q=80",
    "restaurant-gallery": "https://unsplash.com/photos/restaurant-interior-seen-through-windows-at-night-2c0yp-PhSOk/download?force=true&w=1400&q=80",
    "restaurant-bar": "https://unsplash.com/photos/a-restaurant-entrance-is-lit-up-at-night-q2yQJkW8rlU/download?force=true&w=1400&q=80"
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

function renderStars(rating) {
  return "&#9733;".repeat(rating) + "&#9734;".repeat(5 - rating);
}

function renderReviews(reviews) {
  const container = document.querySelector("[data-reviews]");
  if (!container) return;
  container.innerHTML = reviews
    .map(
      (review) => `
        <article class="review-card" data-reveal>
          <strong>${review.name}</strong>
          <div class="review-card__stars" aria-label="${review.rating} stelle su 5">${renderStars(review.rating)}</div>
          <p>${review.text}</p>
          <p class="mini-copy">${review.source}</p>
        </article>
      `
    )
    .join("");
  observeReveal(container.querySelectorAll("[data-reveal]"));
}

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
  get("data/reviews.json", "reviews"),
  get("data/rooms.json", "rooms"),
  get("data/images.json", "images")
]).then(([reviews, rooms, images]) => {
  imageLibrary = images || {};
  applyPlaceholderImages(document);
  renderReviews(reviews || []);
  renderRooms(rooms || []);
});
