document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-header');
    const nav = document.querySelector('header nav');

    toggleButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});