/*
 under MIT license 
 */
/* 
 Created on : Feb 23, 2017, 9:35:48 PM
 Author     : Jérémie Mosset-Chafik
 */

/*
 under MIT license 
 */
/* 
 Created on : Feb 23, 2017, 9:35:48 PM
 Author     : Jérémie Mosset-Chafik
 */


function initLevel(levelPadding, brickHeight, brickWidth, brickColumnCount, brickRowCount, brickPadding, brickOffsetLeft, brickOffsetTop, levelNumber) {
    var bricks = [];
    for (c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (r = 0; r < brickRowCount; r++) {
            //between 1 and 10
            var randomNumber =  Math.floor((Math.random() * 10) + 1);
            if (randomNumber < 5){
                var durability = 0;
                score++;
            }
            else if (randomNumber < 7){
                var durability = 1;
            }
            else if (randomNumber < 9){
                var durability = 2
            }
            else{
                var durability = 3;
            }
            
            bricks[c][r] = initBrick(0, 0, brickWidth, brickHeight, durability);
        }
    }
    return {
        brickHeight: brickHeight,
        brickWidth: brickWidth,
        brickColumnCount: brickColumnCount,
        brickRowCount: brickRowCount,
        brickPadding: brickPadding,
        brickOffsetLeft: brickOffsetLeft,
        brickOffsetTop: brickOffsetTop,
        bricks: bricks,
        levelNumber: levelNumber,
        levelPadding : levelPadding,
        bricksColor:['#0095DD','#00E463','#FF3500'],
        drawBricks: function () {
            for (c = 0; c < this.brickColumnCount; c++) {
                for (r = 0; r < this.brickRowCount; r++) {
                    if (this.bricks[c][r].durability > 0) {
                        var brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft + levelPadding;
                        var brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop + this.levelPadding;
                        this.bricks[c][r].x = brickX;
                        this.bricks[c][r].y = brickY;
                        var colorIndex = this.bricks[c][r].durability - 1;
                        this.bricks[c][r].drawBrick(this.bricksColor[colorIndex]);
                    }
                }
            }
        }
    };
}