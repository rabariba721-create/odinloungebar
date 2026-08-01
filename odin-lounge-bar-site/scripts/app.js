const colorMap = {
  gold: "#c8a45d",
  ember: "#b65d2f",
  stone: "#7d817d",
  wood: "#8a5a35",
  frost: "#8fb8bd",
  berry: "#9b4253",
  cream: "#d8c6a1",
  salmon: "#d88971"
};

const root = document.documentElement;
const body = document.body;
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const menuRoot = document.querySelector("#menu-root");
const categoryTabs = document.querySelector("#category-tabs");
const loader = document.querySelector("#loader");
const menuSections = window.ODIN_MENU_SECTIONS || [];
const navItems = window.ODIN_NAV_ITEMS || [];

const cardClassFor = (layout) => {
  if (layout === "featured") return "menu-featured";
  if (layout === "compact") return "menu-compact";
  if (layout === "shots") return "menu-shots";
  if (layout === "menuList") return "menu-editorial";
  if (layout === "showcaseList") return "menu-showcase";
  return "menu-grid";
};

const createMenuCard = (item, index, layout) => {
  const card = document.createElement("article");
  card.className = "menu-card";
  card.style.setProperty("--accent", colorMap[item.accent] || colorMap.gold);
  card.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
  card.innerHTML = `
    <div class="menu-card__image" aria-hidden="true"></div>
    <div class="menu-card__body">
      <div>
        <h3>${item.name}</h3>
        ${item.meta ? `<span class="item-meta">${item.meta}</span>` : ""}
      </div>
      <p>${item.description}</p>
      <span class="price">${item.price}</span>
    </div>
  `;

  if (layout === "menuList" || layout === "showcaseList") {
    return card;
  }

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -7;
    const rotateY = ((x / rect.width) - 0.5) * 7;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });

  return card;
};

const renderNavigation = () => {
  nav.innerHTML = navItems.map((item) => `<a href="#${item.id}">${item.label}</a>`).join("");
};

const renderCategoryTabs = () => {
  if (!categoryTabs) return;
  categoryTabs.innerHTML = menuSections.map((section, index) => `
    <a href="#${section.id}" class="menu-tab" style="--delay:${index * 45}ms">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${section.label}</strong>
    </a>
  `).join("");
};

const renderMenu = () => {
  const fragment = document.createDocumentFragment();

  menuSections.forEach((section) => {
    const sectionEl = document.createElement("section");
    sectionEl.className = "section menu-section";
    sectionEl.id = section.id;
    sectionEl.innerHTML = `
      <div class="section-head" data-animate>
        <div>
          <p class="section-kicker">${section.eyebrow}</p>
          <h2>${section.title}</h2>
        </div>
        <p>${section.intro}</p>
      </div>
      <div class="${cardClassFor(section.layout)}"></div>
    `;

    const grid = sectionEl.querySelector(`.${cardClassFor(section.layout)}`);
    section.items.forEach((item, index) => grid.appendChild(createMenuCard(item, index, section.layout)));
    fragment.appendChild(sectionEl);
  });

  menuRoot.appendChild(fragment);
};

const setupReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll("[data-animate], .menu-card").forEach((node) => observer.observe(node));
};

const setupActiveNav = () => {
  const links = [...nav.querySelectorAll("a")];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const active = links.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
      if (entry.isIntersecting && active) {
        links.forEach((link) => link.classList.remove("is-active"));
        active.classList.add("is-active");
      }
    });
  }, { rootMargin: "-38% 0px -54% 0px", threshold: 0 });

  sections.forEach((section) => observer.observe(section));
};

const setupNavigation = () => {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
};

const setupLoader = () => {
  window.addEventListener("load", () => {
    window.setTimeout(() => loader.classList.add("is-hidden"), 850);
  });
};

const setViewportHeight = () => {
  root.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
};

setViewportHeight();
window.addEventListener("resize", setViewportHeight, { passive: true });

renderNavigation();
renderCategoryTabs();
renderMenu();
setupNavigation();
setupReveal();
setupActiveNav();
setupLoader();
window.initHookahScene?.(document.querySelector("#hookah-scene"));
