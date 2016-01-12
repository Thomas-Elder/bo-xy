function BoxManager(config, controller, context) {
  this.config     = config;
  this.controller = controller;
  this.context    = context;

  this.screen = {width: config.screenSize.width,
                 height: config.screenSize.height};

  this.enemyBoxes   = new Array(this.config.numberOfEnemies);
  this.enemySpeed   = config.box.enemy.speed;
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
  this.enemySpacing = (this.config.screenSize.width - this.config.box.enemy.size.width) / (this.config.numberOfEnemies - 1);

  // Instantiate an array of new instances of type EnemyBox.
  for (var i = 0; i < this.enemyBoxes.length; i++) {

    // Get a new enemy location
    var location = newEnemyLocation(this.config);

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

  this.updatePlayer();

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

BoxManager.prototype.updatePlayer = function() {

  var currentPosition = this.playerBox.getPosition();
  var newPosition = {x: currentPosition.x, y: currentPosition.y};

  // apply gravity
  if (currentPosition.y + this.playerBox.getSize().height < this.screen.height)
    newPosition.y = currentPosition.y + this.config.gravity;

  // move left
  if (this.controller.left && currentPosition.x > 0)
    newPosition.x = currentPosition.x - this.playerBox.getSpeed();

  // move up
  if (this.controller.up && currentPosition.y > 0)
    newPosition.y = currentPosition.y - this.playerBox.getSpeed();

  // move right
  if (this.controller.right &&
      this.playerBox.x + this.playerBox.getSize().width < this.screen.width)
    newPosition.x = currentPosition.x + this.playerBox.getSpeed();

  // move down
  if (this.controller.down &&
      this.playerBox.y + this.playerBox.getSize().height < this.screen.height)
    newPosition.y = currentPosition.y + this.playerBox.getSpeed();

  this.playerBox.update(newPosition);
};


/**
 * Helper functions for the BoxManager
 */

/**
 * Collision Detection
 */
function collisionDetection(a, b) {
  if ((a.getPosition().x - b.getSize().width) < b.getPosition().x) {
    if (b.getPosition().x  < (a.getPosition().x + a.getSize().width)) {
      if ((b.getPosition().y + b.getSize().height) > a.getPosition().y) {
        if (b.getPosition().y < (a.getPosition().y + a.getSize().height)) {
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

  return {x: Math.floor(Math.random() * config.screenSize.width - config.box.enemy.size.width),
    y: -((this.config.screenSize.height - Math.floor(Math.random() * this.config.screenSize.height)))};
}