if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.getElementById('phone-message').style.display = 'block';
    document.getElementById('game-presentation').innerHTML = '';
} else {
    const path = window.location.pathname;
    let iframeSrc = '';

    switch (true) {
        case path.endsWith('tankerz-page.html'):
            iframeSrc = 'https://squeishy.github.io/TankerzWebGame/';
            break;
        case path.endsWith('xarius-page.html'):
            iframeSrc = 'https://squeishy.github.io/XariusWebGame/';
            break;
        case path.endsWith('crazy-cabs-page.html'):
            iframeSrc = 'https://lusinecanard.fr/TESTCONTROLLER/CrazyCabs/index.html';
            break;
    }

    if (iframeSrc) {
        document.getElementById('game-container').innerHTML = `<iframe src="${iframeSrc}"></iframe>`;
    }
}