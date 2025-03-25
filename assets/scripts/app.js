const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';



const getPlayerChoice = function () {
   const selection = prompt('Rock, Paper or Scissors?', '');
   if (
    selection !== ROCK &&
    selection !== PAPER &&
    selection !== SCISSORS
  ) {
    alert(`Invalid choice! We chose Rock for you!`);
    return 'rock';
  }
}


startGameBtn.addEventListener('click', function () {
  console.log('Game is starting...');
});

