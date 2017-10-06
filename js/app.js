// flappy turd

// Welcome screen with instructions
// On page load, ask the player if they are ready - press a start button to start (initialise game)
// Once start button has been clicked, show flappy turd starting to fall (add click event handler on load)
// fly each time mouse clicked
// fall each time mouse not clicked
// Display animated obstacles moving from right of screen to left
// Win logic - increment score each time an obstacle is successfully passed
// Collision logic + game over / restart
// Animations / character + graphics (libraries such as phaser.io)
//
// modules:
//
// displayWelcomeScreen
// startGame
// fall
// fly
// displayObstacle
// animateObstacles
// incrementScore
// collision
// gameOver
// restart (which is the same as startGame)

function flappyTurd(){

  //define global variables
  const $turd = $('#turd');
  const $level = $('main');
  const $ground = $('footer');

  function fall(){
    let verticalPosition = parseInt($turd.css('margin-top'));
    verticalPosition = verticalPosition + 10;
    $turd.css('margin-top', `${verticalPosition}px`);
    console.log(verticalPosition);
  }

  setInterval(fall, 100);

}

$(flappyTurd);
