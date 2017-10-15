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
let turdYPos;
let obstXPos;
let groundXPos = 0;
let flyZone = [];

//main function
function flappyTurd(){
  const $turd = $('#turd');
  const $level = $('main');
  const $ground = $('footer');
  const $obstacle = $('ul');
  const $audio = $('audio');
  const $score = $('#score');
  const turdXPos = parseInt($turd.css('margin-left'));

  //set event handlers
  $(window).on('click', flyTurd);
  $(window).keypress(flyTurd);

  // function for making turd fall
  function dropTurd(){
    const floor = 550; //this is because the level height is 600px and turd height is 50px

    turdYPos = parseInt($turd.css('margin-top'));
    if(turdYPos === floor){
      stopTurd();
    } else {
      turdYPos = turdYPos + 10;
      setDOMTurdVerticalPosition();
    }
  }

  // function for making turd fly
  function flyTurd(){
    const ceiling = 30;

    if(turdYPos <= ceiling){
      stopTurd();

    } else {
      turdYPos = turdYPos -50;
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
    $turd.css('margin-top', `${turdYPos}px`);
  }

  //function to create an obstacle with a random portion of two consecutive lis missing i.e. flyzone
  function createObstacle(){
    //generate a random number between 0 and 5
    const randomNo1 = Math.floor(Math.random() * (5)) + 1;
    const randomNo2 = randomNo1 + 1;

    //set background-color for all to mediumseagreen initially
    for (let i = 1; i < 7; i++) {
      //set background-color
      $(`ul li#${[i]}`).css('background-color','mediumseagreen');
    }
    // set the background-color for randomNo and randomNo2 to transparent
    $(`ul li#${randomNo1}`).css('background-color','transparent');
    $(`ul li#${randomNo2}`).css('background-color','transparent');

    flyableZone(randomNo1,randomNo2);
  }

  function flyableZone(portion1, portion2){
    const portionHeight = ($obstacle.height())/6;
    const zones = {'1': [0,portionHeight], '2': [portionHeight,portionHeight*2], '3': [portionHeight*2,portionHeight*3], '4': [portionHeight*3,portionHeight*4], '5': [portionHeight*4,portionHeight*5], '6': [portionHeight*5,portionHeight*6]};

    // set the flyableZone
    flyZone[0] = (zones[portion1]);
    flyZone[1] = (zones[portion2]);
  }

  //function to slide obstacle into view from right of screen to left and then loop
  function slideObstacle(){
    obstXPos = parseInt($obstacle.css('margin-left'));

    //create new obstacle when the obstacle's margin-left is 2000px
    if (obstXPos === 2000){
      createObstacle();
    }

    if (obstXPos <= -250){ //i.e. obstacle has moved off-screen left
      obstXPos = 2000; //i.e. bring it back off-screen right - this causes the loop effect
    } else {
      obstXPos = obstXPos - 1;
    }

    $obstacle.css('margin-left',`${obstXPos}px`);

    detectCollision();
  }

  //function to slide the ground
  function slideGround(){
    groundXPos--;
    $ground.css('background-position', `${groundXPos}px 0`);
  }

  //function for collision detection
  function detectCollision(){

    if ( ((turdYPos <= (flyZone[0][0])) || (turdYPos >= (flyZone[1][1])-50) ) && (obstXPos <= 400) ) {
      stopTurd();
    }

    if (obstXPos+150 === turdXPos) {
      incrementScore();
      //reset the flyZone
      flyZone[0][0] = 0;
      flyZone[1][1] = $obstacle.height();
    }
  }

  //function for incrementing the score each time an obstacle is passed
  function incrementScore(){
    console.log(obstXPos);
    console.log(turdXPos);
    let score = parseInt($score.html());

    score++;
    $score.html(score);
  }

  //$audio.attr('src','sounds/Theme.mp3');
  //$audio.trigger('play');
  const movingTurd = setInterval(dropTurd, 50);
  const movingObstacle = setInterval(slideObstacle,1); //move every 1milisecs to give smooth illusion of moving
  const movingGround = setInterval(slideGround,1);
}

$(flappyTurd);
