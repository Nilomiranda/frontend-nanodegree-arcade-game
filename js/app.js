// Enemies our player must avoid

class Enemy {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        this.x = this.x + 100 * dt; // change current x position

        // checks if position is already off the canvas
        if (this.x > 505) {
            this.x = -100; // sets the enemy in the canva's beginning 
        }

        this.checkColision(); // checks if enemy colided with player

        /**
         * calls render method to render the enemy in the newly
         * updated x position
         */
        // console.log('Enemy X position ====>', this.x);
        this.render(); 
    }

    checkColision() {
        const selfPosX = this.x;
        const selfPosY = this.y;

        const enemyPosX = player.x;
        const enemyPosY = player.y;

        /**
         * these two variables set a range for the colision
         * with the enemy
         */
        const xMinimumColisionRange = selfPosX - 1;
        const xMaximumColisionRange = selfPosX + 1;

        /**
         * checks if a xColision occurs by checking if the 
         * player's x position is already in the enemy's X range
         * specified within the two variables above
         * xMinimumColisionRange and xMaximumColisionRange
         */
        const xColision = enemyPosX > xMinimumColisionRange && 
            enemyPosX < xMaximumColisionRange ?
            true : false;

        // checks if position of enemy and player matches
        if (xColision && selfPosY === enemyPosY) {
            console.log('colided!');
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 0;
        this.y = 404;
    }

    update(dt) {

    }

    handleInput(pressedKey) {
        switch (pressedKey) {
            case 'up':
                this.y -= 85.5;
                console.log(this.y);
                break;
            case 'down': 
                this.y += 85.5;
                console.log(this.y);
                break;
            case 'left':
                this.x -= 101;
                console.log(this.x);
                break;
            case 'right':
                this.x += 101;
                console.log(this.x);
                break;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemyOne = new Enemy(60, 30);
const enemyTwo = new Enemy(60, 100);
const enemyThree = new Enemy(60, 233);
const allEnemies = [enemyThree];

const player = new Player;




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
