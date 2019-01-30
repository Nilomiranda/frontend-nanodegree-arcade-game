// Enemies our player must avoid

class Enemy {
    constructor(x, y, movSpeed) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.movSpeed = movSpeed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x = this.x + this.movSpeed * dt; // change current x position

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

    /**
     * @description Checks if enemy has collided with the player
     */
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
            /**
             * if colision happens then player is set to its
             * initial position and game begins again
             */
            player.x = 0;
            player.y = 404;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 0; // initial horizontal position
        this.y = 404; // initial vertical position
        this.victory = false; // victory 'state'
    }

    update(dt) {
        this.checkVictory();
    }

    handleInput(pressedKey) {
        switch (pressedKey) {
            case 'up':
                this.y -= 85.5;
                this.checkLimits();
                break;
            case 'down': 
                this.y += 85.5;
                this.checkLimits();
                break;
            case 'left':
                this.x -= 101;
                this.checkLimits();
                break;
            case 'right':
                this.x += 101;
                this.checkLimits();
                break;
        }
    }

    checkLimits() {
        /**
         * this is checking if the player is going beyond
         * the canvas limits
         */
        
        // checking left limit
        if (this.x < 0) {
            this.x = 0;
        }

        // check right limit
        if (this.x > 404) {
            this.x = 404;
        }

        // check up limit
        if (this.y < -23.5) {
            this.y = -23.5;
        }

        // check down limit
        if (this.y > 404) {
            this.y = 404;
        }
        
    }

    checkVictory() {
        // checks if player reached water -> VICTORY 🙌🙌🙌
        if (this.y === -23.5) {
            this.x = 0;
            this.y = 404;
            this.victory = true;
        }
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
        // checks if player won the match
        if (this.victory) {
            // show "You won message"
            ctx.drawImage(Resources.get('images/Victory.png'), 60, 233);
            
            //wait 1.5 seconds before clearing the message
            setTimeout(() => {
                this.victory = false;
                this.render(); // re-renders the whole image, without the victory msg    
            }, 1500);
        }
    }
}

// first row enemies
const enemyOne = new Enemy(-150, 62, 200);
const enemyFour = new Enemy(-300, 62, 120);

// second row enemies
const enemyTwo = new Enemy(-150, 147.5, 70);
const enemyFive = new Enemy(-200, 147.5, 85);

// third row enemies
const enemyThree = new Enemy(-150, 233, 100);
const enemySix = new Enemy(-120, 233, 200);

// full list of enemies
const allEnemies = [enemyOne,
    enemyTwo,
    enemyThree,
    enemyFour,
    enemyFive,
    enemySix,
];

const player = new Player;

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
