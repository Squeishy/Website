document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("dislexia-font-toggle");

    if (!toggle) {
        console.error("Toggle element not found.");
        return;
    }

    // Restore font toggle state from localStorage
    const savedState = localStorage.getItem("dyslexiaFontEnabled");
    const isDyslexiaFontEnabled = savedState === "true"; // Default to false if not set

    toggle.checked = isDyslexiaFontEnabled;
    if (isDyslexiaFontEnabled) {
        document.body.classList.add("dyslexia-font");
    } else {
        document.body.classList.remove("dyslexia-font");
    }

    // Listen for changes
    toggle.addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.add("dyslexia-font");
            localStorage.setItem("dyslexiaFontEnabled", "true");
        } else {
            document.body.classList.remove("dyslexia-font");
            localStorage.setItem("dyslexiaFontEnabled", "false");
        }
    });
});
