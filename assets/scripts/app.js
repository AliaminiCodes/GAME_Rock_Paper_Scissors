// DOM elements
const startGameBtn = document.getElementById('start-game-btn'); // Start/reset button
const resultMessage = document.getElementById('result-message'); // Text result display
const playerScoreEl = document.getElementById('player-score'); // Player score display
const computerScoreEl = document.getElementById('computer-score'); // Computer score display
const choiceButtons = document.querySelectorAll('.choice-btn'); // Choice buttons (Rock, Paper, Scissors)
const playerChoiceImg = document.getElementById('player-choice-img'); // Player choice image
const computerChoiceImg = document.getElementById('computer-choice-img'); // Computer choice image
const startGif = document.getElementById('start-gif'); // Start gif element
const startFallback = document.getElementById('start-fallback'); // Fallback button
const startScreen = document.querySelector('.start-screen'); // Start screen div
const container = document.querySelector('.container'); // Main container

// Game constants
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

// Sound effects
const rockSound = new Audio('Audio/Rock.mp3'); // Sound for choosing Rock
const paperSound = new Audio('Audio/Paper.mp3'); // Sound for choosing Paper
const scissorsSound = new Audio('Audio/Scissors.mp3'); // Sound for choosing Scissors
const winSound = new Audio('Audio/win.mp3'); // Sound for winning
const loseSound = new Audio('Audio/LoseSound.mp3'); // Sound for losing
const drawSound = new Audio('Audio/DrawSound.mp3'); // Sound for a draw
const resetSound = new Audio('Audio/ResetSound.mp3'); // Sound for resetting and start

// Game state
let gameIsRunning = false; // Prevents multiple rounds at once
let playerScore = 0; // Tracks player score
let computerScore = 0; // Tracks computer score

// Function to start the game
const startGame = () => {
  playSoundWithFade(resetSound); // Play reset sound on gif click
  startScreen.classList.add('hidden'); // Fade out start screen
  setTimeout(() => {
    container.style.display = 'block'; // Make container visible first
    setTimeout(() => {
      container.classList.add('active'); // Then fade it in
    }, 10); // Small delay to ensure transition triggers
  }, 500); // Delay to let gif fade out first
};

// Start game by clicking gif
startGif.addEventListener('click', startGame);

// Fallback button if GIF fails to load
startGif.onerror = () => {
  startFallback.style.display = 'block'; // Show fallback button if GIF fails
};
startFallback.addEventListener('click', startGame);

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
  if (playerChoice) {
    playerChoiceImg.src = `Gif/${playerChoice}.gif`;
    playerChoiceImg.alt = `Player chose ${playerChoice}`;
    playerChoiceImg.onerror = () => {
      playerChoiceImg.src = `Images/${playerChoice}.png`; // Fallback to PNG if GIF fails
    };
  } else {
    playerChoiceImg.src = ''; // Clear image
    playerChoiceImg.alt = 'Player choice';
    playerChoiceImg.onerror = null; // Reset onerror
  }

  if (computerChoice) {
    computerChoiceImg.src = `Gif/${computerChoice}.gif`;
    computerChoiceImg.alt = `Computer chose ${computerChoice}`;
    computerChoiceImg.onerror = () => {
      computerChoiceImg.src = `Images/${computerChoice}.png`; // Fallback to PNG if GIF fails
    };
  } else {
    computerChoiceImg.src = ''; // Clear image
    computerChoiceImg.alt = 'Computer choice';
    computerChoiceImg.onerror = null; // Reset onerror
  }
};

// Plays sound with fade-in effect
const playSoundWithFade = (sound) => {
  sound.volume = 0; // Start at 0 volume
  sound.play(); // Start playing
  let fadeIn = setInterval(() => {
    if (sound.volume < 0.9) sound.volume += 0.1; // Gradually increase volume
    else clearInterval(fadeIn); // Stop when near full volume
  }, 50); // Increase every 50ms
};

// Plays sound with fade-in and fade-out for result sounds
const playResultSound = (sound) => {
  sound.volume = 0;
  sound.play();
  let fadeIn = setInterval(() => {
    if (sound.volume < 0.9) sound.volume += 0.1;
    else clearInterval(fadeIn);
  }, 50);

  // Use sound duration dynamically for fade-out timing
  sound.addEventListener(
    'loadedmetadata',
    () => {
      const duration = (sound.duration || 1) * 1000; // Default to 2s if duration unavailable
      const fadeOutStart = Math.max(duration - 500, 500); // Start fade-out 500ms before end, min 500ms
      setTimeout(() => {
        let fadeOut = setInterval(() => {
          if (sound.volume > 0.1) sound.volume -= 0.1;
          else {
            sound.volume = 0;
            sound.pause();
            sound.currentTime = 0;
            clearInterval(fadeOut);
          }
        }, 50);
      }, fadeOutStart);
    },
    { once: true }
  ); // Run only once per sound
};

// Plays sound based on player's choice
const playChoiceSound = (choice) => {
  if (choice === ROCK) playSoundWithFade(rockSound);
  else if (choice === PAPER) playSoundWithFade(paperSound);
  else if (choice === SCISSORS) playSoundWithFade(scissorsSound);
};

// Plays a single round of the game with delay for result sound
const playRound = (playerChoice) => {
  if (gameIsRunning) return; // Exit if game is already running
  gameIsRunning = true;

  playChoiceSound(playerChoice); // Play sound for player's choice with fade-in
  const computerChoice = getComputerChoice();
  const winner = getWinner(computerChoice, playerChoice);

  let message = `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you `;

  // Update images immediately
  updateImages(playerChoice, computerChoice);
  resultMessage.textContent = message; // Show partial message

  // Delay result sound and final message by 1 second (1000ms)
  setTimeout(() => {
    if (winner === RESULT_DRAW) {
      message += 'had a draw!';
      playResultSound(drawSound); // Play draw sound with fade-in and fade-out
    } else if (winner === RESULT_PLAYER_WINS) {
      message += 'won.';
      playerScore++;
      playerScoreEl.textContent = playerScore;
      playResultSound(winSound); // Play win sound with fade-in and fade-out
    } else {
      message += 'lost.';
      computerScore++;
      computerScoreEl.textContent = computerScore;
      playResultSound(loseSound); // Play lose sound with fade-in and fade-out
    }
    resultMessage.textContent = message; // Update full message
    gameIsRunning = false;
  }, 1000); // 1-second delay
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
  updateImages(null, null); // Reset images to empty state
  playSoundWithFade(resetSound); // Play reset sound with fade-in
});
