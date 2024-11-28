document.addEventListener("DOMContentLoaded", () => {
    const contrastSlider = document.getElementById("contrast-slider");
    const contrastValue = document.getElementById("contrast-value");
    const htmlElement = document.documentElement;

    if (!contrastSlider || !contrastValue) {
        console.error("Contrast slider or value display element not found.");
        return;
    }

    // Restore contrast value
    const savedContrast = localStorage.getItem("contrastValue");
    if (savedContrast) {
        contrastSlider.value = savedContrast;
        contrastValue.textContent = savedContrast;
        htmlElement.style.filter = `contrast(${savedContrast}%)`;
    } else {
        // Default value if nothing is saved
        contrastValue.textContent = contrastSlider.value;
    }

    // Update contrast in real-time
    contrastSlider.addEventListener("input", () => {
        const contrast = contrastSlider.value;
        contrastValue.textContent = contrast;
        htmlElement.style.filter = `contrast(${contrast}%)`;
    });

    // Save contrast value
    contrastSlider.addEventListener("change", () => {
        const contrast = contrastSlider.value;
        localStorage.setItem("contrastValue", contrast);
    });
});
