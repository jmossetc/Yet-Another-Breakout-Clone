/*
 under MIT license 
 */
/* 
 Created on : Feb 23, 2017, 9:35:48 PM
 Author     : Jérémie Mosset-Chafik
 */


function initBall(xPos, yPos, xSpeed, ySpeed, ballRadius) {
    return {
        x: xPos,
        y: yPos,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        ballRadius: ballRadius,
        drawBall: function () {
            ctx.beginPath();
            //draw a ball at (x,y)
            ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
            //fill the ball
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            this.x += this.xSpeed;
            this.y += this.ySpeed;
        },
        checkBorderOrPaddleCollision: function (paddle) {
            if (this.x + this.xSpeed > canvas.width - this.ballRadius || this.x + this.xSpeed < this.ballRadius) {
                this.xSpeed = -this.xSpeed;
            }
            //If out of top of the canvas inverse vertical velocity
            if (this.y + this.ySpeed < this.ballRadius) {
                this.ySpeed = -this.ySpeed;
            }
            //if on bottom screen
            else if (this.y + this.ySpeed > canvas.height - this.ballRadius) {
                if (this.x > paddle.paddleX && this.x < paddle.paddleX + paddle.paddleWidth) {
                    this.ySpeed = -this.ySpeed;
                } else {
                    lives--;
                    if (!lives) {
                        gameOver = true;
                        alert("GAME OVER");
                    } else {
                        this.x = canvas.width / 2;
                        this.y = canvas.height - 30;
                        this.xSpeed = 2;
                        this.ySpeed = -2;
                        paddle.paddleX = (canvas.width - paddle.paddleWidth) / 2;
                    }

                }
            }
            
        }
    };
}