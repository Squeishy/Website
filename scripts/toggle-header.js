document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-header');
    const accessibilityButton = document.getElementById('toggle-accessibility-mobile');
    const nav = document.querySelector('header nav');
    
    const header = document.querySelector("header");
    const headerNavLinks = document.getElementById("header-navigation-links");
    const accessibilityNav = document.getElementById("accessibility-nav");

    // Toggle the 'active' class for both opening and closing the menu
    toggleButton.addEventListener('click', () => {
        nav.classList.toggle('active');

        if (nav.classList.contains('active')) {
            console.log("show menu");

            headerNavLinks.style.display = "flex";
            accessibilityNav.style.display = "none";
            header.classList.remove("expand");
            console.log("hide accessibility");
        }
        else
        {
            console.log("hide menu");
        }
    });
});