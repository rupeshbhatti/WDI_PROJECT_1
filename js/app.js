//global variables
let $turd;
let $obstacle;
let $score;
let $level;
let $messageArea;
let $flyAgain;
let $countdown;
let gameInterval = null;
let gameSpeed = 5000;
let gameMusic = null;
let soundEffect = null;

//main function
function flappyTurd(){
  $turd = $('#turd');
  $obstacle = $('ul');
  $score = $('#score');
  $level = $('#level');
  $messageArea = $('.message-area');
  $flyAgain = $('button');
  $countdown = $('#countdown');

  init();

  // function to initialise click handlers, game music, backgrounds and game ready for play
  function init(){

    //function that plays game music
    function playGameMusic(){
      gameMusic = new Audio('sounds/The-Treasure-NES.mp3');

      gameMusic.play();
    }

    //function that animates the background using
    function animateBackground(){
      $('#clouds').pan({fps: 1000, speed: gameSpeed, dir: 'left'});
      $('#trees').pan({fps: 500, speed: gameSpeed/3, dir: 'left'});
      $('#hills').pan({fps: 30, speed: gameSpeed/5, dir: 'left'});
      $('footer').pan({fps: 100, speed: gameSpeed, dir: 'left'});
      $('#clouds, #trees, #hills, footer').spRelSpeed(30);
    }

    //function that begins game start countdown
    function countdown(){

      const cdInterval = setInterval( ()=> {
        let cd = parseInt($countdown.html());
        cd -=1;
        $countdown.html(cd);

        if (cd === 0){
          clearInterval(cdInterval);
          $countdown.toggle();
        }
      },1000);
    }

    $messageArea.css('display','none');
    $(window)
      .on('load', () => {
        playGameMusic();
        dropTurd();
      })
      .on('click', flyTurd)
      .keypress(flyTurd);

    $flyAgain
      .on('click', () => {
        location.reload();
      });

    animateBackground();
    gameInterval = setInterval(createObstacle, gameSpeed);
    countdown();
  }

  // function for making turd fall
  function dropTurd(){
    // $turd.css('transform','rotate(30deg)');
    $turd.animate({
      bottom: '120px'
    }, {
      duration: 1000,
      step: detectCollision,
      easing: 'easeInOutSine',
      complete: stopGame
    });
  }

  // function for making turd fly
  function flyTurd(){
    soundEffect = new Audio('sounds/Swish.mp3');

    $turd.stop();
    $turd.animate({
      bottom: '+=50px'
    }, {
      duration: 50,
      step: detectCollision,
      easing: 'easeInQuart',
      complete: function() {
        if (($(this).css('top')) <= '200px') {
          stopGame();
        }
      }
    });

    soundEffect.play();
    dropTurd();
  }

  //function to stop game
  function stopGame(){
    soundEffect = new Audio('sounds/splat.wav');
    $turd.stop();
    gameMusic.pause();
    soundEffect.play();
    $obstacle.stop();
    $('#clouds, #trees, #hills, footer').spStop();
    clearInterval(gameInterval);
    $messageArea.show();

    // $(window).unbind();
  }

  //function to create an obstacle with a random portion of two consecutive lis missing i.e. flyzone
  function createObstacle(){

    //function to generate a random number between min and max value
    function generateRandomNum(min,max){
      return (Math.floor(Math.random() * (max)) + min);
    }

    const randomNo1 = generateRandomNum(1,5);
    const randomNo2 = randomNo1 + 1;

    for (let i = 1; i < 7; i++) {
      $(`ul li#${[i]}`)
        .removeClass('flyable')
        .addClass('not-flyable')
        .css('background-image','url(images/shrub.jpg)');
    }

    flyableZone(randomNo1,randomNo2);
    slideObstacle();
  }

  //function to set the flyable zone within the obstacle
  function flyableZone(portion1, portion2){

    function makeLiFlyable(li){
      $(`ul li#${li}`)
        .css('background-color','transparent')
        .css('background-image','none')
        .addClass('flyable')
        .removeClass('not-flyable');
    }

    makeLiFlyable(portion1);
    makeLiFlyable(portion2);

  }

  //function to slide obstacle into view from right of screen to left and then loop
  function slideObstacle(){
    $obstacle.animate({
      'left': '-150'
    },{
      duration: gameSpeed,
      easing: 'linear',
      complete: function() {
        incrementScore();
        $obstacle.css('left','2000px');
      }
    });
  }

  //function to detect a collision
  function detectCollision(){
    const $lisToBlock = $('.not-flyable');
    const $div1 = $(this);

    for (let i = 0; i < $lisToBlock.length; i++) {
      const $div2 = $($lisToBlock[i]);
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2){
        //no collision
      } else {
        //collision
        $div2.attr('class','animated jello');
        stopGame();
      }
    }
  }

  // function for incrementing the level
  function incrementLevel(){
    let currentLevel = parseInt($level.html());
    const newLevel = ++currentLevel;
    soundEffect = new Audio('sounds/Level-up.wav');

    $('#level-board').attr('class','animated slideInRight');
    gameSpeed = gameSpeed - 1000;
    $level.html(newLevel);
    $('#level-board').removeClass('animated slideInRight');

    soundEffect.play();
  }

  //function for incrementing the score each time an obstacle is passed
  function incrementScore(){
    let currentScore = parseInt($score.html());
    const newScore = ++currentScore;
    soundEffect = new Audio('sounds/Score.wav');

    $score.html(newScore);

    soundEffect.play();

    if ( (newScore % 5) === 0 ) {
      incrementLevel();
    }
  }
}

$(flappyTurd);
