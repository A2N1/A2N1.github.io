// Funktion zum Umschalten zwischen den Modi
function toggleMode() {
    // 1. Klasse auf dem Body-Element umschalten
    const body = document.body;
    body.classList.toggle('light-mode');

    // 2. Präferenz im LocalStorage speichern
    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');

    // 3. Button-Text (Emoji) aktualisieren
    updateToggleText(isLightMode);
}

// Funktion zum Aktualisieren des Button-Textes/Emojis
function updateToggleText(isLightMode) {
    const toggleButton = document.getElementById('mode-toggle');
    if (toggleButton) {
        toggleButton.textContent = isLightMode ? '🌙' : '☀️';
    }
}

// Funktion zum Laden der gespeicherten Präferenz beim Seitenstart
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Standardmäßig Dark Mode, wenn nichts gespeichert ist
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

    // Button-Text beim Start setzen
    updateToggleText(isLightMode);
}

// Event-Listener hinzufügen, nachdem das Dokument geladen ist
document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme laden, bevor alles angezeigt wird
    loadTheme();
    
    // 2. Klick-Handler für den Umschalt-Button
    const toggleButton = document.getElementById('mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMode);
    }
});