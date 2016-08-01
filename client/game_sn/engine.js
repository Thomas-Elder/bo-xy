
// Box requirements
var PlayerBox = require('./box/player_box');
var EnemyBox = require('./box/enemy_box');
var ExplodeBox = require('./box/explode_box');
var PowerBox = require('./box/power_box');
var BoxManager = require('./box/box_manager')

// Background and Hud
var Background = require('./background');
var Hud = require('./hud');

// 
var Controller = require('./controller');
var Display = require('./display');
var Interaction = require('./interaction');
var config = require('./config');

/**
 * A class for managing the game.
 */
var Engine = function(){};

/**
 * 
 */
Engine.prototype.init = function(contexts){

  this.interaction = new Interaction();

  this.display = new Display(config, contexts);
  this.display.init();

  this.background = new Background(config);
  this.hud = new Hud(config);

  // Set up the controller to pass to the player
  var controller   = new Controller();

  window.onkeydown = function (event) { controller.keyDown(event); };
  window.onkeyup   = function (event) { controller.keyUp(event); };

  this.boxManager = new BoxManager(config, controller);
  this.boxManager.init();
};

/**
 * 
 */
Engine.prototype.run = function(){
  
  var self = this;

  // loop
  function loop(){
    self.update();
    self.draw();

    // Check if game is over and clearInterval if so
    if (self.boxManager.getLevel() === config.numberOfLevels ||
      self.boxManager.getLives() === 0) {
        self.endGame();          
        clearInterval(gameLoop);
    }
  }

  var gameLoop = setInterval(loop, 1000 / config.fps);  
};

/**
 * 
 */
Engine.prototype.update = function(){

  // update all
  this.background.update();
  this.hud.update();
  this.boxManager.update();

};

/**
 * 
 */
Engine.prototype.draw = function(){

  // draw
  this.display.draw({
    background: this.background,
    hud: this.hud,
    player: this.boxManager.playerBox, 
    enemies: this.boxManager.enemyBoxes,
    explosions: this.boxManager.explodeBoxes,
    powerboxes: []
  });
};

/**
 * 
 */
Engine.prototype.endGame = function(){

  // call display.end();
};


module.exports = Engine;