function initializeFontSize() {
    const slider = document.getElementById("text-size-slider");
    const valueDisplay = document.getElementById("text-size-value");

    if (!slider || !valueDisplay) {
        console.error("Slider or value display element not found.");
        return;
    }

    // Restore text size from localStorage
    const savedFontSize = localStorage.getItem("textSize");
    if (savedFontSize) {
        slider.value = savedFontSize;
        valueDisplay.textContent = savedFontSize;
        document.documentElement.style.fontSize = `${savedFontSize}px`;
    } else {
        // Default value if nothing is saved
        valueDisplay.textContent = slider.value;
    }

    // Update value on slider input
    slider.addEventListener("input", () => {
        valueDisplay.textContent = slider.value;
    });

    // Update text size and save
    slider.addEventListener("change", () => {
        const newFontSize = slider.value;
        document.documentElement.style.fontSize = `${newFontSize}px`;
        localStorage.setItem("textSize", newFontSize);
    });
}

// Initialize immediately
initializeFontSize();
