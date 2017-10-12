//global variables
let $turd;
let $obstacle;
let $audio;
let $score;
let $level;
// let $splat;
// let $gameOver;
let gameInterval = null;
let gameSpeed = 5000;

//main function
function flappyTurd(){
  $turd = $('#turd');
  $obstacle = $('ul');
  $audio = $('audio');
  $score = $('#score');
  $level = $('#level');
  // $splat = $('#splat').hide();
  // $gameOver = $('#game-over').hide();

  //set event handlers
  $(window).on('load', () => {
    dropTurd();
    $audio.attr('src','sounds/The-Treasure-NES.mp3');
    $audio.trigger('play');
  });
  $(window).on('click', flyTurd);
  $(window).keypress(flyTurd);

  //animate background
  $('#clouds').pan({fps: 1000, speed: gameSpeed, dir: 'left'});
  $('#trees').pan({fps: 500, speed: gameSpeed/3, dir: 'left'});
  $('#hills').pan({fps: 30, speed: gameSpeed/5, dir: 'left'});
  $('footer').pan({fps: 100, speed: gameSpeed, dir: 'left'});
  $('#clouds, #trees, #hills, footer').spRelSpeed(30);

  gameInterval = setInterval(createObstacle, gameSpeed);

  // function for making turd fall
  function dropTurd(){
    // $turd.css('transform','rotate(180deg)');
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
    // $splat.toggle();
    // $gameOver.toggle();
    $('#clouds, #trees, #hills, footer').spStop();
    if (isPlaying($audio)){
      $audio.trigger('pause');
      $audio.currentTime = 0;
      $audio.attr('src','sounds/Splat.wav');
      $audio.trigger('play');
    }

    clearInterval(gameInterval);
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
