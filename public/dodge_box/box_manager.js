function BoxManager(config, controller, context) {
  this.config     = config;
  this.controller = controller;
  this.context    = context;

  this.enemyBoxes   = new Array(this.config.numberOfEnemies);
  this.enemySpeed   = config.enemySpeed;
  this.levelCount   = 0;
  this.enemySpacing = 0;
  
  this.explodeBoxes = [];
  
  this.total_score  = 0;
  this.level_score  = 0;
  this.level        = 0;

  this.max_level    = this.config.numberOfLevels;
}

BoxManager.prototype.init = function() {

  // Instantiate a new instance of type PlayerBox.
  this.playerBox = new PlayerBox(this.config, this.controller, this.context);

  /*
   * Calculate placement of enemy boxes based on width of screen and number of
   * boxes.
   */
  this.enemySpacing = (this.config.screenSize.width - this.config.enemySize.width) / (this.config.numberOfEnemies - 1);

  // Instantiate an array of new instances of type EnemyBox.
  for (var i = 0; i < this.enemyBoxes.length; i++) {
    this.enemyBoxes[i] = new EnemyBox(i * this.enemySpacing,
                                      -config.enemySize.height * i,
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

  if (this.level_score === 10) {
    this.level_score = 0;

    if (this.level < this.max_level) {
      this.level++;
    }
  }

  /* Increment levelCount as long as level won't be over the max level
  if (this.levelCount < (this.config.numberOfLevels * this.config.levelLength))
    this.levelCount++;

  var level = Math.floor(this.levelCount / this.config.levelLength);
  */

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

        this.level_score++;
        this.total_score++;

        this.enemyBoxes[i].setOffScreen();
        this.explodeBoxes.push(new ExplodeBox(this.enemyBoxes[i].getPosition().x,
                       this.enemyBoxes[i].getPosition().y,
                       this.config,
                       this.context));
      }

    } else {

      // Create new enemy box 
      this.enemyBoxes[i] = new EnemyBox(i * this.enemySpacing,
                                        -config.enemySize.height * i,
                                        this.enemySpeed[this.level],
                                        this.config,
                                        this.context);
    }
  }
};

BoxManager.prototype.getScore = function() {
  return this.total_score;
};

/**
 * Helper functions for the BoxManager
 */

/**
 * Update enemy boxes
 */
function updateEnemyBoxes(player, enemy) {

}

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