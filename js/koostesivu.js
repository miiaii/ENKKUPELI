// Retrieve game progress and scores
const gameProgress = {
    "game1": {
        completed: parseFloat(localStorage.getItem("game1Completed")) || 0,
        score: parseFloat(localStorage.getItem("game1Count")) || 0
    },
    "game2": {
        completed: parseFloat(localStorage.getItem("game2Completed")) || 0,
        score: parseFloat(localStorage.getItem("game2Count")) || 0
    },
    "game3": {
        completed: parseFloat(localStorage.getItem("game3Completed")) || 0,
        score: parseFloat(localStorage.getItem("game3Count")) || 0
    },
    "game4": {
        completed: parseFloat(localStorage.getItem("game4Completed")) || 0,
        score: parseFloat(localStorage.getItem("game4Count")) || 0
    }
};

// Update game point counts
document.getElementById("game1Count").textContent = gameProgress.game1.score.toFixed(2);
document.getElementById("game2Count").textContent = gameProgress.game2.score.toFixed(2);
document.getElementById("game3Count").textContent = gameProgress.game3.score.toFixed(2);
document.getElementById("game4Count").textContent = gameProgress.game4.score.toFixed(2);

// Calculate completed blocks based on game completion
let completedBlocks = Object.values(gameProgress).reduce((acc, game) => acc + (game.completed > 0 ? 1 : 0), 0);
if (completedBlocks > 4) completedBlocks = 4;

// Update progress display
document.getElementById("completionCount").textContent = completedBlocks;

// Update progress bar
const blockWidth = document.querySelector('.block').offsetWidth;
document.getElementById('smiler').style.transform = `translateX(${blockWidth * completedBlocks}px)`;

const blocks = document.querySelectorAll('.block');
blocks.forEach((block, index) => {
    block.classList.toggle('completed', index < completedBlocks);
});