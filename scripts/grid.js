document.addEventListener('DOMContentLoaded', () => {
    const container = document.body;

    let tileSize = window.innerWidth / (window.innerWidth > 1200 ? 30 : window.innerWidth > 780 ? 20 : 10);
    let numTilesX = Math.ceil(window.innerWidth / tileSize);
    let numTilesY = Math.ceil(window.innerHeight / tileSize);
    let tiles = [];
    const radius = 4;
    const rippleDelay = 50;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const hoverSound = new Audio('audio/hover-tile.wav');
    hoverSound.volume = 1; // Base volume

    const clickSounds = [
        new Audio('audio/click-tile.wav'),
        new Audio('audio/click-tile-2.wav')
    ];
    
    clickSounds.forEach(sound => sound.volume = 0.5);

    const source = audioContext.createMediaElementSource(hoverSound);
    const gainNode = audioContext.createGain();
    const pitchNode = audioContext.createBiquadFilter();
    
    source.connect(gainNode);
    gainNode.connect(pitchNode);
    pitchNode.connect(audioContext.destination);

    const playingSounds = new Set();
    const MAX_SIMULTANEOUS_SOUNDS = 3;

    function getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    function playRandomClickSound() {
        const randomSound = clickSounds[Math.floor(Math.random() * clickSounds.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch(error => console.log('Click sound playback failed:', error));
    }

    function playRandomizedSound() {
        const sound = new Audio('audio/hover-tile.wav');
        const soundSource = audioContext.createMediaElementSource(sound);
        const soundGain = audioContext.createGain();
        const soundPitch = audioContext.createBiquadFilter();
        
        soundSource.connect(soundGain);
        soundGain.connect(soundPitch);
        soundPitch.connect(audioContext.destination);
        
        soundGain.gain.value = getRandomValue(0.8, 1);
        soundPitch.frequency.value = getRandomValue(800, 1200);
        
        // If we've reached the maximum, stop the oldest sound
        if (playingSounds.size >= MAX_SIMULTANEOUS_SOUNDS) {
            const oldestSound = playingSounds.values().next().value;
            oldestSound.pause();
            oldestSound.currentTime = 0;
            playingSounds.delete(oldestSound);
        }
        
        // Add this sound to the set of playing sounds
        playingSounds.add(sound);
        
        // Play the sound
        sound.currentTime = 0;
        sound.play()
            .then(() => {
                // Wait for the sound to finish before removing it
                setTimeout(() => {
                    playingSounds.delete(sound);
                }, 100);
            })
            .catch(error => {
                console.log('Audio playback failed:', error);
                playingSounds.delete(sound);
            });
    }

    function createGridTiles() {
        const existingTiles = container.querySelectorAll('.grid-tile');
        existingTiles.forEach(tile => tile.remove());
        
        tiles = [];
        
        numTilesX = Math.ceil(window.innerWidth / tileSize);
        numTilesY = Math.ceil(window.innerHeight / tileSize);
        
        for (let y = 0; y < numTilesY; y++) {
            tiles[y] = [];
            for (let x = 0; x < numTilesX; x++) {
                const tile = document.createElement('div');
                tile.className = 'grid-tile';
                tile.style.left = `${x * tileSize}px`;
                tile.style.top = `${y * tileSize}px`;
                tile.style.width = `${tileSize}px`;
                tile.style.height = `${tileSize}px`;
                tile.dataset.x = x;
                tile.dataset.y = y;
                
                tile.addEventListener('mouseenter', playRandomizedSound);
                
                container.appendChild(tile);
                tiles[y][x] = tile;
            }
        }
    }

    createGridTiles();

    window.addEventListener('resize', () => {
        numTilesX = Math.ceil(window.innerWidth / tileSize);
        numTilesY = Math.ceil(window.innerHeight / tileSize);
        tileSize = window.innerWidth / (window.innerWidth > 1200 ? 30 : window.innerWidth > 780 ? 20 : 10);
        tiles = [];
        createGridTiles();
    });

    function getTilesInRadius(centerX, centerY) {
        const tilesByDistance = [];
        for (let y = 0; y < numTilesY; y++) {
            for (let x = 0; x < numTilesX; x++) {
                const dx = x - centerX;
                const dy = y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= radius) {
                    const distanceIndex = Math.floor(distance);
                    if (!tilesByDistance[distanceIndex]) {
                        tilesByDistance[distanceIndex] = [];
                    }
                    tilesByDistance[distanceIndex].push(tiles[y][x]);
                }
            }
        }
        return tilesByDistance;
    }

    container.addEventListener('click', (e) => {
        const tile = e.target.closest('.grid-tile');
        if (!tile) return;

        const x = parseInt(tile.dataset.x);
        const y = parseInt(tile.dataset.y);
        
        playRandomClickSound();
        
        const tilesByDistance = getTilesInRadius(x, y);
        
        tilesByDistance.forEach((tilesAtDistance, distance) => {
            setTimeout(() => {
                tilesAtDistance.forEach(t => {
                    t.classList.add('active');
                    setTimeout(() => {
                        t.classList.remove('active');
                    }, 100);
                });
            }, distance * rippleDelay);
        });
    });
}); 