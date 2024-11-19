document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".slider"); // Get all sliders
    const links = document.querySelectorAll(".slider-nav a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("data-slide");
            const targetImage = document.getElementById(targetId);

            // Find the slider corresponding to the clicked link
            const sliderWrapper = link.closest('.slider-wrapper');
            const slider = sliderWrapper.querySelector('.slider');

            // Scroll slider to the image
            slider.scrollLeft = targetImage.offsetLeft;

            // Update active link for the current slider
            const sliderLinks = sliderWrapper.querySelectorAll('.slider-nav a');
            sliderLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Set the first link as active initially for each slider
    const sliderWrappers = document.querySelectorAll('.slider-wrapper');
    sliderWrappers.forEach(wrapper => {
        const firstLink = wrapper.querySelector('.slider-nav a');
        if (firstLink) {
            firstLink.classList.add("active");
        }
    });
});