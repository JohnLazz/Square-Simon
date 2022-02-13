const squares = document.querySelectorAll(".game-square");
let currentGameSeq = [];
let currentScore = $(".current-score");
let highScore = $(".high-score");

// Gets random sqaure from squares array using math.random on array length. 
function randomSquare() {
    let r = Math.floor(Math.random() * squares.length);
    console.log(squares[r]);
    return squares[r];
  }

randomSquare();

