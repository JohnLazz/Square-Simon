const squares = document.querySelectorAll(".game-square");
const firstSquare = document.querySelector(".square-1");
const secondSquare = document.querySelector(".square-2");
const thirdSquare = document.querySelector(".square-3");
const fourthSquare = document.querySelector(".square-4");
const startButton = document.querySelector(".start-game");
let currentGameSeq = [];
let userSeq = [];
let currentScore = document.querySelector(".current-score").innerHTML;
let highScore = document.querySelector(".high-score").innerHTML;

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

randomSquare();

// Pushes a random square aquired from randomSquare into currentGameSeq array.
function gameFunction() {
    currentGameSeq.push(randomSquare());
    console.log(currentGameSeq);
};

// Adds then removes opaque css class to square using timeout inside promise, to create flashing effect.
function flashSquare(square) {
    return new Promise((resolve) => {
        square.classList.add("opaque");
        setTimeout(() => {
            (square.classList.remove("opaque"));
            setTimeout(() => {
                resolve();
            }, 500);
        }, 1000);
    });
};

// Indicates game sequence by calling flashSquare on currentGameSeq, array using async function to await each flash. 
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