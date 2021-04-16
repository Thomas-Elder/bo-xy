
var PlayerBox = require('./player_box.js');
var EnemyBox = require('./enemy_box.js');
var ExplodeBox = require('./explode_box.js');
var StarBox = require('./star_box.js');

var Interaction = require('../interaction');

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

  this.farStarBoxes   = new Array(this.config.numberOfFarStars);
  this.farStarSpeed   = config.box.farstar.speed;

  this.nearStarBoxes   = new Array(this.config.numberOfNearStars);
  this.nearStarSpeed   = config.box.nearstar.speed;

  this.enemiesDodged= 0;
  this.enemiesHit   = 0;
}

BoxManager.prototype.init = function() {

  this.interaction = new Interaction();

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

  // Instantiate an array of new instances of type StarBox.
  for (var i = 0; i < this.farStarBoxes.length; i++) {
    console.log('Instantiating far star boxes');
    var location = this.newStarLocation(this.config);
    this.farStarBoxes[i] = new StarBox(location, this.config, 
                                                this.config.box.farstar.size.width, 
                                                this.config.box.farstar.size.height, 
                                                this.config.box.farstar.colour, 
                                                this.config.box.farstar.speed);
  }

  // Instantiate an array of new instances of type StarBox.
  for (var i = 0; i < this.nearStarBoxes.length; i++) {
    console.log('Instantiating near star boxes');
    var location = this.newStarLocation(this.config);
    this.nearStarBoxes[i] = new StarBox(location, this.config, 
                                                  this.config.box.nearstar.size.width, 
                                                  this.config.box.nearstar.size.height, 
                                                  this.config.box.nearstar.colour, 
                                                  this.config.box.nearstar.speed);
  }
};

BoxManager.prototype.update = function(level) {
 
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

  for (var i = 0; i < this.enemyBoxes.length; i++){

    if(this.enemyBoxes[i].onScreen)
      this.enemyBoxes[i].update();

    if (!this.enemyBoxes[i].onScreen){
      if (!this.enemyBoxes[i].hit)
        this.enemiesDodged++;
      
      var location = this.newEnemyLocation(this.config);
      this.enemyBoxes[i] = new EnemyBox(location, level, this.config);
    }
  }

  for (var i = 0; i < this.farStarBoxes.length; i++){
    if (this.farStarBoxes[i].onScreen){
      this.farStarBoxes[i].update();
    } else {
      var location = this.newStarLocation(this.config);
      this.farStarBoxes[i] = new StarBox(location, this.config, 
                                                    this.config.box.farstar.size.width, 
                                                    this.config.box.farstar.size.height, 
                                                    this.config.box.farstar.colour, 
                                                    this.config.box.farstar.speed);
    }
  }

  for (var i = 0; i < this.nearStarBoxes.length; i++){
    if (this.nearStarBoxes[i].onScreen){
      this.nearStarBoxes[i].update();
    } else {
      var location = this.newStarLocation(this.config);
      this.nearStarBoxes[i] = new StarBox(location, this.config, 
                                                    this.config.box.nearstar.size.width, 
                                                    this.config.box.nearstar.size.height, 
                                                    this.config.box.nearstar.colour, 
                                                    this.config.box.nearstar.speed);
    }
  }
};

BoxManager.prototype.enemyHit = function() {

  var self = this;

  if (!this.playerBox.isBlinking){
    this.enemyBoxes.forEach(function(enemy) {
      if (enemy.onScreen){
        if (self.interaction.collision(self.playerBox, enemy)) {

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

/**
 * newStarLocation
 */
BoxManager.prototype.newStarLocation = function(config) {

  return {
    x: Math.floor(Math.random() * config.screenSize.width), 
    y: -((this.config.screenSize.height - Math.floor(Math.random() * this.config.screenSize.height)))
  };
};



module.exports = BoxManager;