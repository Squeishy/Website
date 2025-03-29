const headerLoadedEvent = new CustomEvent('headerLoaded');

function setActiveLink() {
    const currentPath = window.location.pathname;
    
    const navLinks = document.querySelectorAll('#header-navigation-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
}

async function loadHeader() {
    try {
        const response = await fetch('/header.html');
        const headerHtml = await response.text();

        document.body.insertAdjacentHTML('afterbegin', headerHtml);
        // Set active link after header is loaded
        setActiveLink();
        document.dispatchEvent(headerLoadedEvent);
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeader); 