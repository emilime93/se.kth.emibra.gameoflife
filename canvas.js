var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var cellSize = 12;
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

var numCellsX = parseInt(canvas.width / cellSize);
var numCellsY = parseInt(canvas.height / cellSize);

console.log(numCellsX);
console.log(numCellsY);

var dataGrid = new Array(numCellsX);

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

function update() {
    for (let i = 0; i < dataGrid.length; i++) {
        for (let j = 0; j < dataGrid.length; j++) {
        }
    }
}

function paint() {
    for (let i = 0; i < dataGrid.length; i++) {
        for (let j = 0; j < dataGrid[i].length; j++) {
            if (dataGrid[i][j] == 1) {
            }
        }
    }
}

function game() {
    // update();
    paint();
}

setup();

let FPS = 30;
setInterval(game, 1000/FPS);


