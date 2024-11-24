document.getElementById('dislexia-font-toggle').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dyslexia-font');
    } else {
        document.body.classList.remove('dyslexia-font');
    }
});