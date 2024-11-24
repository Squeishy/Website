document.addEventListener("DOMContentLoaded", function () {
    const toggleMobileButton = document.getElementById("toggle-accessibility-mobile");
    const togglePCButton = document.getElementById("toggle-accessibility-pc");

    const header = document.querySelector("header");
    const headerNavLinks = document.getElementById("header-navigation-links");
    const accessibilityNav = document.getElementById("accessibility-nav");

    accessibilityNav.style.display = "none";
    headerNavLinks.style.display = "flex";

    function toggleNavigation() {
        if (headerNavLinks.style.display === "flex") {
            headerNavLinks.style.display = "none";
            accessibilityNav.style.display = "block";
            header.classList.add("expand");
        } else {
            headerNavLinks.style.display = "flex";
            accessibilityNav.style.display = "none";
            header.classList.remove("expand");
        }
    }

    if (toggleMobileButton) {
        toggleMobileButton.addEventListener("click", toggleNavigation);
    }

    if (togglePCButton) {
        togglePCButton.addEventListener("click", toggleNavigation);
    }
});
