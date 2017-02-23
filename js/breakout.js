/*
 under MIT license 
 */
/* 
 Created on : Feb 23, 2017, 9:35:48 PM
 Author     : Jérémie Mosset-Chafik
 */

//canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Game variables
var gameOver = false;
var score = 0;
var lives = 3;


//Ball characteristics
var x = canvas.width / 2;
var y = canvas.height - 30;
var xSpeed = 2;
var ySpeed = -2;
var ballRadius = 10;

//Paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleSpeed = 2;

//Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//Controls
var rightPressed = false;
var leftPressed = false;


var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

draw();

function draw() {
    if (!gameOver) {
        //Clear the rectangle
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        collisionDetection()
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();

        if (x + xSpeed > canvas.width - ballRadius || x + xSpeed < ballRadius) {
            xSpeed = -xSpeed;
        }
        //If out of top of the canvas inverse vertical velocity
        if (y + ySpeed < ballRadius) {
            ySpeed = -ySpeed;
        }
        //if on bottom screen
        else if (y + ySpeed > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                ySpeed = -ySpeed;
            } else {
                lives--;
                if (!lives) {
                    gameOver = true;
                    alert("GAME OVER");
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }

            }
        }

        //Paddle position to update on key press
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += paddleSpeed;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= paddleSpeed;
        }

        //Adds value to x and y to make the ball move
        x += xSpeed;
        y += ySpeed;
        
        requestAnimationFrame(draw);
    } /*else {
        //Stop game
    }*/
}
function drawBall() {

    ctx.beginPath();
    //draw a ball at (x,y)
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    //fill the ball
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    ySpeed = -ySpeed;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        gameOver = true;
                    }
                }
            }
        }
    }
}



//mouse handlers
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
//Key handlers
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

//Events listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
