async function TranslateText(jsonFile, context = document) {
    try {
        console.log(`Fetching translations from: ${jsonFile}`);
        const response = await fetch(jsonFile);
        const data = await response.json();
        console.log('Translation data received:', data);

        if (!data || !data.translations) {
            console.warn(`No translations found in ${jsonFile}`);
            return;
        }

        const translations = data.translations;
        const languageSelector = context.querySelector('#language-selector');
        if (!languageSelector) {
            console.error('Language selector not found in context');
            return;
        }

        const selectedLanguage = languageSelector.value;
        console.log(`Selected language: ${selectedLanguage}`);

        ['text', 'alt', 'title'].forEach((category) => {
            if (translations[category]) {
                Object.keys(translations[category]).forEach((key) => {
                    const element = context.querySelector(`#${key}`);
                    if (element) {
                        console.log(`Updating ${category} for #${key}`);
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
        console.log('Starting translation of all elements...');
        const elements = context.querySelectorAll('[data-json]');
        console.log(`Found ${elements.length} elements with data-json attribute.`);

        const languageSelector = context.querySelector('#language-selector');
        if (!languageSelector) {
            console.error('Language selector not found.');
            return;
        }
        const selectedLanguage = languageSelector.value;
        console.log(`Translating to language: ${selectedLanguage}`);

        for (const element of elements) {
            const jsonFile = element.getAttribute('data-json');
            if (jsonFile) {
                console.log(`Translating using file: ${jsonFile}`);
                await TranslateText(jsonFile, context);
            } else {
                console.error('No JSON file specified in data-json attribute for element:', element);
            }
        }
        console.log('Translation process completed.');
    } catch (error) {
        console.error('Error translating all elements:', error);
    }
}

function detectDefaultLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        console.log(`Using saved language: ${savedLanguage}`);
        return savedLanguage;
    }

    const browserLanguage = navigator.language || navigator.userLanguage;
    console.log('Detected browser language:', browserLanguage);

    if (browserLanguage.toLowerCase().includes('fr')) return 'fr';
    return 'en';
}

function initializeLanguage() {
    console.log('Initializing language selection...');
    const languageSelector = document.querySelector('#language-selector');
    if (languageSelector) {
        const initialLanguage = detectDefaultLanguage();
        console.log(`Setting initial language to: ${initialLanguage}`);
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