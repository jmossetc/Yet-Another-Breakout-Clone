/*
 under MIT license 
 */
/* 
 Created on : Feb 23, 2017, 9:35:48 PM
 Author     : Jérémie Mosset-Chafik
 */

function initPaddle(paddleHeight, paddleWidth, paddleSpeed) {
    var paddleXPos = (canvas.width - paddleWidth) / 2;
    return {
        paddleHeight: paddleHeight,
        paddleWidth: paddleWidth,
        paddleX: paddleXPos,
        paddleSpeed: paddleSpeed,
        drawPaddle: function () {
            ctx.beginPath();
            ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    };
}