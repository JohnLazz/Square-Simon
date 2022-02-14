const squares = document.querySelectorAll(".game-square");
let currentGameSeq = [];
let userSeq = [];
let currentScore = document.querySelector(".current-score").innerHTML;
let highScore = document.querySelector(".high-score").innerHTML;


// Gets random square from squares array using math.random on array length. 
function randomSquare() {
    let r = Math.floor(Math.random() * squares.length);
    return squares[r];
  }

randomSquare();

// Pushes a random square aquired from randomSquare into currentGameSeq array.
function gameFunction() {
    currentGameSeq.push(randomSquare());
    console.log(currentGameSeq);
}

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
}




