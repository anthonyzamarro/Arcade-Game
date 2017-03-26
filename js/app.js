
var startGame = false;
var go = false;

//Randomly generate gems and rocks on the board
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(x, speed);
    this.width = 10;
    this.height = 10;
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Sets the speed of the enemies
    this.x = this.x + this.speed * dt;
    //Loops the enemy back to the start after going off of the canvas
     if(this.x > 500) {
      this.x = 0;
    }

};

//Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player that the user controls
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;


    // this.sprite = 'images/char-boy.png';

};
var score = 0;
var lives = 3;

//Update player's position relative to other entities
Player.prototype.update = function(dt) {
  //Alert the player if he/she wins or loses
  if(score >= 10) {
    alert('You Win!');
    document.location.reload();
    console.log('You Win!');
  } else if (score < 0 || lives <= 0) {
    alert('GAME OVER!');
    document.location.reload();
    console.log('YOU LOSE!');
  };
};

//Draw the player on the screen
Player.prototype.render = function() {
  var sprite = this.sprite = 'images/char-boy.png';
  var chars = document.getElementsByClassName('chars');
  var selectedChar;

  chars = [].slice.call(chars);
  chars.forEach(function(char) {
    char.addEventListener('click', function() {
      selectedChar = char;
      console.log(selectedChar);
      return selectedChar;
    });
  });

    ctx.drawImage(Resources.get(sprite.replace(sprite, selectedChar)), this.x, this.y);
};

//Controls how to move player via player.handleInput method below
Player.prototype.handleInput = function(key) {
      if (key === "up") {
          this.y -= 30;
      }
      if (key === "down") {
          this.y += 30;
      }
      if (key === "right") {
          this.x += 30;
      }
      if (key === "left") {
          this.x -= 30;
      }
};

var Rock = function(x, y) {
    this.x = getRandomInt(20, 500);
    this.y = getRandomInt(10, 300);
    this.width = 30;
    this.height = 30;

    this.sprite = "images/Rock.png";
};

//Set the rocks' location
Rock.prototype.update = function(dt) {
};
//Draw the rocks on the screen
Rock.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Gem = function(x, y) {
    var gemsURLs = ['images/Gem Orange.png', 'images/Gem Green.png', 'images/Gem Blue.png'];
    this.x = getRandomInt(0, 4) * 101;
    this.y = getRandomInt(1, 3) * 70;
    this.width = 30;
    this.height = 30;

    this.sprite = gemsURLs[getRandomInt(0, gemsURLs.length)];
};

Gem.prototype.update = function(dt) {
};
Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0; i < 5; i++) {
  allEnemies.push(new Enemy(getRandomInt(10, 100), getRandomInt(20, 280), getRandomInt(100, 300)))
}
var player = new Player(200, 380);

var allRocks = [];
for (var i = 0; i < 4; i++) {
  allRocks.push(new Rock());
}

var allGems = [];
for(var i = 0; i < 4; i++) {
  allGems.push(new Gem());
}

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
