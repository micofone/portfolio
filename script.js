const toggleButton = document.getElementById('theme-toggle');
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
const body = document.body;

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        if (toggleButton) toggleButton.setAttribute('aria-pressed', 'true');
    } else {
        body.classList.remove('dark');
        if (toggleButton) toggleButton.setAttribute('aria-pressed', 'false');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme');
    applyTheme(saved || 'light');

    // Scroll reveal for sections
    const revealEls = document.querySelectorAll('.reveal-on-scroll');

    if (!('IntersectionObserver' in window) || revealEls.length === 0) {
        revealEls.forEach(el => el.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
});

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark');
        toggleButton.setAttribute('aria-pressed', String(isDark));
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        navToggle.classList.toggle('open');
    });
}
