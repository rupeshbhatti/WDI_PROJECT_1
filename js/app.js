// flappy turd

// Welcome screen with instructions
// On page load, ask the player if they are ready - press a start button to start (initialise game)
// Once start button has been clicked, show flappy turd starting to fall (add click event handler on load)
// fly each time mouse clicked
// fall each time mouse not clicked
// Display animated obstacles moving from right of screen to left
// Win logic - increment score each time an obstacle is successfully passed
// Collision logic + game over / restart
// Animations / character + graphics (libraries such as phaser.io?)

//define global variables
let $turd;
let $level;
let $ground;
let $obstacle;
let $audio;
let $score;

let verticalTurdPosition;
let horizontalObstaclePosition;
let obstacleHeight;
let obstacleWidth;
let groundPosition = 0;

//main function
function flappyTurd(){
  $turd = $('#turd');
  $level = $('main');
  $ground = $('footer');
  // $obstacle = $('.obstacle');
  $obstacle = $('ul');
  $audio = $('audio');
  $score = $('#score');
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
      stopTurd();

    } else {
      verticalTurdPosition = verticalTurdPosition -50;
      setDOMTurdVerticalPosition();
    }
  }

  //function to stop turd moving
  function stopTurd(){
    clearInterval(movingTurd);
    clearInterval(movingObstacle);
    clearInterval(movingGround);
    $audio.attr('src','sounds/splat.wav');
    $audio.trigger('play');
  }

  //function to set turd's vertical position
  function setDOMTurdVerticalPosition(){
    $turd.css('margin-top', `${verticalTurdPosition}px`);
  }

  //function to create an obstacle with a random portion of two consecutive lis missing
  function createObstacle(){
    //generate a random number between 0 and 6
    let randomNo = Math.floor(Math.random() * (6)) + 1;

    //set background-color for all to mediumseagreen initially
    for (let i = 1; i < 7; i++) {
      //set background-color
      $(`ul li#${[i]}`).css('background-color','mediumseagreen');
    }

    // set the background-color for randomNo
    $(`ul li#${randomNo}`).css('background-color','transparent');

    if (randomNo === 6) {
      randomNo--;
      $(`ul li#${randomNo}`).css('background-color','transparent');
    } else {
      randomNo++;
      $(`ul li#${randomNo}`).css('background-color','transparent');
    }
  }

  //function to slide obstacle into view from right of screen to left and then loop
  function slideObstacle(){
    horizontalObstaclePosition = parseInt($obstacle.css('margin-left'));

    //create new obstacle when the obstacle's margin-left is 2000px
    if (horizontalObstaclePosition === 2000){
      createObstacle();
    }

    if (horizontalObstaclePosition <= -250){ //i.e. obstacle has moved off-screen left
      horizontalObstaclePosition = 2000; //i.e. bring it back off-screen right - this causes the loop effect
    } else {
      horizontalObstaclePosition = horizontalObstaclePosition - 1;
    }

    $obstacle.css('margin-left',`${horizontalObstaclePosition}px`);

    detectCollision();
  }

  //function to slide the ground
  function slideGround(){
    groundPosition--;
    $ground.css('background-position', `${groundPosition}px 0`);
  }

  //function for collision detection
  function detectCollision(){

    //obstacleHeight is 250px
    //turd horizontal position is 350px
    //turd width is 50px
    if ((horizontalObstaclePosition <= horizontalTurdPosition+50) && (horizontalObstaclePosition >= obstacleWidth+50) && (verticalTurdPosition-50 >= obstacleHeight)) {
      stopTurd();
    }

    if (horizontalObstaclePosition === horizontalTurdPosition) {
      incrementScore();
    }
  }

  //function for incrementing the score each time an obstacle is passed
  function incrementScore(){
    let score = parseInt($score.html());

    score++;
    $score.html(score);
  }

  const movingTurd = setInterval(dropTurd, 50);
  const movingObstacle = setInterval(slideObstacle,1); //move every 1milisecs to give smooth illusion of moving
  const movingGround = setInterval(slideGround,1);
}

$(flappyTurd);
