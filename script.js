// Mobile Navigation Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animation for Sections
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', function() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop < window.innerHeight - sectionHeight / 4) {
            section.classList.add('show');
        }
    });
});

// Language Toggle Logic
const langToggleButton = document.getElementById('lang-toggle');

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang-de], [data-lang-en]');
    elements.forEach(el => {
        const key = `data-lang-${lang}`;
        if (el.hasAttribute(key)) {
            const icon = el.querySelector('i');
            const placeholder = el.getAttribute(key);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = placeholder;
            } else {
                el.innerHTML = placeholder;
                if (icon) el.prepend(icon);
            }
        }
    });
    langToggleButton.textContent = lang === 'de' ? 'English' : 'Deutsch';
    langToggleButton.setAttribute('data-current-lang', lang);
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
}

function toggleLanguage() {
    const currentLang = langToggleButton.getAttribute('data-current-lang') === 'de' ? 'en' : 'de';
    setLanguage(currentLang);
}

// Dark/Light Mode Logic
function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    const modeToggleButton = document.getElementById('mode-toggle');
    modeToggleButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('mode-toggle').textContent = 'Light Mode';
    }
}

function loadLanguage() {
    const savedLang = localStorage.getItem('language') || 'de';
    setLanguage(savedLang);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadLanguage();
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    document.getElementById('mode-toggle').addEventListener('click', toggleMode);
});
