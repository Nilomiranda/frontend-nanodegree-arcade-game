// Enemies our player must avoid

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
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
        this.limitLeft = 0;
        this.limitRight = 404;
        this.limitUp = -23.5;
        this.limitDown = 404;
    }

    update(dt) {
        this.checkVictory();
    }

    handleInput(pressedKey) {
        switch (pressedKey) {
            case 'up':
                this.y -= 85.5;
                this.checkLimits();
                // console.log(this.y);
                // console.log(this.x);
                break;
            case 'down': 
                this.y += 85.5;
                this.checkLimits();
                // console.log(this.y);
                // console.log(this.x);
                break;
            case 'left':
                this.x -= 101;
                this.checkLimits();
                // console.log(this.y);
                // console.log(this.x);
                break;
            case 'right':
                this.x += 101;
                this.checkLimits();
                // console.log(this.y);
                // console.log(this.x);
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

const enemyOne = new Enemy(60, 30);
const enemyTwo = new Enemy(60, 100);
const enemyThree = new Enemy(60, 233);
const allEnemies = [enemyThree];

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
