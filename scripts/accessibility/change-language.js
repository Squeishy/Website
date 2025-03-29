async function TranslateText(jsonFile, context = document) {
    try {
        const response = await fetch(jsonFile);
        const data = await response.json();
        const translations = data.translations;

        const languageSelector = context.querySelector('#language-selector');
        const selectedLanguage = languageSelector.value;

        if (translations.text) {
            Object.keys(translations.text).forEach((key) => {
                const element = context.querySelector(`#${key}`);
                if (element) {
                    element.textContent = translations.text[key][selectedLanguage];
                }
            });
        }

        if (translations.alt) {
            Object.keys(translations.alt).forEach((key) => {
                const element = context.querySelector(`#${key}`);
                if (element) {
                    element.alt = translations.alt[key][selectedLanguage];
                }
            });
        }

        if (translations.title) {
            Object.keys(translations.title).forEach((key) => {
                const element = context.querySelector(`#${key}`);
                if (element) {
                    element.title = translations.title[key][selectedLanguage];
                }
            });
        }
    } catch (error) {
        console.error(`Error loading or applying translations for ${jsonFile}:`, error);
    }
}

async function TranslateAll(context = document) {
    try {
        const elements = context.querySelectorAll('[data-json]');
        const languageSelector = context.querySelector('#language-selector');
        if (!languageSelector) {
            console.error('Language selector not found.');
            return;
        }
        const selectedLanguage = languageSelector.value;

        for (const element of elements) {
            const jsonFile = element.getAttribute('data-json');
            if (jsonFile) {
                await TranslateText(jsonFile, context);
            } else {
                console.error('No JSON file specified in data-json attribute.');
            }
        }
    } catch (error) {
        console.error('Error translating all elements:', error);
    }
}

function detectDefaultLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) return savedLanguage;

    const browserLanguage = navigator.language || navigator.userLanguage;
    console.log('Browser Language:', browserLanguage);

    if (browserLanguage.toLowerCase().includes('fr')) return 'fr';
    return 'en';
}

function initializeLanguage() {
    const languageSelector = document.querySelector('#language-selector');
    if (languageSelector) {
        // Restore language or detect the default on first visit
        const initialLanguage = detectDefaultLanguage();
        languageSelector.value = initialLanguage;
        localStorage.setItem('selectedLanguage', initialLanguage);

        // Load all translations on page load
        TranslateAll();

        // Save selected language on change and translate
        languageSelector.addEventListener('change', () => {
            const selectedLanguage = languageSelector.value;
            localStorage.setItem('selectedLanguage', selectedLanguage);
            TranslateAll();
            console.log("Language changed to:", selectedLanguage);
        });
    }
}

// Initialize immediately
initializeLanguage();