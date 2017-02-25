/*
 under MIT license 
 */
/* 
 Created on : Feb 23, 2017, 9:35:48 PM
 Author     : Jérémie Mosset-Chafik
 */

function initBrick(xPos, yPos, brickWidth, brickHeight, durability) {
    return {
        brickWidth: brickWidth,
        brickHeight: brickHeight,
        durability: durability,
        x: xPos,
        y: yPos,
        borderColor:"#FFB800",
        drawBrick: function (color) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.brickWidth, this.brickHeight);
            ctx.fillStyle = color;
            ctx.strokeStyle = this.borderColor;
            ctx.lineWidth=2;
            ctx.stroke();
            ctx.fill();

            ctx.closePath();
        }

    };
}

