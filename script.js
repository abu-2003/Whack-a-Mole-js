const holes = [];
const gameGrid = document.getElementById('game-grid');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
let score = 0;
let timeLeft = 30; // Game duration (in seconds)
let timerId;
let moleTimerId;

// Create holes dynamically
function createHoles(num) {
    for (let i = 0; i < num; i++) {
        const hole = document.createElement('div');
        hole.classList.add('hole');
        const mole = document.createElement('div');
        mole.classList.add('mole');
        hole.appendChild(mole);
        gameGrid.appendChild(hole);
        holes.push(hole);

        // Add click event listener to mole
        mole.addEventListener('click', () => {
            if (mole.classList.contains('up')) {
                score++;
                scoreDisplay.textContent = score;
                mole.classList.remove('up'); // Hide mole after click
            }
        });
    }
}

// Randomly pop up moles
function randomMole() {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const mole = holes[randomIndex].querySelector('.mole');
    mole.classList.add('up'); // Show mole
    setTimeout(() => {
        mole.classList.remove('up'); // Hide mole after 1 second
    }, 1000);
}

// Start game function
function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    timeLeft = 30;
    timeLeftDisplay.textContent = timeLeft;

    timerId = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerId);
            clearInterval(moleTimerId);
            alert('Game Over! Your score: ' + score);
        }
    }, 1000);

    moleTimerId = setInterval(randomMole, 1200); // Moles appear every 1.2 seconds
}

// Event listener for start button
document.getElementById('startButton').addEventListener('click', () => {
    clearInterval(moleTimerId);
    clearInterval(timerId);
    startGame();
});

// Create 9 holes when the page loads
createHoles(9);
