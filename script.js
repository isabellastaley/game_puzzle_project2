var Number_of_moves = 0;
var time = 0;
var timerInterval;
// Isabella Staley 11/1/2026
// Start timer on load
window.onload = function() {
    startNewGame();
    timerInterval = setInterval(function() {
        time++;
        document.getElementById("timer").innerText = time;
    }, 1000);

    document.getElementById("newButton").onclick = startNewGame;
    document.getElementById("simpleButton").onclick = startSimpleGame;
};

// Swap class names between two table cells
function swapTiles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

// Click Handler logic checking orthogonal neighbors (up, down, left, right)
function clickTile(row, column) {
    var cell = "cell" + row + column;
    
    // Check Top Neighbor
    if (row > 1 && document.getElementById("cell" + (row - 1) + column).className === "tile16") {
        swapTiles(cell, "cell" + (row - 1) + column);
        Number_of_moves++;
        updateMoves();
        setTimeout(() => { Win(); }, 200);
        return;
    }
    // Check Bottom Neighbor
    if (row < 4 && document.getElementById("cell" + (row + 1) + column).className === "tile16") {
        swapTiles(cell, "cell" + (row + 1) + column);
        Number_of_moves++;
        updateMoves();
        setTimeout(() => { Win(); }, 200);
        return;
    }
    // Check Left Neighbor
    if (column > 1 && document.getElementById("cell" + row + (column - 1)).className === "tile16") {
        swapTiles(cell, "cell" + row + (column - 1));
        Number_of_moves++;
        updateMoves();
        setTimeout(() => { Win(); }, 200);
        return;
    }
    // Check Right Neighbor
    if (column < 4 && document.getElementById("cell" + row + (column + 1)).className === "tile16") {
        swapTiles(cell, "cell" + row + (column + 1));
        Number_of_moves++;
        updateMoves();
        setTimeout(() => { Win(); }, 200);
        return;
    }
}

function updateMoves() {
    document.getElementById("counter").innerText = Number_of_moves;
}

// Scramble tiles randomly for a New Game
function startNewGame() {
    Number_of_moves = 0;
    time = 0;
    updateMoves();

    var tiles = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", 
                 "tile9", "tile10", "tile11", "tile12", "tile13", "tile14", "tile15", "tile16"];
    
    // Shuffle array using Math.random
    tiles.sort(() => Math.random() - 0.5);

    // Assign to grid cells
    var index = 0;
    for (var r = 1; r <= 4; r++) {
        for (var c = 1; c <= 4; c++) {
            document.getElementById("cell" + r + c).className = tiles[index];
            index++;
        }
    }
}

// Simple Game mode: only 1 move away from winning
function startSimpleGame() {
    Number_of_moves = 0;
    time = 0;
    updateMoves();

    // Set standard sequential order for 1-15, but swap tile 15 and tile 16 (white space)
    var index = 1;
    for (var r = 1; r <= 4; r++) {
        for (var c = 1; c <= 4; c++) {
            var cellID = "cell" + r + c;
            if (r === 4 && c === 3) {
                document.getElementById(cellID).className = "tile16"; // empty space at row 4, col 3
            } else if (r === 4 && c === 4) {
                document.getElementById(cellID).className = "tile15"; // tile 15 shifted next to it
            } else {
                document.getElementById(cellID).className = "tile" + index;
            }
            index++;
        }
    }
}

// Check Win Condition
function Win() {
    if (
        document.getElementById("cell11").className === "tile1" &&
        document.getElementById("cell12").className === "tile2" &&
        document.getElementById("cell13").className === "tile3" &&
        document.getElementById("cell14").className === "tile4" &&
        document.getElementById("cell21").className === "tile5" &&
        document.getElementById("cell22").className === "tile6" &&
        document.getElementById("cell23").className === "tile7" &&
        document.getElementById("cell24").className === "tile8" &&
        document.getElementById("cell31").className === "tile9" &&
        document.getElementById("cell32").className === "tile10" &&
        document.getElementById("cell33").className === "tile11" &&
        document.getElementById("cell34").className === "tile12" &&
        document.getElementById("cell41").className === "tile13" &&
        document.getElementById("cell42").className === "tile14" &&
        document.getElementById("cell43").className === "tile15" &&
        document.getElementById("cell44").className === "tile16"
    ) {
        window.alert("CONGRATULATIONS!\n\nYou've successfully reordered the puzzle numbers in sequential order!\n\nNumber of moves it took to complete: " + Number_of_moves + "\nTime spent to complete it: " + time + " second(s).\n\nTo play again, click OK");
        window.location.reload();
    }
}