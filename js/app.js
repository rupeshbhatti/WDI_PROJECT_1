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
let flyZone = [];
let level = 2;
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
  let $audio = $('audio');
  let $score = $('#score');

  //set event handlers
  $(window).on('load', dropTurd);
  $(window).on('click', flyTurd);
  $(window).keypress(flyTurd);

  //  groundInterval = setInterval(slideGround, gameSpeed);
  createObstacle();
  gameInterval = setInterval(createObstacle, gameSpeed);

  // function for making turd fall
  function dropTurd(){
    $turd.animate({
      bottom: '-10px'
    }, {
      duration: 3000,
      step: detectCollision
    });
  }

  // function for making turd fly
  function flyTurd(){
    $turd.stop();
    $turd.animate({
      bottom: '+=100px'
    }, {
      duration: 1,
      step: detectCollision
    });

    dropTurd();
  }

  //function to stop game
  function stopGame(){
    $turd.stop();
    $obstacle.stop();
    clearInterval(gameInterval);
    //clearInterval(groundInterval);
    // $audio.attr('src','sounds/splat.wav');
    // $audio.trigger('play');
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
    // const portionHeight = ($obstacle.height())/6;
    // const zones = {'1': [0,portionHeight], '2': [portionHeight,portionHeight*2], '3': [portionHeight*2,portionHeight*3], '4': [portionHeight*3,portionHeight*4], '5': [portionHeight*4,portionHeight*5], '6': [portionHeight*5,portionHeight*6]};
    //
    // // set the flyableZone
    // flyZone[0] = (zones[portion1]);
    // flyZone[1] = (zones[portion2]);

    // set the background-color for randomNo and randomNo2 to transparent
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
        $obstacle.css('left','2000px');
      }
    });
  }


  //function to slide the ground
  function slideGround(){
    $ground.animate({backgroundPosition: '-='+5},1,'linear',slideGround);
  }

  //function for collision detection
  function detectCollision(){
    const $lisToBlock = $('.not-flyable');
  console.log($lisToBlock.length)
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
        //console.log(false);
      } else {
        console.log('HIT');
        $div2.css('background', 'red');
        stopGame();
      }
    }

  }

  //function for incrementing the score each time an obstacle is passed
  function incrementScore(){
    let score = parseInt($score.html());

    score++;
    $score.html(score);

    // if ( (score % 5) === 0 ) {
    //   level++;
    // }
  }
}

$(flappyTurd);
