document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');

    const updateFooterVisibility = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;

        if (scrollableHeight <= 0 || currentScroll >= scrollableHeight - 50) {
            // Show footer when at the bottom or if no scrolling is possible
            footer.classList.remove('hidden');
            footer.classList.add('shown');
        } else {
            // Hide footer otherwise
            footer.classList.remove('shown');
            footer.classList.add('hidden');
        }
    };

    // Initial check on page load
    updateFooterVisibility();

    // Add scroll event listener
    document.addEventListener('scroll', updateFooterVisibility);
});
