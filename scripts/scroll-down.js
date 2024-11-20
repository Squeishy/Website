document.addEventListener("DOMContentLoaded", () => {
    const navigationLinks = document.querySelectorAll("#navigation-links a");

    navigationLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            
            const targetId = link.getAttribute("href").slice(1); // Get the ID without the "#"
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offset = 100; // Adjust this value to make the endpoint higher
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