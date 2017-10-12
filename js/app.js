//define global variables

//turd
let $turd;
let $turdXPos;
let $turdYPos;

//obstacle
let $obstacle;
let $obstXPos;

//level
let $ground;
let $audio;
let $score;
let $level;
let $splat;
let $gameOver;
let flyZone = [];
let gameOver = false;
let gameInterval = null;
let groundInterval = null;
let gameSpeed = 5000;

//main function
function flappyTurd(){

  //turd
  $turd = $('#turd');
  $turdXPos = parseInt($turd.css('left'));

  //obstacle
  $obstacle = $('ul');

  //level
  $ground = $('footer');
  $level = $('#level');
  $splat = $('#splat').hide();
  $gameOver = $('#game-over').hide();
  let $audio = $('audio');
  let $score = $('#score');

  //set event handlers
  $(window).on('load', dropTurd);
  $(window).on('load', function(){
    $audio.attr('src','sounds/The-Treasure-NES.mp3');
    $audio.trigger('play');
  });
  $(window).on('click', flyTurd);
  $(window).keypress(flyTurd);

  $('#clouds').pan({fps: 1000, speed: gameSpeed, dir: 'left'});
  $('#trees').pan({fps: 500, speed: gameSpeed/3, dir: 'left'});
  $('#hills').pan({fps: 30, speed: gameSpeed/5, dir: 'left'});
  $('footer').pan({fps: 30, speed: gameSpeed, dir: 'left'});
  $('#clouds, #trees, #hills, footer').spRelSpeed(30);


  //groundInterval = setInterval(slideGround, gameSpeed);
  createObstacle();
  gameInterval = setInterval(createObstacle, gameSpeed);

  // function for making turd fall
  function dropTurd(){
    $turd.animate({
      bottom: '120px'
    }, {
      duration: 1000,
      step: detectCollision,
      easing: 'easeInOutSine'
    });
  }

  // function for making turd fly
  function flyTurd(){
    $turd.stop();
    $turd.animate({
      bottom: '+=50px'
    }, {
      duration: 50,
      step: detectCollision,
      easing: 'easeInQuart'
    });

    //play swish sound effect
    const soundEffect = new Audio('sounds/Swish.mp3');
    soundEffect.play();

    dropTurd();
  }

  //function to detect whether audio is playing
  function isPlaying(audioelement){
    return !audioelement.paused;
  }

  //function to stop game
  function stopGame(){
    $turd.stop();
    $obstacle.stop();
    $splat.toggle();
    $gameOver.toggle();
    if (isPlaying($audio)){
      $audio.trigger('pause');
      $audio.currentTime = 0;
      $audio.attr('src','sounds/Splat.wav');
      $audio.trigger('play');
    }
    clearInterval(gameInterval);
    clearInterval(groundInterval);

  }

  //function to create an obstacle with a random portion of two consecutive lis missing i.e. flyzone
  function createObstacle(){
    //generate a random number between 0 and 5
    const randomNo1 = Math.floor(Math.random() * (5)) + 1;
    const randomNo2 = randomNo1 + 1;

    //set background-color for all to mediumseagreen initially
    for (let i = 1; i < 7; i++) {
      //set background-color
      $(`ul li#${[i]}`).removeClass('flyable');
      $(`ul li#${[i]}`).addClass('not-flyable');
      $(`ul li#${[i]}`).css('background-color','mediumseagreen');
    }

    flyableZone(randomNo1,randomNo2);
    slideObstacle();
  }

  function flyableZone(portion1, portion2){
    $(`ul li#${portion1}`).css('background-color','transparent');
    $(`ul li#${portion2}`).css('background-color','transparent');
    $(`ul li#${[portion1]}`).addClass('flyable');
    $(`ul li#${[portion2]}`).addClass('flyable');

    // set the class for portion1 and portion2 to flyable
    $(`ul li#${portion1}`).removeClass('not-flyable');
    $(`ul li#${portion2}`).removeClass('not-flyable');

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

  //function to slide the ground
  function slideGround(){
    $ground.animate({backgroundPosition: '-='+5},1,'linear',slideGround);
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
        $div2.css('background', 'red');
        stopGame();
      }
    }
  }

  // function for upping the level
  function levelUp(){
    let level = parseInt($level.html());

    level++;
    $('#level-board').attr('class','animated slideInRight');
    gameSpeed = gameSpeed - 1000;
    $level.html(level);
    $('#level-board').removeClass('animated slideInRight');

    //play level-up sound effect
    const soundEffect = new Audio('sounds/Level-up.wav');
    soundEffect.play();
  }

  //function for incrementing the score each time an obstacle is passed
  function incrementScore(){
    let score = parseInt($score.html());

    score++;
    $score.html(score);
    //play score sound effect
    const soundEffect = new Audio('sounds/Score.wav');
    soundEffect.play();

    if ( (score % 5) === 0 ) {
      levelUp();
    }
  }
}

$(flappyTurd);
