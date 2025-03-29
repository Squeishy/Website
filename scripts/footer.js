function initializeFooter() {
    const footer = document.querySelector('footer');

    if (!footer) {
        console.error('Footer element not found');
        return;
    }

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

        // Always show footer if content is shorter than viewport
        if (document.documentElement.scrollHeight <= window.innerHeight) {
            footer.classList.remove('hidden');
            footer.classList.add('shown');
        }
    };

    // Initial check on page load
    updateFooterVisibility();

    // Add event listeners for scroll and resize (to handle unzoom scenarios)
    document.addEventListener('scroll', updateFooterVisibility);
    window.addEventListener('resize', updateFooterVisibility);
}

// Initialize immediately
initializeFooter();