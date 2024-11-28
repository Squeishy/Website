document.addEventListener("DOMContentLoaded", () => {
    const spacingSlider = document.getElementById("line-spacing-slider");
    const spacingValueDisplay = document.getElementById("character-spacing-value");

    if (!spacingSlider || !spacingValueDisplay) {
        console.error("Slider or value display element not found.");
        return;
    }

    // Restore the letter-spacing value
    const savedSpacingValue = localStorage.getItem("letterSpacing");
    if (savedSpacingValue) {
        spacingSlider.value = savedSpacingValue;
        spacingValueDisplay.textContent = savedSpacingValue;
        document.documentElement.style.letterSpacing = `${savedSpacingValue}px`;
    } else {
        // Default to the slider's initial value
        spacingValueDisplay.textContent = spacingSlider.value;
    }

    // Update letter-spacing
    spacingSlider.addEventListener("input", () => {
        const spacingValue = spacingSlider.value;
        spacingValueDisplay.textContent = spacingValue;
        document.documentElement.style.letterSpacing = `${spacingValue}px`;
    });

    // Save the letter-spacing value
    spacingSlider.addEventListener("change", () => {
        const spacingValue = spacingSlider.value;
        localStorage.setItem("letterSpacing", spacingValue);
    });
});
