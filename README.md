![](https://www.coindesk.com/wp-content/themes/coindesk2/images/events/consensus-2015/sponsors-and-partners/general-assembly.png)
# GA WDI30 Project 1: 'Flappy Turd'

## Introduction

In week 3 of the Web Development Immersive course at General Assembly London, I built a game using Javascript, JQuery, HTML5 and CSS3. 'Flappy Turd' is a humourous take on the game made famous in 2013 and built by Vietnamese video game artist and programmer Dong Nguyen. 

## Concept 

The idea behind the game is simple but hugely addictive. Using either mouseclicks or the spacebar, the user must keep Flappy Turd airborne. Each time an obstacle is successfully passed, the score is incremented: the game gets faster each time the user goes up a level. The game is set on a sunny day in an animated countryside setting. 

## Libraries / external stylesheets used

* Google fonts
* Animate.css
* Reset.css
* Spritely JQuery Library
* JQuery easing

## Screenshots

![Screenshot](/screenshots/screenshot)

![Screenshot2](/screenshots/Screenshot2)

## Heroku Link
[https://flappyturd.herokuapp.com/]()

## What went well

Initially, I had created the animations for the turd falling / flying, the obstacles sliding across the screen and the grass in the foreground by incrementing pixel values within an interval (using the JQuery `.css()` method). The issue with this approach was that the animations were juddery as a result. I improved this by rewriting the code using the JQuery `.animate()` method instead. This vastly improved performance and playability of the game.

I implemented the moving background using the JQuery Spritely library. In order to achieve the desired effect, I had to lay my HTML out so that each individual layer (i.e. the long grass in the foreground, the hills, the trees and clouds were respective layers on top of eachother. By setting varying z-indices for each layer in the CSS, I was able to accomplish the desired effect of depth on the page in an otherwise 2D space. I appreciated using the Spritely framework as it simplified the process of animating each layer: in a single line, I could specify the pan speed, frames per second and direction e.g.

`$('#clouds').pan({fps: 1000, speed: gameSpeed, dir: 'left'});`

## Challenges

The collision logic was a great problem to solve. The way I implemented this was as follows:

1. To begin with, an obstacle is created. The obstacle is an Unordered List (UL) consisting of 6 List Items (LIs). Initially, each LI is given a class of `not-flyable` and a background image of a shrub in the DOM.
2. Two randomly picked contiguous LIs are removed. The class of `not-flyable` is replaced in the DOM by a `flyable` class for these two LIs. The `background-color` CSS property is set to `transparent` for these LIs along with a `background-image` of `none`.
3. In the `detectCollision()` function, we iterate through all LIs with a class of `not-flyable` and check whether `$div1` i.e. the Turd has collided with any of these LIs. 

In this way, Flappy Turd is able to successfully fly through `flyable` spaces but not through those set to `not-flyable`.

Another problem I encountered was with the use of Audio. I initially utilised `<Audio></Audio>` HTML5 tags. Through Javascript, I was then setting an audio src and then playing the audio. This resulted in an intermittent console error: `uncaught in promise - DOMException play request interrupted`. I fixed this by using a slightly different approach with regards playing Audio: using the `new Audio()` constructor in my Javascript. This ensures that the Audio is always available at runtime and therefore there isn't an issue with uncaught promises in the event that we attempt to pause audio that the browser doesn't know is playing.

## Feature backlog

I would implement the following features in this game:

1. **Responsive** I ran out of time but with more time, I would ensure that this project is mobile responsive and that the Turd character works on different devices (bearing in mind that I am using the unicode value for the emoji rather than an image)
2. **Rotation** As per the original Flappy Bird game, I would include rotation of the Turd character using `$turd.css('transform','rotate(30deg)')` so that the Turd would rotate forward or backward each time it flies or falls
3. **Pause game**
4. **Mute Audio**
5. **High Score** Either by persisting the score in the browser's memory or via backend integration
6. **Weather API** Perhaps the more extravagant of these features: the ability to change the animated background based on the current weather outside

## Final thoughts

I had a lot of fun making and then playing this game! It was a great first project as I became familiar with JQuery documentation and experimented further with CSS. I am proud with the resultant playability of the game and also the final UI.


