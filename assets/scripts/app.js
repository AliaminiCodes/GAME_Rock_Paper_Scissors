// assets/scripts/app.js
const startGameBtn = document.getElementById('start-game-btn');
const resultMessage = document.getElementById('result-message');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const choiceButtons = document.querySelectorAll('.choice-btn');
const playerChoiceImg = document.getElementById('player-choice-img');
const computerChoiceImg = document.getElementById('computer-choice-img');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let gameIsRunning = false;
let playerScore = 0;
let computerScore = 0;

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

const updateImages = (playerChoice, computerChoice) => {
  playerChoiceImg.src = `images/${playerChoice}.png`;
  playerChoiceImg.alt = `Player chose ${playerChoice}`;
  computerChoiceImg.src = `images/${computerChoice}.png`;
  computerChoiceImg.alt = `Computer chose ${computerChoice}`;
};

const playRound = (playerChoice) => {
  if (gameIsRunning) return;
  gameIsRunning = true;

  const computerChoice = getComputerChoice();
  const winner = getWinner(computerChoice, playerChoice);

  let message = `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message += 'had a draw!';
  } else if (winner === RESULT_PLAYER_WINS) {
    message += 'won.';
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else {
    message += 'lost.';
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }

  resultMessage.textContent = message;
  updateImages(playerChoice, computerChoice);
  gameIsRunning = false;
};

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    playRound(playerChoice);
  });
});

startGameBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  resultMessage.textContent = 'Choose your move!';
  playerChoiceImg.src = '';
  computerChoiceImg.src = '';
});
