// DOM elements
const startGameBtn = document.getElementById('start-game-btn'); // Start/reset button
const resultMessage = document.getElementById('result-message'); // Text result display
const playerScoreEl = document.getElementById('player-score'); // Player score display
const computerScoreEl = document.getElementById('computer-score'); // Computer score display
const choiceButtons = document.querySelectorAll('.choice-btn'); // Choice buttons (Rock, Paper, Scissors)
const playerChoiceImg = document.getElementById('player-choice-img'); // Player choice image
const computerChoiceImg = document.getElementById('computer-choice-img'); // Computer choice image

// Game constants
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

// Game state
let gameIsRunning = false; // Prevents multiple rounds at once
let playerScore = 0; // Tracks player score
let computerScore = 0; // Tracks computer score

// Randomly selects computer's choice
const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) return ROCK;
  else if (randomValue < 0.67) return PAPER;
  else return SCISSORS;
};

// Determines the winner based on choices
const getWinner = (cChoice, pChoice) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

// Updates choice images in the visual result
const updateImages = (playerChoice, computerChoice) => {
  playerChoiceImg.src = `images/${playerChoice}.png`;
  playerChoiceImg.alt = `Player chose ${playerChoice}`;
  computerChoiceImg.src = `images/${computerChoice}.png`;
  computerChoiceImg.alt = `Computer chose ${computerChoice}`;
};

// Plays a single round of the game
const playRound = (playerChoice) => {
  if (gameIsRunning) return; // Exit if game is already running
  gameIsRunning = true;

  const computerChoice = getComputerChoice();
  const winner = getWinner(computerChoice, playerChoice);

  let message = `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) message += 'had a draw!';
  else if (winner === RESULT_PLAYER_WINS) {
    message += 'won.';
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else {
    message += 'lost.';
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }

  resultMessage.textContent = message; // Show result text
  updateImages(playerChoice, computerChoice); // Update images
  gameIsRunning = false;
};

// Add click listeners to choice buttons
choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    playRound(playerChoice);
  });
});

// Reset game when start button is clicked
startGameBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  resultMessage.textContent = 'Choose your move!';
  playerChoiceImg.src = ''; // Clear player image
  computerChoiceImg.src = ''; // Clear computer image
});
