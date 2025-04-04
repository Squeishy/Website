document.addEventListener("DOMContentLoaded", () => {
    // Target both the main navigation and section navigation links
    const navigationLinks = document.querySelectorAll("#navigation-links a, .section-nav a");

    navigationLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            
            const targetId = link.getAttribute("href").slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 40;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});