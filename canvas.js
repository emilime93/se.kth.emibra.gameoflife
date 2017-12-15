var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// C for Context
var c = canvas.getContext('2d');

var blobHeight = 150;
var blobWidth = 100;
var x = 0;      var y = 0;
var xDir = 1;   var yDir = 1;
var speed = 5;

function update() {
    x += speed * xDir;
    y += speed * yDir;
    
    if (x + blobWidth > canvas.width || x < 0) {
        xDir *= -1;
    }
    if (y + blobHeight > canvas.height || y < 0) {
        yDir *= -1;
    }    
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillRect(x, y, blobWidth, blobHeight);
}


function game() {
    update();
    draw();
}

var FPS = 60;
setInterval(game, 1000/FPS);