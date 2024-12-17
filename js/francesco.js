// Pelin tilat, taso, pisteet, vihjeet
let currentLevel = 0;
let score = 0;
let hintsUsed = 0;

// 4 tasoa
const levels = [
    {
        images: [
            { id: 'cat', src: './images/animals/cat.png', alt: 'Cat' },
            { id: 'dog', src: './images/animals/dog.png', alt: 'Dog' },
            { id: 'lion', src: './images/animals/lion.png', alt: 'Lion' }
        ],
        answer: 'dog',
        hints: ['Se on ihmisen paras ystävä', 'Sillä on häntä', 'Se haukkuu']
    },
    {
        images: [
            { id: 'goat', src: './images/animals/goat.png', alt: 'Goat' },
            { id: 'cow', src: './images/animals/cow.png', alt: 'Cow' },
            { id: 'horse', src: './images/animals/horse.png', alt: 'Horse' }
        ],
        answer: 'goat',
        hints: ['Sillä on sarvet', 'Se osaa kiivetä hyvin', 'Rakastaa ruohoa']
    },
    {
        images: [
            { id: 'goat', src: './images/animals/goat.png', alt: 'Goat' },
            { id: 'lion', src: './images/animals/lion.png', alt: 'Lion' },
            { id: 'horse', src: './images/animals/horse.png', alt: 'Horse' }
        ],
        answer: 'horse',
        hints: ['Se tyypillisesti sanoo "ihaa"', 'Suuri ja vahva', 'Voit ratsastaa tällä']
    },
    {
        images: [
            { id: 'cat', src: './images/animals/cat.png', alt: 'Cat' },
            { id: 'cow', src: './images/animals/cow.png', alt: 'Cow' },
            { id: 'dog', src: './images/animals/dog.png', alt: 'Dog' }
        ],
        answer: 'cow',
        hints: ['Rakastaa ruohoa', 'Sanoo MUUUU', 'Tuottaa maitoa']
    }
];

// Luo kuvat dynaamisesti
function initializeImages(images) {
    const imagesContainer = document.getElementById('images');
    imagesContainer.innerHTML = ''; // Tyhjennä vanhat kuvat
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.id = image.id;
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.onclick = () => checkAnswer(image.id);
        imagesContainer.appendChild(imgElement);
    });
}

// Päivitä tason tiedot
function updateLevel(newImages, correctAnswer) {
    initializeImages(newImages); // Päivitä kuvat dynaamisesti
    document.getElementById('answerBox').textContent = correctAnswer;
    document.getElementById('hintText').textContent = 'Vihjeet aukeavat tänne';
    document.getElementById('answerBox').style.backgroundColor = ''; // Poista väri

    // Reset hint buttons
    for (let i = 0; i < 3; i++) {
        const hintButton = document.getElementById(`hint${i + 1}`);
        hintButton.disabled = usedHints[i];
    }

    // Update score display
    updateScoreDisplay();
}

// Seuraavaan tasoon
function nextLevel() {
    hintsUsed = 0; // Nollaa vihjeet
    usedHints = [false, false, false]; // Reset used hints
    currentLevel++;

    if (currentLevel < levels.length) {
        // Päivitä seuraavan tason kuvat ja vastaus
        const level = levels[currentLevel];
        updateLevel(level.images, level.answer);
    } else {
        // Pelin loppu
        endGame();
    }
}

// Käytä vihjettä
function useHint(hintNumber) {
    const hints = levels[currentLevel].hints;

    if (hintNumber <= hints.length && !usedHints[hintNumber - 1]) {
        document.getElementById('hintText').textContent = hints[hintNumber - 1];
        hintsUsed++;
        usedHints[hintNumber - 1] = true;
        
        // Disable the used hint button
        document.getElementById(`hint${hintNumber}`).disabled = true;
    } else {
        document.getElementById('hintText').textContent = 'Ei lisää vihjeitä!';
    }
}

// Tarkista vastaus
function checkAnswer(selectedId) {
    const correctAnswer = levels[currentLevel].answer;
    const answerBox = document.getElementById('answerBox');

    answerBox.classList.remove('shake', 'bounce');

    if (selectedId === correctAnswer) {
        // oikea vastaus, vastausboksi pomppaa
        answerBox.style.backgroundColor = 'green';
        answerBox.classList.add('bounce');
        const levelScore = Math.max(0, 1 - hintsUsed * 0.25);
        score += levelScore;

        // Siirry seuraavalle tasolle
        setTimeout(nextLevel, 1000); 
    } else {
        // Väärä vastaus, vastausboksi tärähtää
        score = Math.max(-1, score - 0.1);
        answerBox.style.backgroundColor = 'red';
        answerBox.classList.add('shake'); 

        // Palautetaan vihjeboksi alkuperäiseksi 2 sekunnin kuluttua
        setTimeout(function() {
            answerBox.classList.remove('shake');
            answerBox.style.backgroundColor = ''; 
        }, 1000);
    }

    // Päivitä pistenäyttö HETI vastauksen jälkeen
    updateScoreDisplay();
}

// Nollaa peli
function resetGame() {
    currentLevel = 0;
    // Alusta score 0:lla, älä lisää aiempaa pistettä vielä
    score = 0;
    hintsUsed = 0;
    usedHints = [false, false, false];
    const firstLevel = levels[currentLevel];
    updateLevel(firstLevel.images, firstLevel.answer);
}

// Päivitä pistetiedot näytölle
function updateScoreDisplay() {
    console.log('Current Score:', score); // Debug line
    const scoreDisplay = document.getElementById('scoreBox');
    if (scoreDisplay) {
        scoreDisplay.textContent = score.toFixed(2);
    }
}

// Pelin loppu
function endGame() {
    if (score >= 2) {
        alert(`Onnittelut! Läpäisit pelin! Kokonaispisteet: ${score.toFixed(2)}`);

        // Hae aikaisemmat pisteet localStoragesta
        let previousScore = parseFloat(localStorage.getItem('game2Count')) || 0;
        
        // Laske uusi kokonaispisteet (ei lisätä useita kertoja)
        let totalScore = previousScore + score;
        
        // Tallenna uudet kokonaispisteet
        localStorage.setItem('game2Count', totalScore.toFixed(2));

        // Tallenna pelin suorituskerta
        let completedGames = parseInt(localStorage.getItem("game2Completed")) || 0;
        completedGames++;
        localStorage.setItem("game2Completed", completedGames);

        // Siirrytään koostesivulle
        setTimeout(() => {
            window.location.href = './koostesivu.html';
        }, 1000);
    } else {
        alert(`Sait vain: ${score.toFixed(2)} pistettä, pisteitä pitäisi saada yli 2. Yritä uudelleen.`);

        // Pelin resetointi, jos pelaaja ei saanut tarpeeksi pisteitä
        resetGame();
    }
}

// Kun DOM on ladattu, käynnistä peli
document.addEventListener('DOMContentLoaded', () => {
    resetGame();
});

