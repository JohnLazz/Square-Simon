const squares = document.querySelectorAll(".game-square");
const firstSquare = document.querySelector(".square-1");
const secondSquare = document.querySelector(".square-2");
const thirdSquare = document.querySelector(".square-3");
const fourthSquare = document.querySelector(".square-4");
const startButton = document.querySelector(".start-game");
let currentGameSeq = [];
let userSeq = [];
var sound1 = document.getElementById("sound-1"); 
var sound2 = document.getElementById("sound-2"); 

$(".square-1").click(function() {
    userSeq.push(firstSquare);
});
$(".square-2").click(function() {
    userSeq.push(secondSquare);
});
$(".square-3").click(function() {
    userSeq.push(thirdSquare);
});
$(".square-4").click(function() {
    userSeq.push(fourthSquare);
});

// Gets random square from squares array using math.random on array length. 
function randomSquare() {
    let r = Math.floor(Math.random() * squares.length);
    return squares[r];
  };

// Pushes a random square aquired from randomSquare into currentGameSeq array.
function gameFunction() {
    currentGameSeq.push(randomSquare());
};

// Adds then removes opaque css class to square using timeout inside promise, to create flashing effect. 
// Uses .classList.add/remove because using vanilla js.
function flashSquare(square) {
    return new Promise((resolve) => {
        square.classList.add("opaque");
        sound1.play();
        setTimeout(() => {
            (square.classList.remove("opaque"));
            setTimeout(() => {
                resolve();
            }, 500);
        }, 1000);
    });
};

// Indicates game sequence by calling flashSquare on currentGameSeq array, using async function to await each flash. 
async function flashing() {
    for (let square of currentGameSeq) {
        await flashSquare(square);
    }
};

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

// startGame called when start game button is clicked. Clears all sequence array's and calls gameFunction and flashing to begin level 1. 
function startGame() {
    userSeq = [];
    currentGameSeq = [];
    gameFunction();
    flashing();
    Score = 0;
    document.querySelector(".current-score").innerHTML =" "+Score;
};

highScore = 0;

// Checks if user input is correct and implements another level to the game. Clears userSeq (otherwise array would stack with inputs from each level)
// and increments score. If user input incorrect ends game with alert. 
function check() {
    if (arraysEqual(userSeq, currentGameSeq)) {
        userSeq = [];
        gameFunction();
        flashing();
        Score++;
        document.querySelector(".current-score").innerHTML =" "+Score;
        if (highScore < Score) {
            document.querySelector(".high-score").innerHTML = " "+Score;
            highScore = Score;
        }
    }
    else {
        alert(`GAME OVER! You got ${Score} points! Click start game button to play again.`)
        document.querySelector(".high-score").innerHTML = " "+Score;
        highScore = Score;
    }
}

// Short square flash to better indicate user has clicked on a square.
// Uses .add/removeClass because using jquery. 
$(".game-square").click(function(){
    return new Promise((resolve) => {
        $(this).addClass("opaque");
        sound2.play();
        setTimeout(() => {
            ($(this).removeClass("opaque"));
            setTimeout(() => {
                resolve();
            }, 300);
        }, 300);
    });
})

