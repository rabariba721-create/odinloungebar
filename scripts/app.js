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

const iconPaths = {
  food: '<path d="M7 12h10"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M5 16h14"/><path d="M7 16l1 3h8l1-3"/>',
  alcohol: '<path d="M8 3h8l-1 8a4 4 0 0 1-6 0L8 3Z"/><path d="M10 21h4"/><path d="M12 13v8"/><path d="M9 7h6"/>',
  nonalcohol: '<path d="M8 3h8l-1 18H9L8 3Z"/><path d="M9 8h6"/><path d="M10 12h4"/><path d="M16 3l2-2"/>',
  hookah: '<path d="M12 3v9"/><path d="M9 5h6"/><path d="M8 12h8"/><path d="M9 12l-2 6h10l-2-6"/><path d="M15 10c4 0 5 3 3 5"/><path d="M18 15c2 1 3 0 3-2"/>',
  snack: '<path d="M7 8h10"/><path d="M8 8l1 12h6l1-12"/><path d="M10 5h4"/><path d="M9 12h6"/><path d="M10 16h4"/>',
  cheese: '<path d="M5 15 19 7v10H5v-2Z"/><circle cx="13" cy="13" r="1"/><circle cx="16" cy="11" r="1"/><circle cx="10" cy="15" r="1"/>',
  meat: '<path d="M8 14c-2-3 1-8 5-8 3 0 5 2 5 5 0 4-5 8-8 6"/><path d="M8 14l-3 3"/><path d="M4 18l2 2"/>',
  fries: '<path d="M7 10h10l-1 10H8L7 10Z"/><path d="M9 10 8 4"/><path d="M12 10V3"/><path d="M15 10l1-6"/>',
  nuts: '<path d="M8 13c0-4 2-7 4-7s4 3 4 7-2 7-4 7-4-3-4-7Z"/><path d="M10 9c2 2 2 6 0 8"/><path d="M14 9c-2 2-2 6 0 8"/>',
  board: '<path d="M5 8c0-2 2-4 7-4s7 2 7 4v8c0 2-2 4-7 4s-7-2-7-4V8Z"/><path d="M8 10h8"/><path d="M8 14h5"/><circle cx="15" cy="15" r="1"/>',
  cocktail: '<path d="M6 4h12l-6 7-6-7Z"/><path d="M12 11v9"/><path d="M9 20h6"/><path d="M8 7h8"/>',
  lemonade: '<circle cx="12" cy="12" r="7"/><path d="M12 5v14"/><path d="M5 12h14"/><path d="m7 7 10 10"/><path d="m17 7-10 10"/>',
  water: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z"/><path d="M9 15c1 2 3 3 5 2"/>',
  coffee: '<path d="M6 8h10v6a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V8Z"/><path d="M16 10h1a2 2 0 0 1 0 4h-1"/><path d="M8 3v2"/><path d="M12 3v2"/><path d="M16 3v2"/>',
  shot: '<path d="M8 4h8l-1 16H9L8 4Z"/><path d="M9 9h6"/><path d="M10 14h4"/>',
  default: '<path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z"/><path d="M12 7v10"/><path d="M8 10l4 4 4-4"/>'
};

const makeIcon = (name) => `
  <svg class="odin-icon" viewBox="0 0 24 24" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      ${iconPaths[name] || iconPaths.default}
    </g>
  </svg>
`;

const groupIcons = {
  food: "food",
  alcohol: "alcohol",
  nonalcohol: "nonalcohol",
  hookah: "hookah"
};

const iconForItem = (item, layout, sectionId) => {
  const name = item.name.toLowerCase();
  if (sectionId === "boards") return "board";
  if (sectionId === "cocktails") return "cocktail";
  if (sectionId === "lemonades") return "lemonade";
  if (sectionId === "soft") return name.includes("вода") ? "water" : "nonalcohol";
  if (sectionId === "coffee") return "coffee";
  if (sectionId === "shots") return "shot";
  if (sectionId === "beer") return "alcohol";
  if (sectionId === "hookah") return "hookah";
  if (name.includes("сир")) return "cheese";
  if (name.includes("кабан") || name.includes("кур") || name.includes("мʼяс") || name.includes("м'яс")) return "meat";
  if (name.includes("фрі") || name.includes("чипс") || name.includes("батат")) return "fries";
  if (name.includes("арах") || name.includes("фіст")) return "nuts";
  return layout === "menuList" ? "snack" : "default";
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

const createMenuCard = (item, index, layout, sectionId) => {
  const card = document.createElement("article");
  card.className = "menu-card";
  card.style.setProperty("--accent", colorMap[item.accent] || colorMap.gold);
  card.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
  card.innerHTML = `
    <div class="menu-card__image" aria-hidden="true"></div>
    <div class="menu-card__body">
      <div class="menu-card__title">
        <span class="menu-card__icon">${makeIcon(iconForItem(item, layout, sectionId))}</span>
        <span>
          <h3>${item.name}</h3>
          ${item.meta ? `<span class="item-meta">${item.meta}</span>` : ""}
        </span>
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
      <span class="hero-menu__icon">${makeIcon(groupIcons[group.id])}</span>
      <strong>${group.label}</strong>
    </button>
  `).join("");

  heroMenu.innerHTML = html;
  nav.innerHTML = menuGroups.map((group) => `<button type="button" data-group="${group.id}">${group.label}</button>`).join("");
};

const renderSectionTabs = (group) => {
  bookTabs.innerHTML = group.sections.map((sectionId) => {
    const section = byId[sectionId];
    return `<button type="button" data-section="${section.id}">${makeIcon(section.id === "hookah" ? "hookah" : section.id === "boards" ? "board" : section.id === "cocktails" ? "cocktail" : section.id === "beer" ? "alcohol" : section.id === "lemonades" ? "lemonade" : section.id === "soft" ? "water" : section.id === "coffee" ? "coffee" : section.id === "shots" ? "shot" : "snack")}<span>${section.label}</span></button>`;
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
  section.items.forEach((item, index) => grid.appendChild(createMenuCard(item, index, section.layout, section.id)));
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
