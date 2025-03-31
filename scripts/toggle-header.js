const toggleButton = document.getElementById('toggle-header');
const accessibilityButton = document.getElementById('toggle-accessibility-mobile');
const nav = document.querySelector('header nav');

const header = document.querySelector("header");
const headerNavLinks = document.getElementById("header-navigation-links");
const accessibilityNav = document.getElementById("accessibility-nav");

toggleButton.addEventListener('click', () => {
    console.log("toggleButton clicked");

    nav.classList.toggle('active');

    // Reset the menu to open navigation
    if (nav.classList.contains('active')) {
        headerNavLinks.style.display = "flex";
        accessibilityNav.style.display = "none";
        header.classList.remove("expand");
    }
});