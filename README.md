<h1 style="text-align: center">Square Simon</h1>
<br>

## Code institute Milestone Project 2 showcasing javascript.

[Click here for the live project.](https://johnlazz.github.io/Square-Simon/)

Here is a screenshot of the finished game. 

![](/assets/images/square-simon-finished.png)

<hr>
 
 <h2 style="text-align: center">User Experience</h2>

 Square simon is a game played in the browser, based off the 
 [Simon game released in the late 70's.](https://en.wikipedia.org/wiki/Simon_(game) "Wikipedia") It is a fun memory game that progressively increases in difficulty each level. One of four coloured squares will light up, the user must then click the same square. Each level a new random square will be added to the sequence that the user must repeat. 

 The game should show the user their score as a number of how many round of the sequence they have correctly copied. A high score could also be shown to let the user know their best round and attempt to beat it, making the game more fun. 

 When the game's random sequence is playing, each time a square flashes a sound will play. When the user clicks on a square, a different sound will play. This makes the overall gameplay a richer experience. 

 The user needs an easy way to initiate a new game, with a simple **START GAME** button. 

 The only user goal for this web page is: have fun playing the game. *(and perhaps beat that high score!)*

 ## Design

 1. ### Colour 
 - I wanted a modern take on the colour pallete for the game so went to [coolors](https://coolors.co/ "coolors.co") to create it. I chose a dark purple for the background, and used the websites features to pick out complementing colours to replace the basic primary style colours from the original simon. The text on the page is simply a lighter shade of the background, to create contrast for ease of reading. *(Colours on the buttons are inverted background/text colours.)*

 2. ### Font Family
 - To keep with the square theme, I wanted a font style that was square-looking and resembled 70s/80s game styling. For this I used [google fonts](https://fonts.google.com/) and picked out the rather fitting "Nova Square" font family. 

 3. ### Game Page Layout
 - The game is simple in nature and therefore I already had a good idea of the layout of the page. Going down the page I wanted:
 1. A title at the top,
 2. A short description with the **START GAME** button,
 3. The main game feature, 4 coloured squares arranged accordingly to resemble the original simon game. 
 4. Finally, a scores section. 

 <hr>

 <h2 style="text-align:center">Technologies Used</h2>

 - [HTML5](https://en.wikipedia.org/wiki/HTML5)
 - [CSS3](https://en.wikipedia.org/wiki/CSS)
 - [Javascript](https://en.wikipedia.org/wiki/JavaScript)
 - [jQuery](https://jquery.com/)
 - [Gitpod](https://gitpod.io) is the IDE used to code the site.
 - [Git](https://git-scm.com/) used for version control to commit files to local repository and push files to Github repository.
 - [Github](https://github.com/) stores project files externally from the IDE after being pushed. Also used to deploy the live site.

 In the javascript file I have used both vanilla javascript and jquery to assign variables and create functions to make the game run. This is to showcase knowledge and use of both JS and jQuery. 

 <hr>

 <h2 style="text-align:center">Testing</h2>

The only goal for the user is to have fun playing the game. Therefore to test against this user goal, the game has to be complete and playable. To get to this point, multiple issues arised during development and had to be overcome through testing and research. 

The HTML and CSS had no issues as it is all reasonably basic. 

The first major hurdle I came across when writing the javascript was finding a way to add and remove a css class from a square after a specific amount of time, to create the effect the square is 'flashing'. After some extensive research, building a function using a promise with a timeout seemed the best available option. 

![](/assets/images/flashSquare-1-timeout.png)

Here is the documentation researched: [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

I could then use an async function to call this on an array (filled with the square html elements) so that each flash would happen after the previous one had finished.

![](/assets/images/flash-testing.png)
*Calling flashing(); function like above so code would run on page refresh to test.

Here is the documentation researched: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [article on Synchronous vs Asynchronous](https://www.freecodecamp.org/news/synchronous-vs-asynchronous-in-javascript/).

This worked fine on the squares array as it was simply a list of the 4 different square html elements. However when changed so the function would iterate through random squares placed into an array:

```javascript
for (let square of currentGameSeq)
```

 if the same square was repeated in the array *e.g. [square-1, square-2, square-2, ...etc]* then said square would 'flash' for twice as long, instead of flashing twice. This was obviously fixable with a second timeout, so that after removing the 'opaque' class it would wait *x* time until moving to the next line of code. 

 To get this to work I had to go through some trial and error in how to write this code: 

 ![](/assets/images/2nd-timeout-code-bug.png)

 The above code (my first attempt) actually started the next iteration whilst the last one was still going, creating an overlapping effect for the 'flashing'. 

 I then tried nesting the second timeout which also didn't work to begin with, after staring at it for quite some time I realised the function had one promise but two resolves (which I also hadn't caught in the above code snippet). 

 ![](/assets/images/2nd-timeout-2-resolves.png)

 With this now working I had to find a way to check if the user's input sequence matched the game's randomly generated sequence, which are stored in arrays. Originally I assumed simply checking 

 ```javascript
 userSeq == currentGameSeq 
 // or
 userSeq === currentGameSeq
 ```
 would come back true, however it returns false. Back to researching. 

 ```javascript
 // Checks if arrays are equal. Without this userSeq == currentGameSeq returns false even with the same values.
// Code taken from: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  ```

  With the above code I could now write a check function that works by asking if userSeq is equal to currentGameSeq. Below is a test I done in dev tools console to check the code was working.

  ![](/assets/images/arraysEqual-console.png)

  After finishing my javascript code, I ran it through [JSHint](https://jshint.com/) to check for any issues. 

  ![](/assets/images/jshint-warnings.png)

  After fixing some syntax issues from the above warnings, these were the remaining ones: 

  ![](/assets/images/jshint-fixed.png)

  The two 'unused variables' are functions that are called with onclick in the html. 
  
  ```html
<button onclick="startGame()">START<br>GAME!</button>
       
<button onclick="check()">CHECK<br>ANSWER</button>
```
  
  The remaining warning regarding async functions only available in ES8 required me to check browser usability for ES8. [This caniuse page](https://caniuse.com/async-functions) on async functions declares that most up to date, modern browsers support them. With the major exception of Internet Explorer. Meaning the game will not run in the IE web browser. 

  Tested the game by asking a couple family and friends to play, everyone claimed to have fun playing the game. Therefore against the user goal of having fun playing the game, this test passes. 

  Here is a screenshot of the finished game in action, with current and high score being updated and a square flashing! 

  ![](/assets/images/square-simon-in-use.png)

  ## Known Bugs

  If a user clicks a square too quickly in succession, the square will not flash or play a sound (because the timeouts are not complete/previous audio has not finished playing). This may confuse the user on their input sequence and lead to a game over. 

  If a user clicks the check answer button *before* start game when the page has been refreshed, they will get +1 score "for free". This is because user sequence and game sequence are both currently empty [ ], therefore pass true when going through the checkAnswer function. The game will continue as normal therefore if the user is smart they may use this for a "free point". 

<hr>

  <h2 style="text-align: center">Credits</h2>

  *Most of the resources and external code used has been credited above, in the Design and Testing sections.*

[Music & Sounds Effect Library](https://www.youtube.com/channel/UCb-iLJ2ifYw0mV8AaAa1fFA) Copyright free 8 bit sounds taken from here. Chopped and sampled into seperate sound files using [Logic Pro](https://www.apple.com/uk/logic-pro/).

Below, the code used to play sounds using javascript, taken from [here](https://www.w3schools.com/jsref/met_audio_play.asp).

```javascript
var x = document.getElementById("myAudio");

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
} 
```