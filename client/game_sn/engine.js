
// Box requirements
var PlayerBox = require('./box/player_box');
var EnemyBox = require('./box/enemy_box');
var ExplodeBox = require('./box/explode_box');
var PowerBox = require('./box/power_box');

// Background and Hud
var Background = require('./background');
var Hud = require('./hud');

// 
var Controller = require('./controller');
var Display = require('./display');
var Interaction = require('./interaction');
var Config = require('./config');

/**
 * A class for managing the game.
 */
var Engine = function(){
  
};

Engine.prototype.init = function(){

  this.config = new Config();
  this.interaction = new Interaction();

  this.display = new Display(this.config);

  this.background = new Background(this.config);
  this.hud = new Hud(this.config);

  // Set up the controller to pass to the player
  var controller   = new Controller();

  window.onkeydown = function (event) { controller.keyDown(event); };
  window.onkeyup   = function (event) { controller.keyUp(event); };

};

Engine.prototype.run() = function(){
  
  // loop
  function loop(){
    this.update();
    this.draw();

    // Check if game is over and clearInterval if so
    
  }

  var gameLoop = setInterval(loop, 1000 / this.config.fps);  
};

Engine.prototype.update = function(){

  // update all
  this.background.update();
  this.hud.update();
};

Engine.prototype.draw() = function(){

  // draw
  this.display.draw({
    background: this.background,
    hud: this.hud,
    player: this.player, 
    enemies: this.enemies,
    explosions: this.explosions,
    powerboxes: this.powerboxes
  });
};

Engine.prototype.newEnemyLocation = function(config) {

  return {
    x: Math.floor(Math.random() * config.screenSize.width), 
    y: -((this.config.screenSize.height - Math.floor(Math.random() * this.config.screenSize.height)))
  };
};


module.exports = Engine;