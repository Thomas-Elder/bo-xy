function BoxManager(config, controller, context) {
  this.config     = config;
  this.controller = controller;
  this.context    = context;

  this.enemyBoxes   = new Array(this.config.numberOfEnemies);
  this.enemySpeed   = config.box.enemy.speed;
  this.levelCount   = 0;
  this.enemySpacing = 0;
  
  this.explodeBoxes = [];
  
  this.total_score  = 0;
  this.level_score  = 0;
  this.level        = 0;

  this.max_level    = this.config.numberOfLevels;
  
  //this.socket = io();
}

BoxManager.prototype.init = function() {

  // Instantiate a new instance of type PlayerBox.
  this.playerBox = new PlayerBox(this.config, this.controller, this.context);

  /*
   * Calculate placement of enemy boxes based on width of screen and number of
   * boxes.
   */
  this.enemySpacing = (this.config.screenSize.width - this.config.box.enemy.size.width) / (this.config.numberOfEnemies - 1);

  // Instantiate an array of new instances of type EnemyBox.
  for (var i = 0; i < this.enemyBoxes.length; i++) {

    // Get a new enemy location
    var location = newEnemyLocation(this.config);
      console.log(location);

    this.enemyBoxes[i] = new EnemyBox(location.x,
                                      location.y,
                                      this.enemySpeed[this.levelCount],
                                      this.config,
                                      this.context);
  }
};

BoxManager.prototype.draw = function() {

  this.playerBox.draw();

  for (var i = 0; i < this.enemyBoxes.length; i++)
    this.enemyBoxes[i].draw();

  if (this.explodeBoxes.length > 0) {

    for (var j = 0; j < this.explodeBoxes.length; j++) {

      this.explodeBoxes[j].draw();
    }
  }
};

BoxManager.prototype.update = function() {

  this.playerBox.update();

  if (this.explodeBoxes.length > 0) {
    for (var k = 0; k < this.explodeBoxes.length; k++){

      this.explodeBoxes[k].update();

      if (this.explodeBoxes[k].endOfExplode()) {
        this.explodeBoxes.splice(k, 1);
      }
    }
  }

  if (this.level_score === 100) {
    this.level_score = 0;

    if (this.level < this.max_level) {
      this.level++;
    }
  }

  /*
   * For each enemyBox, check if it is on the screen, if so call its update 
   * method, else initialise a new box.
   */
  for (var i = 0; i < this.enemyBoxes.length; i++) {

    if (this.enemyBoxes[i].isOnScreen()) {
      this.enemyBoxes[i].update();

      /*
       * If there's a collision, get rid of the enemy hit, and push 
       * a new explodeBox into the explodeBoxes array
       */
      if (collisionDetection(this.playerBox, this.enemyBoxes[i])) {

        this.enemyBoxes[i].setOffScreen();
        this.explodeBoxes.push(new ExplodeBox(this.enemyBoxes[i].getPosition().x,
                       this.enemyBoxes[i].getPosition().y,
                       this.config,
                       this.context));

        // Lose a life
        this.playerBox.lives--;
      }

    } else {

      // We've dodged a box! Have a point!
      this.level_score++;
      this.total_score++;

      var location = newEnemyLocation(this.config);

      // Create new enemy box 
      this.enemyBoxes[i] = new EnemyBox(location.x,
                                        location.y,
                                        this.enemySpeed[this.level],
                                        this.config,
                                        this.context);
    }
  }
};

BoxManager.prototype.getScore = function() {
  return this.total_score;
};

BoxManager.prototype.getLevel = function() {
  return this.level;
};

BoxManager.prototype.getLives = function() {
  return this.playerBox.lives;
};

BoxManager.prototype.endGame = function() {
  
  this.context.font = '20px sans-serif';

  var scoreString = 'score: ' + this.total_score;
  var levelString = 'level: ' + this.level;
  
  this.context.fillStyle = '#3399FF';
  this.context.fillText('Game over', 10, 20);
  this.context.fillText(scoreString, 130, 20);
  this.context.fillText(levelString, 250, 20);
}

/**
 * Helper functions for the BoxManager
 */

/**
 * Collision Detection
 */
function collisionDetection(player, enemy) {
  if ((player.getPosition().x - enemy.getSize().width) < enemy.getPosition().x) {
    if (enemy.getPosition().x  < (player.getPosition().x + player.getSize().width)) {
      if ((enemy.getPosition().y + enemy.getSize().height) > player.getPosition().y) {
        if (enemy.getPosition().y < (player.getPosition().y + player.getSize().height)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * 
 */
function newEnemyLocation(config) {

  return {
    x: Math.floor(Math.random() * config.screenSize.width), 
    y: -((this.config.screenSize.height - Math.floor(Math.random() * this.config.screenSize.height)))
  };
}