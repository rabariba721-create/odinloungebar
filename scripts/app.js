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
const heroMenu = document.querySelector("#hero-menu");
const loader = document.querySelector("#loader");
const menuBook = document.querySelector("#menu-book");
const menuRoot = document.querySelector("#menu-root");
const bookTabs = document.querySelector("#book-tabs");
const bookTitle = document.querySelector("#book-title");
const bookIntro = document.querySelector("#book-intro");
const bookEyebrow = document.querySelector("#book-eyebrow");
const bookClose = document.querySelector(".menu-book__close");
const sourceSections = window.ODIN_MENU_SECTIONS || [];

const hookahSection = {
  id: "hookah",
  label: "Кальян",
  eyebrow: "Smoke ritual",
  title: "Кальян",
  intro: "Кальян відкривається як окрема атмосфера всередині меню: дим, скло, метал і золоте світло ODIN.",
  layout: "hookah",
  items: [
    { name: "Подача ODIN", description: "Темна сцена з кальяном, димом і мʼяким золотим світлом.", price: "деталі в барі", accent: "gold" },
    { name: "Мікси", description: "Місце під майбутні авторські смаки, чаші та тютюн.", price: "скоро", accent: "stone" },
    { name: "Атмосфера", description: "Кальян не стоїть на головному екрані, а відкривається тільки в цій вкладці.", price: "ODIN", accent: "ember" }
  ]
};

const byId = Object.fromEntries([...sourceSections, hookahSection].map((section) => [section.id, section]));

const menuGroups = [
  {
    id: "food",
    label: "Їжа",
    eyebrow: "Kitchen",
    title: "Їжа",
    intro: "Закуски до пива та фірмові дошки для компанії у стилі темної меню-книги ODIN.",
    sections: ["snacks", "boards"]
  },
  {
    id: "alcohol",
    label: "Алкогольні напої",
    eyebrow: "Bar",
    title: "Алкогольні напої",
    intro: "Коктейлі, пиво і шоти: класика з характером ODIN і чіткою барною подачею.",
    sections: ["cocktails", "beer", "shots"]
  },
  {
    id: "nonalcohol",
    label: "Безалкогольні",
    eyebrow: "Zero proof",
    title: "Безалкогольні напої",
    intro: "Лимонади, вода, тоніки, соки та кава для легшого ритму вечора.",
    sections: ["lemonades", "soft", "coffee"]
  },
  {
    id: "hookah",
    label: "Кальян",
    eyebrow: "Smoke",
    title: "Кальян",
    intro: "Окрема кальянна сцена всередині меню, без переходу на іншу сторінку.",
    sections: ["hookah"]
  }
];

let activeGroup = "";
let activeSection = "";
let hookahStarted = false;

const cardClassFor = (layout) => {
  if (layout === "compact") return "menu-compact";
  if (layout === "shots") return "menu-shots";
  if (layout === "menuList") return "menu-editorial";
  if (layout === "showcaseList") return "menu-showcase";
  if (layout === "hookah") return "hookah-copy-grid";
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

  if (layout === "menuList" || layout === "showcaseList" || layout === "hookah") return card;

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -5;
    const rotateY = ((x / rect.width) - 0.5) * 5;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });

  return card;
};

const renderGroupButtons = () => {
  const html = menuGroups.map((group, index) => `
    <button class="hero-menu__button" type="button" data-group="${group.id}" style="--delay:${index * 65}ms">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${group.label}</strong>
    </button>
  `).join("");

  heroMenu.innerHTML = html;
  nav.innerHTML = menuGroups.map((group) => `<button type="button" data-group="${group.id}">${group.label}</button>`).join("");
};

const renderSectionTabs = (group) => {
  bookTabs.innerHTML = group.sections.map((sectionId) => {
    const section = byId[sectionId];
    return `<button type="button" data-section="${section.id}">${section.label}</button>`;
  }).join("");
};

const renderSection = (section) => {
  menuRoot.innerHTML = "";

  const page = document.createElement("article");
  page.className = `book-page book-page--${section.id}`;
  page.innerHTML = `
    <div class="book-page__background" aria-hidden="true"></div>
    ${section.layout === "hookah" ? '<div class="hookah-page-visual"><div id="hookah-scene" class="hookah-scene" aria-hidden="true"></div></div>' : ""}
    <div class="section-head">
      <div>
        <p class="section-kicker">${section.eyebrow}</p>
        <h2>${section.title}</h2>
      </div>
      <p>${section.intro}</p>
    </div>
    <div class="${cardClassFor(section.layout)}"></div>
  `;

  const grid = page.querySelector(`.${cardClassFor(section.layout)}`);
  section.items.forEach((item, index) => grid.appendChild(createMenuCard(item, index, section.layout)));
  menuRoot.appendChild(page);

  requestAnimationFrame(() => page.classList.add("is-visible"));

  if (section.id === "hookah" && !hookahStarted) {
    hookahStarted = true;
    window.initHookahScene?.(document.querySelector("#hookah-scene"));
  }
};

const setActiveSection = (sectionId) => {
  const group = menuGroups.find((candidate) => candidate.id === activeGroup);
  if (!group) return;

  activeSection = group.sections.includes(sectionId) ? sectionId : group.sections[0];
  const section = byId[activeSection];
  if (!section) return;

  body.dataset.activeSection = activeSection;
  bookTabs.querySelectorAll("[data-section]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.section === activeSection);
  });
  renderSection(section);
};

const openGroup = (groupId) => {
  const group = menuGroups.find((candidate) => candidate.id === groupId) || menuGroups[0];
  activeGroup = group.id;
  body.dataset.activeGroup = group.id;
  body.classList.add("book-open");
  bookEyebrow.textContent = group.eyebrow;
  bookTitle.textContent = group.title;
  bookIntro.textContent = group.intro;
  menuBook.classList.add("is-open");
  renderSectionTabs(group);
  setActiveSection(group.sections[0]);

  document.querySelectorAll("[data-group]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.group === group.id);
  });

  history.replaceState(null, "", `#${group.id}`);
};

const closeBook = () => {
  menuBook.classList.remove("is-open");
  body.classList.remove("book-open");
  body.removeAttribute("data-active-group");
  document.querySelectorAll("[data-group]").forEach((button) => button.classList.remove("is-active"));
  history.replaceState(null, "", "#home");
};

const setupInteractions = () => {
  document.addEventListener("click", (event) => {
    const groupButton = event.target.closest("[data-group]");
    if (groupButton) {
      openGroup(groupButton.dataset.group);
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      return;
    }

    const sectionButton = event.target.closest("[data-section]");
    if (sectionButton) {
      setActiveSection(sectionButton.dataset.section);
    }
  });

  bookClose.addEventListener("click", closeBook);

  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuBook.classList.contains("is-open")) closeBook();
  });
};

const setupReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll("[data-animate]").forEach((node) => observer.observe(node));
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

renderGroupButtons();
setupInteractions();
setupReveal();
setupLoader();

const initialGroup = location.hash.replace("#", "");
if (menuGroups.some((group) => group.id === initialGroup)) openGroup(initialGroup);
