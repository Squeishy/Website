async function TranslateText(jsonFile, context = document) {
    try {
        const response = await fetch(jsonFile);
        const translations = await response.json();

        const languageSelector = context.querySelector('#language-selector');
        const selectedLanguage = languageSelector.value;

        // Update text content
        Object.keys(translations.text).forEach((key) => {
            const element = context.querySelector(`#${key}`);
            if (element) {
                element.textContent = translations.text[key][selectedLanguage];
            }
        });

        // Update alt attributes
        Object.keys(translations.alt).forEach((key) => {
            const element = context.querySelector(`#${key}`);
            if (element) {
                element.alt = translations.alt[key][selectedLanguage];
            }
        });

        // Update title attributes
        Object.keys(translations.title).forEach((key) => {
            const element = context.querySelector(`#${key}`);
            if (element) {
                element.title = translations.title[key][selectedLanguage];
            }
        });
    } catch (error) {
        console.error('Error loading or applying translations:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('#language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', () => {
            TranslateText('translations/header.json');
        });
    }
});