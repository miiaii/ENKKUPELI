const showInstructionsBtn = document.getElementById('show-instructions');
const instructionsDiv = document.getElementById('instructions');
const closeInstructionsBtn = document.getElementById('close-instructions');

// Näytä ohjeet
showInstructionsBtn.addEventListener('click', () => {
    instructionsDiv.style.display = 'block';
});

// Sulje ohjeet
closeInstructionsBtn.addEventListener('click', () => {
    instructionsDiv.style.display = 'none';
});


document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "What sound does a cow make? Mitä lehmä sanoo?",
            options: {
                a: "Moo",
                b: "Meow",
                c: "Woof"
            },
            correctAnswer: "a"
        },
        {
            question: "Which animal is known as the 'King of the Jungle'? Mitä näistä eläimistä kutsutaan viidakon kuninkaaksi?",
            options: {
                a: "Lion",
                b: "Elephant",
                c: "Tiger"
            },
            correctAnswer: "a"
        },
        {
            question: "What color is the sky on a clear day? Minkä värinen taivas on kirkkaana päivänä?",
            options: {
                a: "Blue",
                b: "Green",
                c: "Red"
            },
            correctAnswer: "a"
        },
        {
            question: "What do you say when you meet someone? Mitä sanot kun tapaat ja tervehdit jotakuta?",
            options: {
                a: "Thank you",
                b: "Goodbye",
                c: "Hello"
            },
            correctAnswer: "c"
        },
        {
            question: "What do you say when you leave? Mitä sanot kun hyvästelet toisen ihmisen?",
            options: {
                a: "Goodbye",
                b: "Hello",
                c: "Please"
            },
            correctAnswer: "a"
        },
        {
            question: "What animal says meow? Mikä eläin sanoo miau?",
            options: {
                a: "Dog",
                b: "Cat",
                c: "Cow"
            },
            correctAnswer: "b"
        },
        {
            question: "Which fruit is yellow and long? Mikä hedelmä on keltainen ja pitkä?",
            options: {
                a: "Apple",
                b: "Banana",
                c: "Orange"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the first day of the week? Mikä on viikon ensimmäinen päivä?",
            options: {
                a: "Monday",
                b: "Sunday",
                c: "Friday"
            },
            correctAnswer: "a"
        },
        {
            question: "What is the opposite of big? Mikä on ison vastakohta?",
            options: {
                a: "Small",
                b: "Long",
                c: "Tall"
            },
            correctAnswer: "a"
        },
        {
            question: "How many legs does a dog have? Kuinka monta jalkaa koiralla on?",
            options: {
                a: "Two",
                b: "Four",
                c: "Six"
            },
            correctAnswer: "b"
        },
        ];

    let currentQuestionIndex = 0;
    let score = 0;

    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        document.getElementById('game-box').innerHTML = `
            <h2>${question.question}</h2>
            <div class="options">
                <button class="btn btn-custom option" data-answer="a">${question.options.a}</button>
                <button class="btn btn-custom option" data-answer="b">${question.options.b}</button>
                <button class="btn btn-custom option" data-answer="c">${question.options.c}</button>
            </div>
            <div id="feedback" class="mt-3"></div>
        `;

        document.querySelectorAll('.option').forEach(button => {
            button.addEventListener('click', checkAnswer);
        });
    }
    
    function checkAnswer(event) {
        const selectedAnswer = event.target.getAttribute('data-answer');
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        const feedbackElement = document.getElementById('feedback');

        if (selectedAnswer === correctAnswer) {
            score++;
            feedbackElement.innerHTML = `<div class="alert alert-success">Correct! Well done! Oikein! Hienosti tehty!</div>`;
            let savedPoints = parseInt(localStorage.getItem("game4Count")) ||0;
    savedPoints++;
    localStorage.setItem("game4Count", savedPoints);
        } else {
            feedbackElement.innerHTML = `<div class="alert alert-danger">Wrong answer! Väärä vastaus!</div>`;
        }


        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                showResults();
            }
        }, 1000);
    }

    function showResults() {
        document.getElementById('game-box').innerHTML = `
            <h2>Game Over!</h2>
            <p>Sinä sait ${score}/${questions.length} pistettä. Hienosti pelattu! </p>
            <button class="btn btn-custom" onclick="restartGame()">Pelaa uudestaan</button>
        `;
    }

    let completedGames = parseInt(localStorage.getItem("game3Completed")) || 0;
    completedGames++;
    localStorage.setItem("game3Completed", completedGames);
    
    function restartGame() {
        score = 0;
        currentQuestionIndex = 0;
        displayQuestion();
    }

    window.restartGame = restartGame;

    displayQuestion(); // Aloita peli
   
});

// Pisteiden lasku ja tallennus selaimeen:


