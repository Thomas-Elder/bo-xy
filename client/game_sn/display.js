

/**
 * A class for handling calling any draw functions.
 */
var Display = function(config, contexts){
  this.config = config;
  this.contexts = contexts;

  this.tick = 0;
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
Display.prototype.drawGame = function(state){

  var self = this;
  var blinkRate = this.config.fps / 2;

  this.tick++;

  if (this.tick > blinkRate)
    this.tick = 0;

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
  if (state.player.isBlinking > 0) {
    if (this.tick < blinkRate/2) {
      this.game_context.fillStyle = state.player.colour;
      this.game_context.fillRect(state.player.x, 
                              state.player.y, 
                              state.player.width, 
                              state.player.height);
    } else {
      this.game_context.fillStyle = state.player.invColour;
      this.game_context.fillRect(state.player.x, 
                              state.player.y, 
                              state.player.width, 
                              state.player.height);
    }

  } else {
    this.game_context.fillStyle = state.player.colour;
    this.game_context.fillRect(state.player.x, 
                            state.player.y, 
                            state.player.width, 
                            state.player.height);
  }
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

  // Draw the far stars, if any
  state.farStars.forEach(function(starbox){
    self.game_context.fillStyle = starbox.colour;
    self.game_context.fillRect(starbox.x, 
                          starbox.y, 
                          starbox.width, 
                          starbox.height);
  });

  // Draw the near stars, if any
  state.nearStars.forEach(function(starbox){
    self.game_context.fillStyle = starbox.colour;
    self.game_context.fillRect(starbox.x, 
                          starbox.y, 
                          starbox.width, 
                          starbox.height);
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

Display.prototype.drawHud = function(hudState){

  this.hud_context.font = '20px sans-serif';

  var scoreString = 'score: ' + hudState.score;
  var levelString = 'level: ' + hudState.level;
  var livesString = 'lives: ' + hudState.lives;

  this.hud_context.fillStyle = '#3399FF';
  this.hud_context.fillText(scoreString, 10, 20);
  this.hud_context.fillText(levelString, 130, 20);
  this.hud_context.fillText(livesString, 250, 20);

};

Display.prototype.end = function(score, level){

  this.game_context.font = '20px sans-serif';

  var scoreString = 'score: ' + score;
  var levelString = 'level: ' + level;
  
  this.game_context.fillStyle = '#3399FF';
  this.game_context.fillText('Game over', 10, 20);
  this.game_context.fillText(scoreString, 130, 20);
  this.game_context.fillText(levelString, 250, 20);
};

module.exports = Display;