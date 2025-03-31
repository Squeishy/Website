async function TranslateText(jsonFile, context = document) {
    try {
        const response = await fetch(jsonFile);
        const data = await response.json();

        if (!data || !data.translations) {
            return;
        }

        const translations = data.translations;
        const languageSelector = context.querySelector('#language-selector');
        if (!languageSelector) {
            return;
        }

        const selectedLanguage = languageSelector.value;

        ['text', 'alt', 'title'].forEach((category) => {
            if (translations[category]) {
                Object.keys(translations[category]).forEach((key) => {
                    const element = context.querySelector(`#${key}`);
                    if (element) {
                        if (category === 'text') {
                            element.textContent = translations[category][key][selectedLanguage] || 'MISSING TEXT';
                        } else {
                            element[category] = translations[category][key][selectedLanguage] || 'MISSING VALUE';
                        }
                    } else {
                        console.warn(`Element with ID #${key} not found in context.`);
                    }
                });
            }
        });
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
                console.error('No JSON file specified in data-json attribute for element:', element);
            }
        }
    } catch (error) {
        console.error('Error translating all elements:', error);
    }
}

function detectDefaultLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        return savedLanguage;
    }

    const browserLanguage = navigator.language || navigator.userLanguage;

    if (browserLanguage.toLowerCase().includes('fr')) return 'fr';
    return 'en';
}

function initializeLanguage() {
    const languageSelector = document.querySelector('#language-selector');
    if (languageSelector) {
        const initialLanguage = detectDefaultLanguage();
        languageSelector.value = initialLanguage;
        localStorage.setItem('selectedLanguage', initialLanguage);

        TranslateAll();

        languageSelector.addEventListener('change', () => {
            const selectedLanguage = languageSelector.value;
            console.log(`Language changed to: ${selectedLanguage}`);
            localStorage.setItem('selectedLanguage', selectedLanguage);
            TranslateAll();
        });
    } else {
        console.error('Language selector not found in the document.');
    }
}

// Initialize immediately
initializeLanguage();