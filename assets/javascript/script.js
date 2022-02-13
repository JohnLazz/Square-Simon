const squares = document.querySelectorAll(".game-square");
let currentGameSeq = [];
let currentScore = $(".current-score");
let highScore = $(".high-score");


// Gets random square from squares array using math.random on array length. 
function randomSquare() {
    let r = Math.floor(Math.random() * squares.length);
    console.log(squares[r]);
    return squares[r];
  }

randomSquare();

// Adds then removes opaque css class to square using timeout inside promise, to create flashing effect.
function flashSquare(square) {
    return new Promise((resolve) => {
        square.classList.add("opaque");
        setTimeout(() => {
            resolve(square.classList.remove("opaque"));
        }, 1000);
    });
};

// Testing flashSquare on squares array using async function to await each flash. 
const flashing = async () => {
    for (let square of squares) {
        await flashSquare(square);
    }
};

flashing();



