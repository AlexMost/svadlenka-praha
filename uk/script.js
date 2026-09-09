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
