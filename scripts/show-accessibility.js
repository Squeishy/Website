document.addEventListener("DOMContentLoaded", function () {
    // Get the buttons for toggling
    const toggleMobileButton = document.getElementById("toggle-accessibility-mobile");
    const togglePCButton = document.getElementById("toggle-accessibility-pc");

    // Get the navigation elements
    const headerNavLinks = document.getElementById("header-navigation-links");
    const accessibilityNav = document.getElementById("accessibility-nav");

    // Set the default state: show header-nav, hide accessibility-nav
    accessibilityNav.style.display = "none";
    headerNavLinks.style.display = "flex";

    // Function to toggle the visibility of the navigation sections
    function toggleNavigation() {
        if (headerNavLinks.style.display === "flex") {
            // Hide header navigation and show accessibility navigation
            headerNavLinks.style.display = "none";
            accessibilityNav.style.display = "block";
        } else {
            // Hide accessibility navigation and show header navigation
            headerNavLinks.style.display = "flex";
            accessibilityNav.style.display = "none";
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
