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

const makeProductVisual = (name) => {
  const visualMap = {
    cocktail: '<path d="M28 18h60L58 56 28 18Z" fill="url(#drinkGold)" opacity=".92"/><path d="M58 56v35" stroke="#EAD395" stroke-width="5" stroke-linecap="round"/><path d="M42 94h32" stroke="#EAD395" stroke-width="5" stroke-linecap="round"/><circle cx="73" cy="31" r="7" fill="#B65D2F"/><path d="M36 30h42" stroke="#fff" stroke-opacity=".28" stroke-width="4"/>',
    alcohol: '<path d="M42 18h34l-4 78H46L42 18Z" fill="url(#drinkAmber)" opacity=".9"/><path d="M45 48h28" stroke="#EAD395" stroke-width="4" opacity=".8"/><path d="M48 18h22" stroke="#fff" stroke-opacity=".34" stroke-width="4"/><path d="M78 18l12-10" stroke="#EAD395" stroke-width="4" stroke-linecap="round"/>',
    shot: '<path d="M38 20h40l-6 76H44L38 20Z" fill="url(#drinkAmber)" opacity=".92"/><path d="M42 52h32" stroke="#EAD395" stroke-width="4"/><path d="M45 22h28" stroke="#fff" stroke-opacity=".32" stroke-width="4"/>',
    lemonade: '<circle cx="58" cy="58" r="34" fill="url(#frostGlass)" opacity=".88"/><path d="M58 25v66M25 58h66M34 34l48 48M82 34 34 82" stroke="#EAD395" stroke-width="3" opacity=".8"/><circle cx="77" cy="31" r="9" fill="#C8A45D"/>',
    water: '<path d="M58 15s34 39 34 62a34 34 0 0 1-68 0c0-23 34-62 34-62Z" fill="url(#frostGlass)" opacity=".78"/><path d="M41 78c8 12 24 16 36 6" stroke="#fff" stroke-opacity=".36" stroke-width="5" stroke-linecap="round"/>',
    coffee: '<path d="M28 40h52v28a22 22 0 0 1-22 22h-8a22 22 0 0 1-22-22V40Z" fill="url(#coffeeCup)"/><path d="M80 48h8a12 12 0 0 1 0 24h-8" stroke="#EAD395" stroke-width="6"/><path d="M39 25c-8-9 8-12 0-20M58 25c-8-9 8-12 0-20" stroke="#fff" stroke-opacity=".34" stroke-width="4" stroke-linecap="round"/>',
    hookah: '<path d="M58 16v48" stroke="#EAD395" stroke-width="7" stroke-linecap="round"/><path d="M42 30h32M38 64h40" stroke="#C8A45D" stroke-width="6" stroke-linecap="round"/><path d="M43 66 34 96h48L73 66Z" fill="url(#smokeGold)" opacity=".88"/><path d="M72 52c34 0 30 38 12 42" stroke="#EAD395" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M84 94c16 8 26-1 26-16" stroke="#8F6E35" stroke-width="5" fill="none" stroke-linecap="round"/>',
    food: '<ellipse cx="58" cy="72" rx="42" ry="20" fill="url(#plate)" opacity=".95"/><circle cx="45" cy="63" r="10" fill="#8A5A35"/><circle cx="62" cy="58" r="12" fill="#C8A45D"/><circle cx="73" cy="70" r="9" fill="#B65D2F"/><path d="M28 76c16 13 45 15 62 0" stroke="#fff" stroke-opacity=".25" stroke-width="5"/>',
    cheese: '<path d="M24 76 92 38v44H24v-6Z" fill="url(#plate)" opacity=".95"/><circle cx="62" cy="64" r="5" fill="#090807" opacity=".4"/><circle cx="76" cy="56" r="4" fill="#090807" opacity=".4"/>',
    meat: '<path d="M36 70c-13-23 10-52 36-44 26 8 30 37 9 56-15 14-35 12-45-12Z" fill="url(#meat)" opacity=".94"/><path d="M35 72 20 90M17 94l10 10" stroke="#EAD395" stroke-width="6" stroke-linecap="round"/>',
    fries: '<path d="M34 48h48l-6 52H40L34 48Z" fill="url(#drinkGold)" opacity=".9"/><path d="M42 48 36 14M56 48V10M70 48l8-32" stroke="#EAD395" stroke-width="7" stroke-linecap="round"/>',
    nuts: '<ellipse cx="48" cy="62" rx="17" ry="30" fill="url(#plate)" transform="rotate(-18 48 62)"/><ellipse cx="70" cy="65" rx="17" ry="30" fill="url(#drinkAmber)" transform="rotate(20 70 65)"/><path d="M42 48c10 11 12 25 4 39M75 48c-9 11-11 25-3 39" stroke="#090807" stroke-opacity=".36" stroke-width="4"/>',
    board: '<rect x="24" y="30" width="68" height="58" rx="18" fill="url(#woodBoard)"/><circle cx="43" cy="55" r="10" fill="#B65D2F"/><rect x="58" y="44" width="22" height="16" rx="4" fill="#D8C6A1"/><path d="M38 74h40" stroke="#EAD395" stroke-width="5" stroke-linecap="round"/>',
    default: '<path d="M58 18 94 40v36L58 98 22 76V40l36-22Z" fill="url(#smokeGold)" opacity=".86"/><path d="M58 34v48M42 46l16 16 16-16" stroke="#EAD395" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  const visual = visualMap[name] || visualMap.default;

  return `
    <svg class="menu-card__visual" viewBox="0 0 116 116" aria-hidden="true">
      <defs>
        <linearGradient id="drinkGold" x1="20" y1="16" x2="92" y2="102"><stop stop-color="#F1D493"/><stop offset="1" stop-color="#8F6E35"/></linearGradient>
        <linearGradient id="drinkAmber" x1="24" y1="12" x2="88" y2="102"><stop stop-color="#D8A24B"/><stop offset=".55" stop-color="#7A2D17"/><stop offset="1" stop-color="#160D08"/></linearGradient>
        <linearGradient id="frostGlass" x1="20" y1="12" x2="92" y2="104"><stop stop-color="#D8F5F7"/><stop offset=".55" stop-color="#8FB8BD"/><stop offset="1" stop-color="#182426"/></linearGradient>
        <linearGradient id="coffeeCup" x1="26" y1="28" x2="90" y2="96"><stop stop-color="#D8C6A1"/><stop offset="1" stop-color="#4A321F"/></linearGradient>
        <linearGradient id="smokeGold" x1="18" y1="14" x2="98" y2="104"><stop stop-color="#EAD395"/><stop offset="1" stop-color="#2B1D14"/></linearGradient>
        <linearGradient id="plate" x1="18" y1="18" x2="98" y2="98"><stop stop-color="#EAD395"/><stop offset="1" stop-color="#8A5A35"/></linearGradient>
        <linearGradient id="meat" x1="20" y1="20" x2="96" y2="100"><stop stop-color="#C8784E"/><stop offset="1" stop-color="#40150D"/></linearGradient>
        <linearGradient id="woodBoard" x1="20" y1="20" x2="96" y2="96"><stop stop-color="#8A5A35"/><stop offset="1" stop-color="#24150D"/></linearGradient>
      </defs>
      <ellipse cx="58" cy="96" rx="34" ry="9" fill="#000" opacity=".28"/>
      ${visual}
    </svg>
  `;
};

const groupIcons = {
  food: "food",
  alcohol: "alcohol",
  nonalcohol: "nonalcohol",
  hookah: "hookah"
};

const iconForItem = (item, layout, sectionId) => {
  const name = item.name.toLowerCase();
  if (sectionId === "boards") return "board";
  if (sectionId === "cocktails" || sectionId === "signature-cocktails") return "cocktail";
  if (sectionId === "lemonades") return "lemonade";
  if (sectionId === "soft") return name.includes("вода") ? "water" : "nonalcohol";
  if (sectionId === "coffee") return "coffee";
  if (sectionId === "shots") return "shot";
  if (sectionId === "beer" || sectionId === "spirits") return "alcohol";
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
const bookEyebrow = document.querySelector("#book-eyebrow");
const bookClose = document.querySelector(".menu-book__close");
const sourceSections = window.ODIN_MENU_SECTIONS || [];

const byId = Object.fromEntries(sourceSections.map((section) => [section.id, section]));

const menuGroups = [
  {
    id: "food",
    label: "Їжа",
    eyebrow: "Kitchen",
    title: "Їжа",
    sections: ["kitchen", "snacks", "boards"]
  },
  {
    id: "alcohol",
    label: "Алкогольні напої",
    eyebrow: "Bar",
    title: "Алкогольні напої",
    sections: ["signature-cocktails", "cocktails", "shots", "spirits", "beer"]
  },
  {
    id: "nonalcohol",
    label: "Безалкогольні",
    eyebrow: "Zero proof",
    title: "Безалкогольні напої",
    sections: ["lemonades", "soft", "coffee"]
  },
  {
    id: "hookah",
    label: "Кальян",
    eyebrow: "Smoke",
    title: "Кальян",
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
  const visualType = iconForItem(item, layout, sectionId);
  const showDescription = sectionId === "boards" && Boolean(item.description);
  card.className = "menu-card";
  if (showDescription && !item.photo) card.classList.add("menu-card--description");
  card.style.setProperty("--accent", colorMap[item.accent] || colorMap.gold);
  card.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
  card.innerHTML = `
    ${item.photo ? `<img class="menu-card__photo" src="${item.photo}" alt="" loading="lazy" decoding="async">` : showDescription ? "" : '<div class="menu-card__image" aria-hidden="true"></div>'}
    <div class="menu-card__body">
      <div class="menu-card__title">
        <span class="menu-card__icon">${makeIcon(iconForItem(item, layout, sectionId))}</span>
        <span>
          <h3>${item.name}</h3>
          ${item.meta ? `<span class="item-meta">${item.meta}</span>` : ""}
        </span>
      </div>
      ${showDescription ? `<p class="menu-card__description">${item.description}</p>` : ""}
      <span class="price">${item.price}</span>
    </div>
    ${item.photo || showDescription ? "" : makeProductVisual(visualType)}
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
  const tabIcons = {
    kitchen: "food",
    snacks: "snack",
    boards: "board",
    "signature-cocktails": "cocktail",
    cocktails: "cocktail",
    shots: "shot",
    spirits: "alcohol",
    beer: "alcohol",
    soft: "water",
    lemonades: "lemonade",
    coffee: "coffee",
    hookah: "hookah"
  };

  bookTabs.innerHTML = group.sections.map((sectionId) => {
    const section = byId[sectionId];
    return `<button type="button" data-section="${section.id}">${makeIcon(tabIcons[section.id] || "default")}<span>${section.label}</span></button>`;
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
    </div>
    <div class="${cardClassFor(section.layout)}"></div>
  `;

  const grid = page.querySelector(`.${cardClassFor(section.layout)}`);
  section.items.forEach((item, index) => grid.appendChild(createMenuCard(item, index, section.layout, section.id)));
  menuRoot.appendChild(page);
  menuRoot.scrollTop = 0;

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
