// Alkuperäinen sanakirja kategoriat
const categories = {
  animals: [
    { id: 1, image: 'bird.svg', english: 'bird', finnish: 'lintu' },
    { id: 2, image: 'cat.svg', english: 'cat', finnish: 'kissa' },
    { id: 3, image: 'dog.svg', english: 'dog', finnish: 'koira' },
    { id: 4, image: 'cow.svg', english: 'cow', finnish: 'lehmä' },
    { id: 5, image: 'fish.svg', english: 'fish', finnish: 'kala' },
    { id: 6, image: 'mouse.svg', english: 'mouse', finnish: 'hiiri' },
    { id: 7, image: 'pig.svg', english: 'pig', finnish: 'possu' },
    { id: 8, image: 'rabbit.svg', english: 'rabbit', finnish: 'pupu' },
  ],
  fruits: [
    { id: 1, image: 'avocado.svg', english: 'avocado', finnish: 'avokado' },
    { id: 2, image: 'banana.svg', english: 'banana', finnish: 'banaani' },
    { id: 3, image: 'apple.svg', english: 'apple', finnish: 'omena' },
    { id: 4, image: 'grape.svg', english: 'grape', finnish: 'viinirypäle' },
    { id: 5, image: 'kiwi.svg', english: 'kiwi', finnish: 'kiivi' },
    { id: 6, image: 'lemon.svg', english: 'lemon', finnish: 'sitruuna' },
    { id: 7, image: 'orange.svg', english: 'orange', finnish: 'appelsiini' },
    { id: 8, image: 'pear.svg', english: 'pear', finnish: 'päärynä' },
    { id: 9, image: 'pineapple.svg', english: 'pineapple', finnish: 'ananas' },
    { id: 10, image: 'strawberry.svg', english: 'strawberry', finnish: 'mansikka' },
    { id: 11, image: 'blueberry.svg', english: 'blueberry', finnish: 'mustikka' },
    { id: 12, image: 'cherries.svg', english: 'cherry', finnish: 'kirsikka' },
  ],
  numbers: [
    { id: 1, image: 'one.svg', english: 'one', finnish: 'yksi' },
    { id: 2, image: 'two.svg', english: 'two', finnish: 'kaksi' },
    { id: 3, image: 'three.svg', english: 'three', finnish: 'kolme' },
    { id: 4, image: 'four.svg', english: 'four', finnish: 'neljä' },
    { id: 5, image: 'five.svg', english: 'five', finnish: 'viisi' },
    { id: 6, image: 'six.svg', english: 'six', finnish: 'kuusi' },
    { id: 7, image: 'seven.svg', english: 'seven', finnish: 'seitsemän' },
    { id: 8, image: 'eight.svg', english: 'eight', finnish: 'kahdeksan' },
    { id: 9, image: 'nine.svg', english: 'nine', finnish: 'yhdeksän' },
    { id: 10, image: 'zero.svg', english: 'zero', finnish: 'nolla' },
  ],
  vehicles: [
    { id: 1, image: 'bus.svg', english: 'bus', finnish: 'bussi' },
    { id: 2, image: 'car.svg', english: 'car', finnish: 'auto' },
    { id: 3, image: 'airplane.svg', english: 'plane', finnish: 'lentokone' },
    { id: 4, image: 'helicopter.svg', english: 'helicopter', finnish: 'helikopteri' },
    { id: 5, image: 'alien.svg', english: 'alien', finnish: 'avaruusalus' },
    { id: 6, image: 'bicycle.svg', english: 'bicycle', finnish: 'pyöräily' },
    { id: 7, image: 'ambulance.svg', english: 'ambulance', finnish: 'ambulanssi' },
    { id: 8, image: 'boat.svg', english: 'boat', finnish: 'laiva' },
    { id: 9, image: 'firetruck.svg', english: 'firetruck', finnish: 'paloauto' },
    { id: 10, image: 'tractor.svg', english: 'tractor', finnish: 'traktori' },
  ]
};

