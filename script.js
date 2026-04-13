document.documentElement.classList.add("js");

const WHATSAPP_NUMBER = "919003348812";

function whatsappUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function openWhatsApp(text) {
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
}

const tourPackages = [
  {
    name: "Ooty Tour",
    description: "Classic Nilgiri sightseeing with gardens, viewpoints, and lake time.",
    duration: "1 Day",
    group: "Up to 7",
    image: "ooty-trip.jpg"
  },
  {
    name: "Coonoor Tour",
    description: "Tea estates, viewpoints, and the charm of the quieter hill station.",
    duration: "1 Day",
    group: "Up to 7",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Pykara Tour",
    description: "Forests, lake views, and waterfalls on a relaxed scenic route.",
    duration: "1 Day",
    group: "Up to 7",
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Avalanche Tour",
    description: "Forest roads, reservoir views, and nature-focused day trips.",
    duration: "1 Day",
    group: "Up to 7",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Pykara & Mudumalai",
    description: "Combine Pykara highlights with wildlife and forest safari options.",
    duration: "1–2 Days",
    group: "Up to 7",
    image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=900&q=80"
  }
];

const placesDetails = {
  Ooty: [
    "Doddabetta Peak",
    "Tea Museum",
    "Chocolate Factory",
    "Wax Museum",
    "Botanical Garden",
    "Ooty Lake",
    "Rose Garden",
    "Thread Garden"
  ],
  Coonoor: [
    "Valley View Point",
    "MRC (Outside View)",
    "SIM's Park",
    "Lamb's Rock",
    "Dolphin Nose",
    "Tea Garden",
    "Oil Factory",
    "Strawberry Farm"
  ],
  Pykara: [
    "Pine Forest",
    "Tree Park",
    "9th Mile Shooting Spot",
    "Pykara Lake",
    "Pykara Waterfalls",
    "Chocolate Museum"
  ],
  Avalanche: [
    "Avalanche Safari",
    "Tribal Museum",
    "Karnataka Garden",
    "Cairnhill Forest",
    "Museum"
  ]
};

const placeFeatureImages = {
  Ooty: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=80",
  Coonoor: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
  Pykara: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1000&q=80",
  Avalanche: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80"
};

const tabOrder = ["Ooty", "Coonoor", "Pykara", "Avalanche"];

const packageGrid = document.getElementById("packageGrid");
const placesTabs = document.getElementById("placesTabs");
const placesFeatureImg = document.getElementById("placesFeatureImg");
const placesFeatureLabel = document.getElementById("placesFeatureLabel");
const placesFeatureSub = document.getElementById("placesFeatureSub");
const placesSpots = document.getElementById("placesSpots");
const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const placesBookLink = document.getElementById("placesBookLink");

let activePlace = tabOrder[0];

tourPackages.forEach((tour) => {
  const bookText = `Hello, I would like to book ${tour.name} with Ooty Travel Solution.`;
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-media">
      <img src="${tour.image}" alt="${tour.name}">
      <span class="card-media-title">${tour.name}</span>
    </div>
    <div class="card-body">
      <p class="card-desc">${tour.description}</p>
      <div class="card-stats">
        <span><i class="fa-regular fa-clock"></i> ${tour.duration}</span>
        <span><i class="fa-solid fa-user-group"></i> ${tour.group}</span>
      </div>
      <a href="${whatsappUrl(bookText)}" class="btn btn-block" target="_blank" rel="noopener noreferrer">Book Now</a>
    </div>
  `;
  card.addEventListener("click", (event) => {
    if (!event.target.closest("a")) {
      openWhatsApp(bookText);
    }
  });
  packageGrid.appendChild(card);
});

function renderPlaces(destination) {
  const spots = placesDetails[destination] || [];
  placesFeatureImg.src = placeFeatureImages[destination] || placeFeatureImages.Ooty;
  placesFeatureImg.alt = `${destination} highlights`;
  placesFeatureLabel.textContent = destination;
  if (placesFeatureSub) {
    placesFeatureSub.textContent = spots[0] ? `Featured: ${spots[0]}` : "Top attractions";
  }
  placesSpots.innerHTML = spots
    .map(
      (spot, i) =>
        `<div class="spot-item" style="--spot-i: ${i}"><i class="fa-solid fa-location-dot"></i><span>${spot}</span></div>`
    )
    .join("");
}

function setActiveTab(destination) {
  activePlace = destination;
  placesTabs.querySelectorAll(".places-tab").forEach((btn) => {
    const isActive = btn.dataset.place === destination;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  renderPlaces(destination);
  if (placesBookLink) {
    const bookVisitText = `Hello, I want to book a sightseeing tour for ${destination} with Ooty Travel Solution.`;
    placesBookLink.href = whatsappUrl(bookVisitText);
  }
}

tabOrder.forEach((name, index) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `places-tab${index === 0 ? " active" : ""}`;
  btn.dataset.place = name;
  btn.setAttribute("role", "tab");
  btn.setAttribute("aria-selected", index === 0 ? "true" : "false");
  btn.id = `tab-${name}`;
  btn.textContent = name;
  btn.addEventListener("click", () => setActiveTab(name));
  placesTabs.appendChild(btn);
});

setActiveTab(activePlace);

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const text = [
    "Hello Ooty Travel Solution,",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    "",
    "Message:",
    message
  ].join("\n");
  openWhatsApp(text);
  formNote.textContent = "";
  contactForm.reset();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function setPageLoaded() {
  requestAnimationFrame(() => document.body.classList.add("page-loaded"));
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setPageLoaded);
} else {
  setPageLoaded();
}

const packagesSection = document.getElementById("packages");
const packagesRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        packageGrid.classList.add("is-revealed");
        packagesRevealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
if (packagesSection) {
  packagesRevealObserver.observe(packagesSection);
}
