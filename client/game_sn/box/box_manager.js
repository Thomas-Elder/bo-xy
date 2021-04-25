
var PlayerBox = require('./player_box.js');
var EnemyBox = require('./enemy_box.js');
var ExplodeBox = require('./explode_box.js');
var StarBox = require('./star_box.js');

var Interaction = require('../interaction');

const {Howl, Howler} = require('howler');
var explosion = new Howl({src:['static/game_sn/media/explosion.mp3'], volume: 0.5});

/**
 * BoxManager
 */
var BoxManager = function (config, controller) {

  this.config     = config;
  this.controller = controller;

  this.enemyBoxes   = new Array(this.config.numberOfEnemies);
  this.enemySpeed   = config.box.enemy.speed;
  this.enemySpacing = 0;
  
  this.explodeBoxes = [];

  this.enemiesDodged= 0;
  this.enemiesHit   = 0;
}

BoxManager.prototype.init = function() {

  this.interaction = new Interaction();

  //this.sounds = new Sounds('../media/explosion.m4a');

  // Instantiate a new instance of type PlayerBox.
  this.playerBox = new PlayerBox(this.config, this.controller);
  
  
  /* Calculate placement of enemy boxes based on width of screen and number of
   * boxes.
   */
  this.enemySpacing = (this.config.screenSize.width - this.config.box.enemy.size.width) / (this.config.numberOfEnemies - 1);

  // Instantiate an array of new instances of type EnemyBox.
  for (var i = 0; i < this.enemyBoxes.length; i++) {
    var location = this.newEnemyLocation(this.config);
    this.enemyBoxes[i] = new EnemyBox(location, 0, this.config);
  }

  this.explodeBoxes = [];
};

BoxManager.prototype.updatePlayer = function() {
 
  var self = this;

  self.playerBox.update();
};

BoxManager.prototype.updateExplosions = function() {
 
  var self = this;
  
  if (self.explodeBoxes.length > 0) {
    for (var k = 0; k < self.explodeBoxes.length; k++){

      self.explodeBoxes[k].update();

      if (self.explodeBoxes[k].endOfExplode()) {
        self.explodeBoxes.splice(k, 1);
      }
    }
  }
};

BoxManager.prototype.updateEnemies = function(level) {
 
  var self = this;

  for (var i = 0; i < self.enemyBoxes.length; i++){

    if(self.enemyBoxes[i].onScreen)
      self.enemyBoxes[i].update();

    if (!self.enemyBoxes[i].onScreen){
      if (!self.enemyBoxes[i].hit)
        self.enemiesDodged++;
      
      var location = self.newEnemyLocation(self.config);
      self.enemyBoxes[i] = new EnemyBox(location, level, self.config);
    }
  }
};

/**
 * Reinstantiate the enemy box array
 */
BoxManager.prototype.clearEnemies = function(level) {

  for (var i = 0; i < this.enemyBoxes.length; i++) {
    var location = this.newEnemyLocation(this.config);
    this.enemyBoxes[i] = new EnemyBox(location, level, this.config);
  }
};

BoxManager.prototype.enemyHit = function() {

  var self = this;

  if (!this.playerBox.isBlinking){
    this.enemyBoxes.forEach(function(enemy) {
      if (enemy.onScreen){
        if (self.interaction.collision(self.playerBox, enemy)) {
          explosion.play();
          enemy.hit = true;
          enemy.onScreen = false;
          self.explodeBoxes.push(new ExplodeBox(enemy.getPosition().x,
                                                enemy.getPosition().y,
                                                self.config));

          self.enemiesHit++;

          self.playerBox = new PlayerBox(self.config, self.controller);
        }
      }
    });
  }
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