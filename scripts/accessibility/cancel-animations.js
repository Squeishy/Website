function initializeAnimationToggle() {
    const toggle = document.getElementById('animation-toggle');

    if (!toggle) {
        console.error('Toggle element not found');
        return;
    }

    // Restore state from localStorage
    const savedState = localStorage.getItem('animationToggleState');
    const isAnimationsEnabled = savedState !== 'false'; // Default to true if not set

    toggle.checked = isAnimationsEnabled;

    // apply saved state
    if (isAnimationsEnabled) {
        const existingStylesheet = document.getElementById('disable-animations-stylesheet');
        if (existingStylesheet) {
            existingStylesheet.remove();
        }
    } else {
        addDisableAnimationsStylesheet();
    }

    // Listen for changes
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            // Enable animations
            const stylesheet = document.getElementById('disable-animations-stylesheet');
            if (stylesheet) stylesheet.remove();
            localStorage.setItem('animationToggleState', 'true');
        } else {
            // Disable animations
            addDisableAnimationsStylesheet();
            localStorage.setItem('animationToggleState', 'false');
        }
    });
}

// function to add the disable animations stylesheet
function addDisableAnimationsStylesheet() {
    const existingStylesheet = document.getElementById('disable-animations-stylesheet');
    if (!existingStylesheet) {
        const newStylesheet = document.createElement('link');
        newStylesheet.rel = 'stylesheet';
        newStylesheet.id = 'disable-animations-stylesheet';
        newStylesheet.href = 'styles/accessibility/disable-animations.css';
        document.head.appendChild(newStylesheet);
    }
}

// Initialize immediately
initializeAnimationToggle();