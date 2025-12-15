// --- Sprach-Logik ---
const langToggleButton = document.getElementById('lang-toggle');

function setLanguage(lang) {
    // Finde alle Elemente, die Übersetzungen enthalten
    const elements = document.querySelectorAll('[data-lang-de], [data-lang-en]');
    
    // 1. Alle Texte aktualisieren
    elements.forEach(el => {
        const key = `data-lang-${lang}`;
        // Prüfen, ob das Element ein Attribut für die Zielsprache hat
        if (el.hasAttribute(key)) {
            // Spezieller Umgang mit Links und Buttons, damit href nicht überschrieben wird
            if (el.tagName === 'A' || el.tagName === 'BUTTON') {
                el.textContent = el.getAttribute(key);
            } else {
                // Bei normalen Text-Elementen wie H, P oder DIV
                el.textContent = el.getAttribute(key);
            }
        }
    });

    // 2. Button-Text und Attribut aktualisieren
    if (langToggleButton) {
        langToggleButton.textContent = lang === 'de' ? 'EN' : 'DE';
        langToggleButton.setAttribute('data-current-lang', lang);
        // Auch das HTML-Lang-Attribut setzen
        document.documentElement.lang = lang;
    }

    // 3. Sprache im LocalStorage speichern
    localStorage.setItem('language', lang);
}

function toggleLanguage() {
    const currentLang = langToggleButton.getAttribute('data-current-lang') === 'de' ? 'en' : 'de';
    setLanguage(currentLang);
}

// --- Dark/Light Mode Logik ---
function updateToggleText(isLightMode) {
    const toggleButton = document.getElementById('mode-toggle');
    if (toggleButton) {
        // Im Light Mode zeige den Mond (🌙), im Dark Mode die Sonne (☀️)
        toggleButton.textContent = isLightMode ? '🌙' : '☀️';
    }
}

function toggleMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateToggleText(isLightMode);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    let isLightMode = false;
    
    if (savedTheme === 'light') {
        isLightMode = true;
    } 
    // Optionale: Prüfe die System-Präferenz, falls kein Theme gespeichert ist
    else if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        isLightMode = true;
    }

    if (isLightMode) {
        document.body.classList.add('light-mode');
    }
    updateToggleText(isLightMode);
}

// --- Initialisierung ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme laden (muss zuerst passieren, um FOUC zu vermeiden)
    loadTheme();
    
    // 2. Gespeicherte Sprache laden oder Standard setzen
    const savedLang = localStorage.getItem('language') || 'de';
    setLanguage(savedLang);

    // 3. Event-Listener
    const modeToggleButton = document.getElementById('mode-toggle');
    if (modeToggleButton) {
        modeToggleButton.addEventListener('click', toggleMode);
    }
    
    if (langToggleButton) {
        langToggleButton.addEventListener('click', toggleLanguage);
    }
});