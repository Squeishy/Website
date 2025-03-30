document.addEventListener('DOMContentLoaded', () => {
    const container = document.body;
    const tileSize = 50;
    const numTilesX = Math.ceil(window.innerWidth / tileSize);
    const numTilesY = Math.ceil(window.innerHeight / tileSize);
    const tiles = [];
    const radius = 4; // Radius in tiles
    const rippleDelay = 50; // Delay between each ring in milliseconds

    // Create grid
    for (let y = 0; y < numTilesY; y++) {
        tiles[y] = [];
        for (let x = 0; x < numTilesX; x++) {
            const tile = document.createElement('div');
            tile.className = 'grid-tile';
            tile.style.left = `${x * tileSize}px`;
            tile.style.top = `${y * tileSize}px`;
            tile.dataset.x = x;
            tile.dataset.y = y;
            container.appendChild(tile);
            tiles[y][x] = tile;
        }
    }

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