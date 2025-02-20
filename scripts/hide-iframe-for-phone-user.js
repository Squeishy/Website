if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.getElementById('phone-message').style.display = 'block';
    document.getElementById('game-presentation').innerHTML = '';
} else {
    if (window.location.pathname.endsWith('tankerz-page.html')) {
        document.getElementById('game-container').innerHTML = '<iframe src="https://squeishy.github.io/TankerzWebGame/"></iframe>';
    }
    else if (window.location.pathname.endsWith('xarius-page.html')) {
        document.getElementById('game-container').innerHTML = '<iframe src="https://squeishy.github.io/XariusWebGame/"></iframe>';
    }
}