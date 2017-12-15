var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var cellSize = 12;
canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

var numCellsX = parseInt(canvas.width / cellSize);
var numCellsY = parseInt(canvas.height / cellSize);

console.log(numCellsX);
console.log(numCellsY);

var dataGrid = new Array(numCellsX);
var previousGeneration;

function setup() {
    
    // C for Context
    c.strokeStyle = '#bebebe';
    
    var x = 0; var y = 0;
    
    // Paint the grid
    for (var i = 0; i < numCellsX; i++) {
        y = 0;
        for (var j = 0; j < numCellsY; j ++) {
            c.rect(x, y, cellSize, cellSize);
            y += cellSize;
        }
        x += cellSize; 
    }
    // Actually paint it onto the canvas
    c.stroke();


    for (let i = 0; i < dataGrid.length; i++) {
        dataGrid[i] = new Array(numCellsY);
    }
    for (let i = 0; i < dataGrid.length; i++) {
        for (let j = 0; j < dataGrid[1].length; j++) {
            if (Math.random() > 0.7) {
                dataGrid[i][j] = 1;
            } else {
                dataGrid[i][j] = 0;
            }
        }
    }
}

var first = true;
function numAliveNeighbours(x, y) {
    var numAlive = 0;
    for (let i = x-1; i < x+2; i++) {
        for (let j = y-1; j < y+2; j++) {
            
            // It it's itself
            if (i == x && j == y) {
                continue;
            }
            if (i > numCellsX-1 || i < 0 || j > numCellsY-1 ||j < 0) {
                continue;
            }
            if (first) {
                console.log('i: ' + i + 'j: ' + j + ' | value: ' + previousGeneration[x][y]);
            }
            try {
                if (previousGeneration[i][j] == 1) {
                    numAlive++;
                }
                // numAlive += previousGeneration[x][y];
            } catch(err){console.log("ERROR");}
        }
    }
    if (first) {
        console.log('looking at node(x, y): ' + x + ', ' +  y + ' value: ' + previousGeneration[x][y] + ' numAlive = ' + numAlive);
    }
    first = false;
    return numAlive;
}

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
 * Should work?
 */
function copyArray(oldArr) {
    var newArr = new Array(numCellsX);
    for (let i = 0; i < dataGrid.length; i++) {
        newArr[i] = new Array(numCellsY);
        for (let j = 0; j < dataGrid[i].length; j++) {
            newArr[i][j] = dataGrid[i][j];
        }
    }
    return newArr;
}

function update() {
    previousGeneration = copyArray(dataGrid);
    for (let i = 0; i < numCellsX; i++) {
        for (let j = 0; j < numCellsY; j++) {
            // If the cell should live in the next generation
            if(shouldLive(i, j)) {
                dataGrid[i][j] = 1;
            } else {
                dataGrid[i][j] = 0;
            }
        }
    }
}

function paint() {
    for (let i = 0; i < dataGrid.length; i++) {
        for (let j = 0; j < dataGrid[i].length; j++) {
            if (dataGrid[i][j] == 1) {
                c.fillRect(i*cellSize, j*cellSize, cellSize, cellSize);
            } else {
                c.clearRect(i*cellSize, j*cellSize, cellSize, cellSize);
            }
        }
    }
}

function game() {
    update();
    paint();
}

setup();
paint();

let FPS = 10;
setInterval(game, 1000/FPS);