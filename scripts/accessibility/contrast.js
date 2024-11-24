const contrastSlider = document.getElementById('contrast-slider');
const contrastValue = document.getElementById('contrast-value');
const htmlElement = document.documentElement;

contrastSlider.addEventListener('input', () => {
    const contrast = contrastSlider.value;
    contrastValue.textContent = contrast;
    htmlElement.style.filter = `contrast(${contrast}%)`;
});