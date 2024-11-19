document.querySelectorAll('.learn-more-button').forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const moreInfoDiv = document.getElementById(targetId);

        moreInfoDiv.classList.toggle('visible');

        if (moreInfoDiv.classList.contains('visible')) {
            this.textContent = 'Hide';
        } else {
            this.textContent = 'Learn more';
        }
    });
});
