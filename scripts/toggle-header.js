document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-header');
    const accessibilityButton = document.getElementById('toggle-accessibility-mobile');
    const nav = document.querySelector('header nav');

    // Toggle the 'active' class for both opening and closing the menu
    toggleButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Only add the 'active' class to open the menu, but do not remove it
    accessibilityButton.addEventListener('click', () => {
        nav.classList.add('active');
    });
});