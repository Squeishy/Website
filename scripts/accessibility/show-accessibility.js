document.addEventListener("DOMContentLoaded", function () {
    // Get the buttons for toggling
    const toggleMobileButton = document.getElementById("toggle-accessibility-mobile");
    const togglePCButton = document.getElementById("toggle-accessibility-pc");

    // Get the navigation elements
    const header = document.querySelector("header");
    const headerNavLinks = document.getElementById("header-navigation-links");
    const accessibilityNav = document.getElementById("accessibility-nav");

    // Set the default state: show header-nav, hide accessibility-nav
    accessibilityNav.style.display = "none";
    headerNavLinks.style.display = "flex";

    // Function to toggle the visibility of the navigation sections
    function toggleNavigation() {
        if (headerNavLinks.style.display === "flex") {
            // Hide header navigation, show accessibility navigation, and expand header
            headerNavLinks.style.display = "none";
            accessibilityNav.style.display = "block";
            header.classList.add("expand");
        } else {
            // Hide accessibility navigation, show header navigation, and reset header height
            headerNavLinks.style.display = "flex";
            accessibilityNav.style.display = "none";
            header.classList.remove("expand");
        }
    }

    // Add event listeners to both buttons
    if (toggleMobileButton) {
        toggleMobileButton.addEventListener("click", toggleNavigation);
    }

    if (togglePCButton) {
        togglePCButton.addEventListener("click", toggleNavigation);
    }
});
