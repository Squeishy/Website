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
            updateActiveLink(sliderWrapper, link);
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

    // Listen for scroll events on each slider
    sliders.forEach(slider => {
        slider.addEventListener("scroll", () => {
            const sliderWrapper = slider.closest('.slider-wrapper');
            const images = slider.querySelectorAll("img");

            let activeImageIndex = 0;
            let minDifference = Infinity;

            // Find the image closest to the current scroll position
            images.forEach((image, index) => {
                const difference = Math.abs(slider.scrollLeft - image.offsetLeft);
                if (difference < minDifference) {
                    minDifference = difference;
                    activeImageIndex = index;
                }
            });

            // Update the active link based on the closest image
            const activeLink = sliderWrapper.querySelectorAll('.slider-nav a')[activeImageIndex];
            updateActiveLink(sliderWrapper, activeLink);
        });
    });

    // Function to update active link
    function updateActiveLink(wrapper, newActiveLink) {
        const sliderLinks = wrapper.querySelectorAll('.slider-nav a');
        sliderLinks.forEach(link => link.classList.remove("active"));
        if (newActiveLink) {
            newActiveLink.classList.add("active");
        }
    }
});