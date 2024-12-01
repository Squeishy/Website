const buttonText = {
    en: {
        show: "Learn more",
        hide: "Hide"
    },
    fr: {
        show: "En savoir plus",
        hide: "Cacher"
    },
    es: {
        show: "Saber más",
        hide: "Ocultar"
    },
};

document.querySelectorAll('.learn-more-button').forEach(button => {
    button.dataset.open = "false"; // Track whether the tab is open or closed

    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const moreInfoDiv = document.getElementById(targetId);

        moreInfoDiv.classList.toggle('visible');
        const isVisible = moreInfoDiv.classList.contains('visible');

        // Update the button's state
        this.dataset.open = isVisible ? "true" : "false";

        // Get the selected language and update the button text
        const selectedLanguage = detectDefaultLanguage();
        const text = buttonText[selectedLanguage] || buttonText.en;

        this.textContent = isVisible ? text.hide : text.show;
    });
});

function detectDefaultLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) return savedLanguage;

    const browserLanguage = navigator.language || navigator.userLanguage;
    console.log('Browser Language:', browserLanguage);

    const languageCode = browserLanguage.split('-')[0].toLowerCase();
    return languageCode in buttonText ? languageCode : 'en';
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('#language-selector');
    if (languageSelector) {
        // Restore language or detect the default on first visit
        const initialLanguage = detectDefaultLanguage();
        languageSelector.value = initialLanguage;
        localStorage.setItem('selectedLanguage', initialLanguage);

        // Translate all buttons on page load
        translateAllButtons();

        // Save selected language on change and translate
        languageSelector.addEventListener('change', () => {
            const selectedLanguage = languageSelector.value;
            localStorage.setItem('selectedLanguage', selectedLanguage);
            translateAllButtons();
            console.log("Language changed to:", selectedLanguage);
        });
    }
});

function translateAllButtons() {
    const selectedLanguage = detectDefaultLanguage();
    const text = buttonText[selectedLanguage] || buttonText.en;

    document.querySelectorAll('.learn-more-button').forEach(button => {
        const isOpen = button.dataset.open === "true";

        // Update the button text based on its current state
        button.textContent = isOpen ? text.hide : text.show;
    });
}