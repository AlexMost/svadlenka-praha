// Header animation
const header = document.querySelector('header');
let isShadowVisible = false;
let ticking = false;

function handleScroll() {
    const scrolled = window.scrollY > 10;

    if (scrolled && !isShadowVisible) {
        header.classList.add('shadow');
        isShadowVisible = true;
    } else if (!scrolled && isShadowVisible) {
        header.classList.remove('shadow');
        isShadowVisible = false;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

// Sidebar overlay
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.hamburger-btn');
const overlay = document.querySelector('.sidebar-overlay');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});

document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });
});
