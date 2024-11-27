document.addEventListener("DOMContentLoaded", function () {
    const toggleMobileButton = document.getElementById("toggle-accessibility-mobile");
    const togglePCButton = document.getElementById("toggle-accessibility-pc");

    const nav = document.querySelector('header nav');

    const header = document.querySelector("header");
    const headerNav = document.getElementById("header-navigation");
    const headerNavLinks = document.getElementById("header-navigation-links");
    const accessibilityNav = document.getElementById("accessibility-nav");
    

    accessibilityNav.style.display = "none";
    headerNavLinks.style.display = "flex";

    function toggleNavigation() {
        if (headerNavLinks.style.display === "flex" || headerNav.classList.contains("expand")) {
            headerNavLinks.style.display = "none";
            accessibilityNav.style.display = "block";
            header.classList.add("expand");
            console.log("show accessibility");
        }
        else
        {
            headerNavLinks.style.display = "flex";
            accessibilityNav.style.display = "none";
            header.classList.remove("expand");
            console.log("header has expand");
        }
    }

    if (toggleMobileButton) {
        toggleMobileButton.addEventListener("click", toggleNavigation);
    }

    if (togglePCButton) {
        togglePCButton.addEventListener("click", toggleNavigation);
    }
});