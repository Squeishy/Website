document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("text-size-slider");
    const valueDisplay = document.getElementById("text-size-value");

    slider.addEventListener("input", () => {
        valueDisplay.textContent = slider.value;
    });

    slider.addEventListener("change", () => {
        document.documentElement.style.fontSize = `${slider.value}px`;
    });
});
