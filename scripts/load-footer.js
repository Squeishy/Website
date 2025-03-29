const footerLoadedEvent = new CustomEvent('footerLoaded');

async function loadFooter() {
    try {
        const response = await fetch('/footer.html');
        const footerHtml = await response.text();

        document.body.insertAdjacentHTML('beforeend', footerHtml);
        document.dispatchEvent(footerLoadedEvent);
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadFooter); 