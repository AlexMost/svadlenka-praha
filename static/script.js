// Header animation
const header = document.querySelector("header");
let isShadowVisible = false;
let ticking = false;

function handleScroll() {
  const scrolled = window.scrollY > 10;

  if (scrolled && !isShadowVisible) {
    header.classList.add("shadow");
    isShadowVisible = true;
  } else if (!scrolled && isShadowVisible) {
    header.classList.remove("shadow");
    isShadowVisible = false;
  }

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});

// Sidebar overlay
const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector(".hamburger-btn");
const overlay = document.querySelector(".sidebar-overlay");

const sidebarLang = document.querySelector(".sidebar-lang");
const langToggleBtn = document.querySelectorAll(".lang-btn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
});

langToggleBtn.forEach((el) => {
  el.addEventListener("click", () => {
    sidebarLang.classList.toggle("open");
    overlay.classList.toggle("active");
  });
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebarLang.classList.remove("open");
  overlay.classList.remove("active");
});

document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  });
});

// Hide expired temporary-hours notices (safety net if the site isn't rebuilt in time)
document.querySelectorAll("[data-valid-through]").forEach((el) => {
  const end = new Date(el.dataset.validThrough + "T23:59:59");
  if (Number.isNaN(end.getTime()) || new Date() <= end) return;
  el.hidden = true;
  const scope = el.parentElement;
  scope
    .querySelectorAll(".schedule-regular-caption")
    .forEach((c) => (c.hidden = true));
  scope
    .querySelectorAll(".schedule--regular")
    .forEach((r) => r.classList.remove("schedule--regular"));
});

// Cookie consent. The inline script in <head> (src/templates/consent.mjs) sets the
// Consent Mode defaults, replays a stored choice and opens the bar when there is none.
const CONSENT_KEY = "cookie-consent";
const CONSENT_DAYS = 183; // ~6 months
const CONSENT_SIGNALS = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
];
const root = document.documentElement;

function loadMap() {
  const placeholder = document.querySelector(".map-placeholder");
  if (!placeholder) return;
  const iframe = document.createElement("iframe");
  iframe.className = "map";
  iframe.src = placeholder.dataset.mapSrc;
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  placeholder.replaceWith(iframe);
}

// GA and Ads cookies set while consent was granted; dropped when it is withdrawn.
function clearGoogleCookies() {
  const domain = location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!/^_(ga|gid|gcl)/.test(name)) return;
    document.cookie = `${name}=; max-age=0; path=/`;
    document.cookie = `${name}=; max-age=0; path=/; domain=.${domain}`;
  });
}

function setConsent(value) {
  const update = {};
  CONSENT_SIGNALS.forEach((signal) => (update[signal] = value));
  gtag("consent", "update", update);
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        value,
        expires: Date.now() + CONSENT_DAYS * 24 * 60 * 60 * 1000,
      }),
    );
  } catch (e) {}
  root.dataset.consent = value;
  root.classList.remove("cookie-bar-open");
  if (value === "granted") loadMap();
  else clearGoogleCookies();
}

document.querySelectorAll("[data-consent-choice]").forEach((btn) => {
  btn.addEventListener("click", () => setConsent(btn.dataset.consentChoice));
});

document.querySelectorAll(".cookie-settings").forEach((btn) => {
  btn.addEventListener("click", () => root.classList.add("cookie-bar-open"));
});

document
  .querySelector(".map-placeholder-btn")
  ?.addEventListener("click", loadMap);

if (root.dataset.consent === "granted") loadMap();
