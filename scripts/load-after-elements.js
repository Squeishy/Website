// Wait for header to be loaded before initializing accessibility features
document.addEventListener('headerLoaded', function() {
    // Load accessibility scripts after header is loaded
    const scripts = [
        'scripts/accessibility/show-accessibility.js',
        'scripts/accessibility/change-font-size.js',
        'scripts/accessibility/change-letter-spacing.js',
        'scripts/accessibility/change-font.js',
        'scripts/accessibility/contrast.js',
        'scripts/accessibility/cancel-animations.js',
        'scripts/accessibility/change-language.js'
    ];

    // Load scripts sequentially to ensure proper initialization
    async function loadScripts() {
        for (const src of scripts) {
            const script = document.createElement('script');
            script.src = src;
            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        }
    }

    loadScripts().catch(error => {
        console.error('Error loading accessibility scripts:', error);
    });
});

// Wait for footer to be loaded before initializing footer scripts
document.addEventListener('footerLoaded', function() {
    // Load footer scripts after footer is loaded
    const footerScript = document.createElement('script');
    footerScript.src = 'scripts/footer.js';
    document.body.appendChild(footerScript);
});