
var PlayerBox = require('./player_box.js');
var EnemyBox = require('./enemy_box.js');
var ExplodeBox = require('./explode_box.js');

var BoxManager = function (config, controller, context) {
  this.config     = config;
  this.controller = controller;
  this.context    = context;

  this.enemyBoxes   = new Array(this.config.numberOfEnemies);
  this.enemySpeed   = config.box.enemy.speed;
  this.levelCount   = 0;
  this.enemySpacing = 0;
  
  this.explodeBoxes = [];
  //this.powerBoxes   = [];
  
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
    var location = this.newEnemyLocation(this.config);

    this.enemyBoxes[i] = new EnemyBox(location.x,
                                      location.y,
                                      this.enemySpeed[this.levelCount],
                                      this.config,
                                      this.context);
  }
  
  //this.powerBoxes.push(new PowerBox(200, 0, this.config, this.context));
};

BoxManager.prototype.draw = function() {
  
  this.playerBox.draw();

  /*this.powerBoxes.forEach(function(powerBox) {
    powerBox.draw(); 
  });*/
  
  for (var i = 0; i < this.enemyBoxes.length; i++)
    this.enemyBoxes[i].draw();

  if (this.explodeBoxes.length > 0) {
    for (var j = 0; j < this.explodeBoxes.length; j++)
      this.explodeBoxes[j].draw();
  }
};

BoxManager.prototype.update = function() {
 
  this.playerBox.update();
  var self = this;
  
  /*
  this.powerBoxes.forEach(function(powerBox){
    if (powerBox.isOnScreen())
      powerBox.update();
    else
      self.powerBoxes.pop(powerBox);
  });

  if (collisionDetection(this.playerBox, this.powerBox)) {
    this.explodeBoxes.push(new ExplodeBox(this.enemyBoxes[i].getPosition().x,
                       this.enemyBoxes[i].getPosition().y,
                       this.config,
                       this.context));
    this.powerBox.setOffScreen();
  }*/

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
  powerBoxes.forEach(function(powerBox){
    if (collisionDetection(self.playerBox, powerBox)) {
      self.explodeBoxes.push(new ExplodeBox(self.enemyBoxes[i].getPosition().x,
                        self.enemyBoxes[i].getPosition().y,
                        self.config,
                        self.context));
      
      self.level_score += 50;
      powerBox.setOffScreen();
    }
  });
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
      if (this.collisionDetection(this.playerBox, this.enemyBoxes[i])) {

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

      var location = this.newEnemyLocation(this.config);

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
BoxManager.prototype.collisionDetection = function(a, b) {
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
};

/**
 * 
 */
BoxManager.prototype.newEnemyLocation = function(config) {

  return {
    x: Math.floor(Math.random() * config.screenSize.width), 
    y: -((this.config.screenSize.height - Math.floor(Math.random() * this.config.screenSize.height)))
  };
};



module.exports = BoxManager;