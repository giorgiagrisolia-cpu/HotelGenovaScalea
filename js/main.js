const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-nav]");

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

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Errore nel caricamento di ${path}`);
  return response.json();
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
      <img src="${room.image}" alt="${room.name}" loading="lazy" width="1200" height="900">
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
    observeReveal(featuredContainer.querySelectorAll("[data-reveal]"));
  }
  if (fullContainer) {
    fullContainer.innerHTML = rooms.map(roomTemplate).join("");
    observeReveal(fullContainer.querySelectorAll("[data-reveal]"));
  }
}

Promise.allSettled([loadJson("data/reviews.json"), loadJson("data/rooms.json")]).then((results) => {
  const [reviewsResult, roomsResult] = results;
  if (reviewsResult.status === "fulfilled") renderReviews(reviewsResult.value);
  if (roomsResult.status === "fulfilled") renderRooms(roomsResult.value);
});
