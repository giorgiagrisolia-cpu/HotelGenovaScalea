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

imageLibrary = fallbackData.images;
applyPlaceholderImages(document);

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
