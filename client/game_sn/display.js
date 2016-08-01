

/**
 * A class for handling calling any draw functions.
 */
var Display = function(config, contexts){
  this.config = config;
  this.contexts = contexts;
};

Display.prototype.init = function(){
 
  this.contexts.game_canvas.width   = this.config.screenSize.width;
  this.contexts.game_canvas.height  = this.config.screenSize.height;

  this.contexts.hud_canvas.width   = this.config.hudSize.width;
  this.contexts.hud_canvas.height  = this.config.hudSize.height;

  this.game_context = this.contexts.game_context;
  this.hud_context = this.contexts.hud_context;

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

  var self = this;

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
    self.game_context.fillStyle = enemy.colour;
    self.game_context.fillRect(enemy.x, 
                          enemy.y, 
                          enemy.width, 
                          enemy.height);
  });

  // Draw the explosions, if any
  state.explosions.forEach(function(explosion){
    self.game_context.fillStyle = explosion.currentColour;
    self.game_context.fillRect(explosion.x, 
                          explosion.y, 
                          explosion.width, 
                          explosion.height);
  });

  // Draw the powerboxes, if any
  state.powerboxes.forEach(function(powerboxes){
    self.game_context.fillStyle = powerboxes.colour;
    self.game_context.fillRect(powerboxes.x, 
                          powerboxes.y, 
                          powerboxes.width, 
                          powerboxes.height);
  });
};

module.exports = Display;