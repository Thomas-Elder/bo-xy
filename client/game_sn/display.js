

/**
 * A class for handling calling any draw functions.
 */
var Display = function(config){
  this.config = config;
};

Display.prototype.init = function(){

  // Get a reference to the canvas element.
  var game_canvas = $('#game_canvas');

  game_canvas.width   = config.screenSize.width;
  game_canvas.height  = config.screenSize.height;

  // Get a reference to the hud
  var hud_canvas = $('#hud_canvas');

  hud_canvas.width   = config.hudSize.width;
  hud_canvas.height  = config.hudSize.height;

  // Get the context.
  this.game_context = game_canvas.getContext('2d');
  this.hud_context  = hud_canvas.getContext('2d');
};

/**
 * draw
 * 
 * @param state : an object describing the state of the game.
 * The following fields are expected in the state object:
 * background: a background object
 * hud: a Hud object
 * player: a PlayerBox object
 * enemies: an array of EnemyBox objects
 * explosions: an array of ExplodeBox objects
 * powerboxes: an array of PowerBox objects
 * 
 */
Display.prototype.draw = function(state){

  // Clear the contexts for redraw
  this.game_context.clearRect(0, 0, 
                          this.config.screenSize.width, 
                          this.config.screenSize.height);
  this.hud_context.clearRect(0, 0, 
                          this.config.hudSize.width, 
                          this.config.hudSize.height);

  // Draw the background
  this.game_context.fillStyle = state.background.colour;
  this.game_context.fillRect(0, 
                          0, 
                          this.config.screenSize.width, 
                          this.config.screenSize.height);

  // Draw the player box
  this.game_context.fillStyle = state.player.colour;
  this.game_context.fillRect(state.player.x, 
                          state.player.y, 
                          state.player.width, 
                          state.player.height);

  // Draw the enemy boxes
  state.enemies.forEach(function(enemy){
    this.game_context.fillStyle = enemy.colour;
    this.game_context.fillRect(enemy.x, 
                          enemy.y, 
                          enemy.width, 
                          enemy.height);
  });

  // Draw the explosions, if any
  state.explosions.forEach(function(explosion){
    this.game_context.fillStyle = explosion.colour;
    this.game_context.fillRect(explosion.x, 
                          explosion.y, 
                          explosion.width, 
                          explosion.height);
  });

  // Draw the powerboxes, if any
  state.powerboxes.forEach(function(powerboxes){
    this.game_context.fillStyle = powerboxes.colour;
    this.game_context.fillRect(powerboxes.x, 
                          powerboxes.y, 
                          powerboxes.width, 
                          powerboxes.height);
  });
};

module.exports = Display;