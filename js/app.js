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
let level = 2;
let gameOver = false;
let gameInterval = null;
let groundInterval = null;
let gameSpeed = 5000;

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
  $(window).on('load', dropTurd);
  $(window).keypress(flyTurd);

  groundInterval = setInterval(slideGround, gameSpeed);
  createObstacle();
  gameInterval = setInterval(createObstacle, gameSpeed);

  // function for making turd fall
  function dropTurd(){
    $turd.animate({marginTop: '550'},1000,'linear');
  }

  // function for making turd fly
  function flyTurd(){
    $turd.stop();
    $turd.animate({marginTop: '-=60'},1,'linear');
    dropTurd();
  }

  //function to stop game
  function stopGame(){
    $turd.stop();
    $obstacle.stop();
    clearInterval(gameInterval);
    clearInterval(groundInterval);
    $audio.attr('src','sounds/splat.wav');
    $audio.trigger('play');
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
    slideObstacle();
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
    $obstacle.animate({
      'left': '-150'
    },{
      duration: gameSpeed,
      easing: 'linear',
      complete: function() {
        $obstacle.css('left','2000px');
      },
      step: detectCollision
    });
  }


  //function to slide the ground
  function slideGround(){
    $ground.animate({backgroundPosition: '-='+5},1,'linear',slideGround);
  }

  //function for collision detection
  function detectCollision(){
    obstXPos = parseInt($obstacle.css('left'));
    turdYPos = parseInt($turd.css('margin-top'));

    console.log(obstXPos);
    console.log(turdYPos);

    if ( ((turdYPos <= (flyZone[0][0])) || (turdYPos >= (flyZone[1][1])-50) ) && (obstXPos <= 400) ) {
      //collision!
      console.log('returned true');
      stopGame();
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
    let score = parseInt($score.html());

    score++;
    $score.html(score);

    if ( (score % 5) === 0 ) {
      level++;
    }
  }
}

$(flappyTurd);
