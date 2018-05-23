/**
 * @author Emil Lindholm Brandt
 * 15/12-2017
 * This is a small javascript that paints the game of life
 * onto a canvas.
 */

 // To track mouse up/down state
var mousedown = false;
document.querySelector('canvas').addEventListener("mousedown", function () {
    console.log("mousedown");
    mousedown = true;
});
document.querySelector('canvas').addEventListener("mouseup", function () {
    console.log("mouseup");
    mousedown = false;
});

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var cellSize = 40;
canvas.width = window.innerWidth-4;
canvas.height = window.innerHeight-4;

var numCellsX = parseInt(canvas.width / cellSize);
var numCellsY = parseInt(canvas.height / cellSize);

// Set to deciman represeting a procent chance of the node being alive 0-1.
var initialProbability = 0.6;
initialProbability = 1 - initialProbability;

var pixelGrid = new Array(numCellsX);
var previousGeneration;

/**
 * This creates the pixle-grid and randomly fills it with live cells.
 */
function setup() {
    for (let i = 0; i < pixelGrid.length; i++) {
        pixelGrid[i] = new Array(numCellsY);
    }
    for (let i = 0; i < pixelGrid.length; i++) {
        for (let j = 0; j < pixelGrid[1].length; j++) {
            if (Math.random() > initialProbability) {
                pixelGrid[i][j] = 1;
            }
        }
    }
}

/**
 * This function checks how many neighbours that are alive to the
 * cell x, y.
 * @param {number} x value for cell.
 * @param {number} y value for cell.
 * @return {number} The number of neighbours that are alive.
 */
function numAliveNeighbours(x, y) {
    var numAlive = 0;
    for (let i = x-1; i < x+2; i++) {
        for (let j = y-1; j < y+2; j++) {
            
            // It it's itself
            if (i == x && j == y) {
                continue;
            }
            // If the index are out of bounds
            if (i > numCellsX-1 || i < 0 || j > numCellsY-1 ||j < 0) {
                continue;
            }
            if (previousGeneration[i][j] == 1) {
                numAlive++;
            }
        }
    }
    return numAlive;
}

/**
 * This function decides if the cell with the provided x and y values should
 * live or not.
 * @param {number} x value for cell.
 * @param {number} y value for cell.
 * @return {boolean} Returns true of the provided cell should live, false otherwise.
 */
function shouldLive(x, y) {
    // If it's alive at the moment
    if (previousGeneration[x][y] == 1) {
        if (numAliveNeighbours(x, y) < 2) {
            return false;
        } else if (numAliveNeighbours(x, y) < 4) {
            return true;
        } else {
            return false;
        }
    } else if (numAliveNeighbours(x, y) == 3) { // It's dead at the moment
        return true;
    }
}

/**
 * This just copies a array by value and returns a new array which is a copy of the provided one
 * @param {Array[]} oldArr 
 * @return A new array whuch is a copy of the provided one.
 */
function copyArray(oldArr) {
    var newArr = new Array(numCellsX);
    for (let i = 0; i < pixelGrid.length; i++) {
        newArr[i] = new Array(numCellsY);
        for (let j = 0; j < pixelGrid[i].length; j++) {
            newArr[i][j] = pixelGrid[i][j];
        }
    }
    return newArr;
}

/**
 * Updates the state for every cell depending in its neighbours. 
 */
function update() {
    previousGeneration = copyArray(pixelGrid);
    for (let i = 0; i < numCellsX; i++) {
        for (let j = 0; j < numCellsY; j++) {
            // If the cell should live in the next generation
            if(shouldLive(i, j)) {
                pixelGrid[i][j] = 1;
            } else {
                pixelGrid[i][j] = 0;
            }
        }
    }
}

/**
 * Paints the game of life current generation onto the canvas.
 */
function paint() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pixelGrid.length; i++) {
        for (let j = 0; j < pixelGrid[i].length; j++) {
            if (pixelGrid[i][j] == 1) {
                c.fillRect(i*cellSize, j*cellSize, cellSize, cellSize);
            }
        }
    }
}

/**
 * Game loop which does the updating of the data as well as the painting
 * every time it's called.
 */
function game() {
    update();
    paint();
}

// Sets up the game before starting it
setup();
paint();

// Choses the FPS and pace of the game, since they are bound to each other by
// the game logic.
let FPS = 10;
//Starts the interval, so that the function is called at the specified rate.
setInterval(game, 1000/FPS);

function resurrectPixel() {
    console.log("Mousedown: " + mousedown);
    if (!mousedown) {
        return;
    }
    let x = parseInt(event.clientX/cellSize);
    let y = parseInt(event.clientY/cellSize);
    previousGeneration[x][y] = 1;
    pixelGrid[x][y] = 1;
    paint();
}

canvas.addEventListener("mousemove", resurrectPixel);
canvas.addEventListener("mousedown", resurrectPixel);