function initializeAccessibility() {
    const toggleMobileButton = document.getElementById("toggle-accessibility-mobile");
    const togglePCButton = document.getElementById("toggle-accessibility-pc");

    const nav = document.querySelector('header nav');

    const header = document.querySelector("header");
    const headerNav = document.getElementById("header-navigation");
    const headerNavLinks = document.getElementById("header-navigation-links");
    const accessibilityNav = document.getElementById("accessibility-nav");
    
    if (!accessibilityNav || !headerNavLinks) return;
    
    accessibilityNav.style.display = "none";
    headerNavLinks.style.display = "flex";

    function toggleNavigation() {
        // This make sure that if the menu is hidden and the last opened tab was accessibility, the menu to open is still the accessibility
        if(!nav.classList.contains('active'))
        {
            nav.classList.add('active');
            headerNavLinks.style.display = "flex";
            accessibilityNav.style.display = "none";
            header.classList.remove("expand");
        }

        // Pretty sure there is a way to optimize this but my website is behaving weirdly when I do, so I guess that I can let it like that xddd
        if (headerNavLinks.style.display === "flex") {
            
            headerNavLinks.style.display = "none";
            accessibilityNav.style.display = "block";
            header.classList.add("expand");
        }
        else
        {
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
}

// Initialize immediately
initializeAccessibility();