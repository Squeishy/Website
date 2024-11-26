async function TranslateText(jsonFile, context = document) {
    try {
        const response = await fetch(jsonFile);
        const data = await response.json();
        const translations = data.translations; // Access the nested 'translations' object

        const languageSelector = context.querySelector('#language-selector');
        const selectedLanguage = languageSelector.value;

        // Safely update text content
        if (translations.text) {
            Object.keys(translations.text).forEach((key) => {
                const element = context.querySelector(`#${key}`);
                if (element) {
                    element.textContent = translations.text[key][selectedLanguage];
                }
            });
        }

        // Safely update alt attributes
        if (translations.alt) {
            Object.keys(translations.alt).forEach((key) => {
                const element = context.querySelector(`#${key}`);
                if (element) {
                    element.alt = translations.alt[key][selectedLanguage];
                }
            });
        }

        // Safely update title attributes
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

        // Loop through all elements with data-json and fetch their respective JSON files
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

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('#language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', () => {
            TranslateAll();
            console.log("Language changed to:", languageSelector.value);
        });

        // Load all translations on page load
        TranslateAll();
    }
});