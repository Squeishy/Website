document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('animation-toggle');

    if (!toggle) {
        console.error('Toggle element not found');
        return;
    }

    // Set the default state of the toggle to true (checked)
    toggle.checked = true;

    // Ensure animations are enabled by default by removing any existing disable stylesheet
    const existingStylesheet = document.getElementById('disable-animations-stylesheet');
    if (existingStylesheet) {
        existingStylesheet.remove();
    }

    toggle.addEventListener('change', () => {
        const stylesheet = document.getElementById('disable-animations-stylesheet');

        if (toggle.checked) {
            // Enable animations by removing the stylesheet
            if (stylesheet) stylesheet.remove();
        } else {
            // Disable animations by adding the stylesheet
            if (!stylesheet) {
                const newStylesheet = document.createElement('link');
                newStylesheet.rel = 'stylesheet';
                newStylesheet.id = 'disable-animations-stylesheet';
                newStylesheet.href = 'styles/accessibility/disable-animations.css';
                document.head.appendChild(newStylesheet);
            }
        }
    });
});