// Uusi sanakirja oikeille parivalinnoille
const correctPairs = {
  animals: {
    'bird.svg': 'bird',
    'cat.svg': 'cat',
    'dog.svg': 'dog',
    'cow.svg': 'cow',
    'fish.svg': 'fish',
    'mouse.svg': 'mouse',
    'pig.svg': 'pig',
    'rabbit.svg': 'rabbit',
  },
  fruits: {
    'avocado.svg': 'avocado',
    'banana.svg': 'banana',
    'apple.svg': 'apple',
    'grape.svg': 'grape',
    'kiwi.svg': 'kiwi',
    'lemon.svg': 'lemon',
    'orange.svg': 'orange',
    'pear.svg': 'pear',
    'pineapple.svg': 'pineapple',
    'strawberry.svg': 'strawberry',
    'blueberry.svg': 'blueberry',
    'cherries.svg': 'cherry',
  },
  numbers: {
    'one.svg': 'one',
    'two.svg': 'two',
    'three.svg': 'three',
    'four.svg': 'four',
    'five.svg': 'five',
    'six.svg': 'six',
    'seven.svg': 'seven',
    'eight.svg': 'eight',
    'nine.svg': 'nine',
    'zero.svg': 'zero',
  },
  vehicles: {
    'bus.svg': 'bus',
    'car.svg': 'car',
    'airplane.svg': 'plane',
    'helicopter.svg': 'helicopter',
    'alien.svg': 'alien',
    'bicycle.svg': 'bicycle',
    'ambulance.svg': 'ambulance',
    'boat.svg': 'boat',
    'firetruck.svg': 'firetruck',
    'tractor.svg': 'tractor',
  }
};

let score = 0;
let attempts = 0;
let selectedCards = [];
let matchedPairs = 0;
const totalPairs = 3;

function saveScore() {
  localStorage.setItem('score', score);
}

function loadSavedScore() {
  const savedScore = localStorage.getItem('score');
  if (savedScore !== null) {
    score = parseInt(savedScore);
  } else {
    score = 0;
  }
  document.getElementById('score').textContent = score;
}

function selectCard(card) {
  if (
    selectedCards.length < 2 &&
    !card.classList.contains('selected') &&
    !card.classList.contains('matched')
  ) {
    card.classList.add('selected');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;

      // Hae korttien tiedot
      const firstCardCategory = firstCard.dataset.category;
      const secondCardCategory = secondCard.dataset.category;
      const firstCardImage = firstCard.querySelector('img')?.src.split('/').pop();
      const secondCardValue = secondCard.querySelector('p')?.textContent;

      // Tarkista, että molemmat kuuluvat samaan kategoriaan ja muodostavat oikean parin
      if (
        firstCardCategory === secondCardCategory &&
        correctPairs[firstCardCategory][firstCardImage] === secondCardValue
      ) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        score++;
        let savedPoints = parseInt(localStorage.getItem("game1Count")) || 0;
        savedPoints++;
        localStorage.setItem("game1Count", savedPoints);
        matchedPairs++;
        saveScore();
        document.getElementById('score').textContent = score;
      } else {
        // Palauta kortit valitsemattomiksi, jos pari on väärä
        setTimeout(() => {
          firstCard.classList.remove('selected');
          secondCard.classList.remove('selected');
        }, 1000);
      }

      attempts++;
      selectedCards = [];

      // Tarkista, onko peli päättynyt
      if (attempts >= 3 || matchedPairs === totalPairs) {
        setTimeout(() => {
          if (attempts >= 3) {
            alert(
              `Peli päättyi! Sait ${matchedPairs} oikein! Kiva kun opettelit kanssamme englantia!`
            );
          } else if (matchedPairs === totalPairs) {
            alert(
              `Hienoa! Löysit kaikki ${totalPairs} paria!`
            );
          }
          loadGame();
        }, 500);
      }
    }
  }
}

