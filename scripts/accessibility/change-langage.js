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
        console.error('Error loading or applying translations:', error);
    }
}