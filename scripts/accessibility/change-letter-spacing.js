document.addEventListener("DOMContentLoaded", () => {
    const spacingSlider = document.getElementById("line-spacing-slider");
    const spacingValueDisplay = document.getElementById("character-spacing-value");

    // Update letter-spacing in real-time as slider moves
    spacingSlider.addEventListener("input", () => {
        const spacingValue = spacingSlider.value;
        spacingValueDisplay.textContent = spacingValue;
        document.documentElement.style.letterSpacing = `${spacingValue}px`;
    });
});