document.addEventListener('DOMContentLoaded', () => {
    const container = document.body;
    const tileSize = window.innerWidth / 30;
    let numTilesX = Math.ceil(window.innerWidth / tileSize);
    let numTilesY = Math.ceil(window.innerHeight / tileSize);
    let tiles = [];
    const radius = 4;
    const rippleDelay = 50;

    // Create audio context and source
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const hoverSound = new Audio('audio/hover-tile.wav');
    hoverSound.volume = 1; // Base volume

    // Create click sounds
    const clickSounds = [
        new Audio('audio/click-tile.wav'),
        new Audio('audio/click-tile-2.wav')
    ];
    clickSounds.forEach(sound => sound.volume = 0.5);

    // Create a single source and nodes that we'll reuse
    const source = audioContext.createMediaElementSource(hoverSound);
    const gainNode = audioContext.createGain();
    const pitchNode = audioContext.createBiquadFilter();
    
    // Connect nodes once
    source.connect(gainNode);
    gainNode.connect(pitchNode);
    pitchNode.connect(audioContext.destination);

    // Track currently playing sounds
    const playingSounds = new Set();
    const MAX_SIMULTANEOUS_SOUNDS = 3;

    // Function to get random value between min and max
    function getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Function to play random click sound
    function playRandomClickSound() {
        const randomSound = clickSounds[Math.floor(Math.random() * clickSounds.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch(error => console.log('Click sound playback failed:', error));
    }

    // Function to play sound with random volume and pitch
    function playRandomizedSound() {
        // Create a new audio element for this sound
        const sound = new Audio('audio/hover-tile.wav');
        const soundSource = audioContext.createMediaElementSource(sound);
        const soundGain = audioContext.createGain();
        const soundPitch = audioContext.createBiquadFilter();
        
        // Connect this sound's nodes
        soundSource.connect(soundGain);
        soundGain.connect(soundPitch);
        soundPitch.connect(audioContext.destination);
        
        // Set random values
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

    // Function to create grid tiles
    function createGridTiles() {
        // Remove existing tiles
        const existingTiles = container.querySelectorAll('.grid-tile');
        existingTiles.forEach(tile => tile.remove());
        
        // Reset tiles array
        tiles = [];
        
        // Calculate new number of tiles needed
        numTilesX = Math.ceil(window.innerWidth / tileSize);
        numTilesY = Math.ceil(window.innerHeight / tileSize);
        
        // Create new tiles
        for (let y = 0; y < numTilesY; y++) {
            tiles[y] = [];
            for (let x = 0; x < numTilesX; x++) {
                const tile = document.createElement('div');
                tile.className = 'grid-tile';
                tile.style.left = `${x * tileSize}px`;
                tile.style.top = `${y * tileSize}px`;
                tile.dataset.x = x;
                tile.dataset.y = y;
                
                // Add hover event listeners with randomized sound
                tile.addEventListener('mouseenter', playRandomizedSound);
                
                container.appendChild(tile);
                tiles[y][x] = tile;
            }
        }
    }

    // Initial grid creation
    createGridTiles();

    // Add resize event listener
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // Clear the previous timeout
        clearTimeout(resizeTimeout);
        
        // Set a new timeout to avoid too many updates during resize
        resizeTimeout = setTimeout(() => {
            createGridTiles();
        }, 250); // Wait 250ms after the last resize event
    });

    // Function to get tiles within radius
    function getTilesInRadius(centerX, centerY) {
        const tilesByDistance = [];
        for (let y = 0; y < numTilesY; y++) {
            for (let x = 0; x < numTilesX; x++) {
                // Calculate distance from center
                const dx = x - centerX;
                const dy = y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // If tile is within radius, add it to the appropriate distance array
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

    // Handle click events
    container.addEventListener('click', (e) => {
        const tile = e.target.closest('.grid-tile');
        if (!tile) return;

        const x = parseInt(tile.dataset.x);
        const y = parseInt(tile.dataset.y);
        
        // Play random click sound
        playRandomClickSound();
        
        // Get tiles grouped by distance from center
        const tilesByDistance = getTilesInRadius(x, y);
        
        // Activate tiles with delay based on distance
        tilesByDistance.forEach((tilesAtDistance, distance) => {
            setTimeout(() => {
                tilesAtDistance.forEach(t => {
                    t.classList.add('active');
                    // Remove active class after animation
                    setTimeout(() => {
                        t.classList.remove('active');
                    }, 100);
                });
            }, distance * rippleDelay);
        });
    });
}); 