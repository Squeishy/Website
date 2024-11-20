if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.getElementById('phone-message').style.display = 'block';
    document.getElementById('game-container').innerHTML = '';
} else {
    document.getElementById('game-container').innerHTML = '<iframe src="https://squeishy.github.io/TankerzWebGame/"></iframe>';
}