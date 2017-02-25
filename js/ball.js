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
        maxSpeedPower2 : 18,
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
                //On paddle collision
                if (this.x > paddle.paddleX + this.ballRadius && this.x < paddle.paddleX + paddle.paddleWidth + this.ballRadius) {
                    console.log('xVector : ' + this.xSpeed);
                    
                    //1 represents a middle collision, 0 a collision on the left side of the paddle and 2 on the right side
                    var collisionPercentage = ((this.x - paddle.paddleX) / paddle.paddleWidth )*2;
                    if (collisionPercentage > 2){
                        collisionPercentage = 2;
                    }
                    else if (collisionPercentage < 0){
                        collisionPercentage = 0;
                    }
                    //If the ball is going left we make it like we calculate the percentage from the right instead of the left                    
                    if(this.xSpeed < 0){
                        collisionPercentage = 2 - collisionPercentage;
                    }
                    
                    //Wer adjust the horizeontal speed with the collisionPercentage
                    this.xSpeed = this.xSpeed * collisionPercentage; 
                    var xSpeedPower2 = this.xSpeed * this.xSpeed;
                    //We are trying to always keep the same speed using trigonometry vectors style
                    if(xSpeedPower2 >  this.maxSpeedPower2 ){
                        this.xSpeed = Math.sign(this.xSpeed) * Math.sqrt(this.maxSpeedPower2) * 0.9;
                        xSpeedPower2 = this.xSpeed * this.xSpeed;
                    }
                    //We calculate vertical speed by making it negative and ajust it with horizontal speed and max speed
                    this.ySpeed = -Math.sqrt(this.maxSpeedPower2 - this.xSpeed*this.xSpeed);
                    //this.ySpeed -= this.xSpeed;
                    
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