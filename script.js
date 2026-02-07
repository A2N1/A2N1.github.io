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
function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang-de], [data-lang-en]');
    elements.forEach(el => {
        const key = `data-lang-${lang}`;
        if (el.hasAttribute(key)) {
            const textWithNewlines = el.getAttribute(key);
            // Ersetze \n durch <br> für Zeilenumbrüche
            const textWithBreaks = textWithNewlines.replace(/\\n/g, '<br>');
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = textWithBreaks;
            } else {
                el.innerHTML = textWithBreaks; // Verwende innerHTML, um <br>-Tags zu interpretieren
            }
        }
    });

    const langIcon = document.getElementById('lang-icon');
    langIcon.textContent = lang === 'de' ? '🇩🇪' : '🇬🇧';

    const langToggleButton = document.getElementById('lang-toggle');
    langToggleButton.setAttribute('data-current-lang', lang);

    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
}


// Dark/Light Mode Logic
function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    const modeIcon = document.getElementById('mode-icon');
    modeIcon.textContent = isDarkMode ? '🌙' : '☀️';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const modeIcon = document.getElementById('mode-icon');

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (modeIcon) modeIcon.textContent = '🌙';
    } else {
        if (modeIcon) modeIcon.textContent = '☀️';
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

    // Sprachbutton-Listener
    document.getElementById('lang-toggle').addEventListener('click', () => {
        const currentLang = document.getElementById('lang-toggle').getAttribute('data-current-lang');
        const newLang = currentLang === 'de' ? 'en' : 'de';
        setLanguage(newLang);
    });

    // Dark/Light Mode-Listener
    document.getElementById('mode-toggle').addEventListener('click', toggleMode);
});