function loadGame() {
  attempts = 0;
  matchedPairs = 0;
  loadSavedScore();
  const { name: categoryName, data: categoryData } = getRandomCategory(categories);

  const pairs = getRandomPairs(categoryData);
  const words = pairs.map(item => item.english);
  const shuffledWords = shuffleWords(words);

  const gameContainer = document.getElementById('game-container');
  gameContainer.innerHTML = '';

  const imageRow = document.createElement('div');
  imageRow.className = 'image-row';
  const textRow = document.createElement('div');
  textRow.className = 'text-row';

  pairs.forEach((item, index) => {
    const imageCard = document.createElement('div');
    imageCard.className = 'card image-card';
    imageCard.setAttribute('id', `card-${index + 1}`);
    imageCard.setAttribute('data-english', item.english);
    imageCard.setAttribute('data-category', categoryName);
    imageCard.innerHTML = `
      <img src="${getImagePath(categoryName, item.image)}" alt="${item.english}" />
    `;
    imageCard.addEventListener('click', () => selectCard(imageCard));
    imageRow.appendChild(imageCard);

    const textCard = document.createElement('div');
    textCard.className = 'card text-card';
    textCard.setAttribute('id', `card-${index + 1}`);
    textCard.setAttribute('data-english', item.english);
    textCard.setAttribute('data-category', categoryName);
    textCard.innerHTML = `
      <p>${shuffledWords[index]}</p>
    `;
    textCard.addEventListener('click', () => selectCard(textCard));
    textRow.appendChild(textCard);
  });

  gameContainer.appendChild(imageRow);
  gameContainer.appendChild(textRow);
}

function getRandomCategory(categories) {
  const keys = Object.keys(categories);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return { name: randomKey, data: categories[randomKey] };
}

function getRandomPairs(categoryData, count = 3) {
  const shuffledData = categoryData.sort(() => Math.random() - 0.5).slice(0, count);
  return shuffledData;
}

function shuffleWords(words) {
  return words.sort(() => Math.random() - 0.5);
}

function getImagePath(categoryName, imageName) {
  return `images/emilia/${categoryName}/${imageName}`;
}



document.addEventListener('DOMContentLoaded', loadGame);


//INFO MODAL

document.addEventListener("DOMContentLoaded", () => {

  const infoButton = document.getElementById('infoButton');

  // Luodaan modaali ja sen sisältö (ei html:ssä)
  const modal = document.createElement('div');
  modal.id = 'infoModal';
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.id = 'infoModalContent';

  const modalHeader = document.createElement('h4');
  modalHeader.textContent = 'PELIOHJEET';

  // Oikeaan yläkulmaan rasti-painike
  const xButton = document.createElement('button');
  xButton.classList.add('close-x-btn');
  xButton.id = 'xBtn';
  xButton.textContent = '\u274C'; // Unicode X

  // Rasti-exit modaalin otsikon viereen
  modalHeader.appendChild(xButton);
  modalContent.appendChild(modalHeader);

  // Pelin ohjeet
  const instructions = [
    'Yhdistä kuva ja kuvaa vastaava englanninkielinen sana. Lopuksi näet montako paria meni oikein!'
];
  instructions.forEach(instruction => {
    const p = document.createElement('p');
    p.textContent = instruction;
    modalContent.appendChild(p);
  });

  // Sulje-button
  const closeButton = document.createElement('button');
  closeButton.id = 'closeInfoBtn';
  closeButton.textContent = 'SULJE'; // Unicode [x]
  modalContent.appendChild(closeButton);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  infoButton.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  xButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

 // Sulje modaali ESC-näppäimellä
 document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});
});

let completedGames = parseInt(localStorage.getItem("game1Completed")) || 0;
completedGames++;
localStorage.setItem("game1Completed", completedGames);