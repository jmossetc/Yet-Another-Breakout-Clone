/*
 under MIT license 
 */
/* 
 Created on : Feb 23, 2017, 9:35:48 PM
 Author     : Jérémie Mosset-Chafik
 */

//canvas
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

//Game variables
gameOver = false;
score = 0;
lives = 3;

//Controls
var rightPressed = false;
var leftPressed = false;

//Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
durability = 1;
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = initBrick(0, 0, brickWidth, brickHeight, durability);
    }
}


//Paddle init 
var paddleHeight = 10;
var paddleWidth = 200;
var paddleSpeed = 2;
var paddle = initPaddle(paddleHeight, paddleWidth, paddleSpeed)

//Ball init
var xPos = canvas.width / 2;
var yPos = canvas.height - 30;
var xSpeed = 2;
var ySpeed = -2;
var ballRadius = 10;
var ball = initBall(xPos, yPos, xSpeed, ySpeed, ballRadius);

draw();

function draw() {
    if (!gameOver) {
        //Clear the rectangle
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        collisionDetection()
        drawBricks();
        paddle.drawPaddle();
        ball.drawBall(paddle);
        drawScore();
        drawLives();

        ball.checkBorderOrPaddleCollision(paddle);

        //Paddle position to update on key press
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddle.paddleX += paddleSpeed;
        } else if (leftPressed && paddleX > 0) {
            paddle.paddleX -= paddleSpeed;
        }


        requestAnimationFrame(draw);
    }
}

function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].durability > 0) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                bricks[c][r].drawBrick();
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
            var brick = bricks[c][r];
            if (bricks[c][r].durability > 0) {
                //On brick up or down bar collision, inverse vertical speed
                if (ball.x > brick.x && ball.x < brick.x + brick.brickWidth && ball.y + ball.ballRadius >= brick.y && ball.y - ball.ballRadius <= brick.y + brick.brickHeight) {
                    ball.ySpeed = -ball.ySpeed;
                    bricks[c][r].durability--;
                    score++;
                    console.log('vertical collison');
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        gameOver = true;
                    }
                    //On vertical collision inverse vertical speed
                } else if (ball.y > brick.y && ball.y < brick.y + brick.brickHeight && ball.x + ball.ballRadius >= brick.x && ball.x - ball.ballRadius <= brick.x + brick.brickWidth) {
                    ball.xSpeed = -ball.xSpeed;
                    bricks[c][r].durability--;
                    score++;
                    console.log('horizontal collison');
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
        paddle.paddleX = relativeX - paddleWidth / 2;
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
