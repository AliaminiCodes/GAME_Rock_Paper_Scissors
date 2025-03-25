const startGameBtn = document.getElementById('start-game-btn');

const getPlayerChoice = function () {
   const selection = prompt('Rock, Paper or Scissors?', '');
   if (
    selection !== 'rock' &&
    selection !== 'paper' &&
    selection !== 'scissors'
  ) {
    alert(`Invalid choice! We chose Rock for you!`);
    return 'rock';
  }
}


startGameBtn.addEventListener('click', function () {
  console.log('Game is starting...');
});

