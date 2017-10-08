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

let verticalTurdPosition;
let horizontalObstaclePosition;
let obstacleHeight;
let obstacleWidth;

//main function
function flappyTurd(){
  $turd = $('#turd');
  $level = $('main');
  $ground = $('footer');
  $obstacle = $('.obstacle');
  const horizontalTurdPosition = parseInt($turd.css('margin-left'));
  obstacleHeight = parseInt($obstacle.css('height'));
  obstacleWidth = parseInt($obstacle.css('width'));

  //set event handlers
  $(window).on('click', flyTurd);
  $(window).keypress(flyTurd);

  // function for making turd fall
  function dropTurd(){
    const floor = 550; //this is because the level height is 600px and turd height is 50px

    verticalTurdPosition = parseInt($turd.css('margin-top'));
    if(verticalTurdPosition === floor){
      stopTurd();
    } else {
      verticalTurdPosition = verticalTurdPosition + 10;
      setDOMTurdVerticalPosition();
    }
  }

  // function for making turd fly
  function flyTurd(){
    const ceiling = 30;
    if(verticalTurdPosition <= ceiling){
      //game over

    } else {
      verticalTurdPosition = verticalTurdPosition -50;
      setDOMTurdVerticalPosition();
    }
  }

  //function to stop turd moving
  function stopTurd(){
    clearInterval(movingTurd);
    clearInterval(movingObstacle);
  }

  //function to set turd's vertical position
  function setDOMTurdVerticalPosition(){
    $turd.css('margin-top', `${verticalTurdPosition}px`);
  }

  //function to slide obstacle into view from right of screen to left and then loop
  function slideObstacle(){
    horizontalObstaclePosition = parseInt($obstacle.css('margin-left'));

    if (horizontalObstaclePosition <= -250){ //i.e. obstacle has moved off-screen left
      horizontalObstaclePosition = 2000; //i.e. bring it back off-screen right - this causes the loop effect
    } else {
      horizontalObstaclePosition = horizontalObstaclePosition - 1;
    }
    $obstacle.css('margin-left',`${horizontalObstaclePosition}px`);

    detectCollision();
  }

  //function for collision detection
  function detectCollision(){

    //obstacleHeight is 250px
    //turd horizontal position is 350px
    //turd width is 50px
    if ((horizontalObstaclePosition <= horizontalTurdPosition+50) && (horizontalObstaclePosition >= obstacleWidth+50) && (verticalTurdPosition-50 >= obstacleHeight)) {
      stopTurd();
    }
  }

  const movingTurd = setInterval(dropTurd, 50);
  const movingObstacle = setInterval(slideObstacle,1); //move every 1milisecs to give smooth illusion of moving
}

$(flappyTurd);
