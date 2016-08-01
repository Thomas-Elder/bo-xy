
var PlayerBox = require('./player_box.js');
var EnemyBox = require('./enemy_box.js');
var ExplodeBox = require('./explode_box.js');

var Interaction = require('../interaction');

/**
 * BoxManager
 */
var BoxManager = function (config, controller) {

  this.config     = config;
  this.controller = controller;

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

  this.interaction = new Interaction();

  // Instantiate a new instance of type PlayerBox.
  this.playerBox = new PlayerBox(this.config, this.controller);
  
  /*
   * Calculate placement of enemy boxes based on width of screen and number of
   * boxes.
   */
  this.enemySpacing = (this.config.screenSize.width - this.config.box.enemy.size.width) / (this.config.numberOfEnemies - 1);

  // Instantiate an array of new instances of type EnemyBox.
  for (var i = 0; i < this.enemyBoxes.length; i++) {

    // Get a new enemy location
    var location = this.newEnemyLocation(this.config);

    this.enemyBoxes[i] = new EnemyBox(location.x,
                                      location.y,
                                      this.enemySpeed[this.levelCount],
                                      this.config);
  }
};

BoxManager.prototype.update = function() {
 
  var self = this;

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
      if (this.interaction.collision(this.playerBox, this.enemyBoxes[i])) {

        this.enemyBoxes[i].setOffScreen();
        this.explodeBoxes.push(new ExplodeBox(this.enemyBoxes[i].getPosition().x,
                       this.enemyBoxes[i].getPosition().y,
                       this.config));

        // Lose a life
        this.playerBox.lives--;
      }

    } else {

      // We've dodged a box! Have a point!
      this.level_score++;
      this.total_score++;

      var location = this.newEnemyLocation(this.config);

      // Create new enemy box 
      this.enemyBoxes[i] = new EnemyBox(location.x,
                                        location.y,
                                        this.enemySpeed[this.level],
                                        this.config);
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

/**
 * Helper functions for the BoxManager
 */

/**
 * newEnemyLocation
 */
BoxManager.prototype.newEnemyLocation = function(config) {

  return {
    x: Math.floor(Math.random() * config.screenSize.width), 
    y: -((this.config.screenSize.height - Math.floor(Math.random() * this.config.screenSize.height)))
  };
};



module.exports = BoxManager;