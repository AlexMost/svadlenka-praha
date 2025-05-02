// Header animation
(() => {
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
})();
