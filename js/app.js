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

//define global variables
let $turd;
let $level;
let $ground;
let $obstacle;

let verticalPosition;
let horizontalObstaclePosition;

//main function
function flappyTurd(){
  $turd = $('#turd');
  $level = $('main');
  $ground = $('footer');
  $obstacle = $('.obstacle');

  //set event handlers
  $level.on('click', flyTurd);

  // function for making turd fall
  function dropTurd(){
    const floor = 550; //this is because the level height is 600px and turd height is 50px

    verticalPosition = parseInt($turd.css('margin-top'));
    if(verticalPosition === floor){
      stopTurd();
    } else {
      verticalPosition = verticalPosition + 10;
      setDOMTurdVerticalPosition();
      console.log(verticalPosition);
    }
  }

  // function for making turd fly
  function flyTurd(){
    const ceiling = 30;
    if(verticalPosition <= ceiling){
      //game over

    } else {
      verticalPosition = verticalPosition -50;
      setDOMTurdVerticalPosition();
    }
  }

  //function to stop turd moving
  function stopTurd(){
    clearInterval();
  }

  //function to set turd's vertical position
  function setDOMTurdVerticalPosition(){
    $turd.css('margin-top', `${verticalPosition}px`);
  }

  function animateObstacle(){
    horizontalObstaclePosition = parseInt($obstacle.css('margin-right'));

    if (horizontalObstaclePosition > 2000){
      horizontalObstaclePosition = -150;
    } else {
      horizontalObstaclePosition = horizontalObstaclePosition + 1;
    }

    $obstacle.css('margin-right',`${horizontalObstaclePosition}px`);

  }


  setInterval(dropTurd, 50);
  setInterval(animateObstacle,1); //clear
}

$(flappyTurd);
