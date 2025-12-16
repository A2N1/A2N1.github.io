// --- Sprach-Logik ---
const langToggleButton = document.getElementById('lang-toggle');

function setLanguage(lang) {
    // Finde alle Elemente, die Übersetzungen enthalten
    const elements = document.querySelectorAll('[data-lang-de], [data-lang-en]');
    
    // 1. Alle Texte aktualisieren
    elements.forEach(el => {
        const key = `data-lang-${lang}`;
        if (el.hasAttribute(key)) {
            const icon = el.querySelector('i');
            el.textContent = el.getAttribute(key);
            if (icon) {
                // Icon nur hinzufügen, wenn es vorhanden ist (z.B. GitHub, Buttons)
                el.prepend(icon); 
            }
        }
    });

    // 2. Button-Text und Attribut aktualisieren
    if (langToggleButton) {
        // Wenn die aktuelle Sprache DE ist, zeigen wir 'English' als nächsten Zustand an
        langToggleButton.textContent = lang === 'de' ? 'English' : 'Deutsch';
        langToggleButton.setAttribute('data-current-lang', lang);
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
        // Wenn es Light Mode ist, zeige den Dark Mode Toggle an
        toggleButton.textContent = isLightMode ? 'Dark Mode' : 'Light Mode';
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
    // Optionale: Prüfe die System-Präferenz
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
    // 1. Theme laden
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