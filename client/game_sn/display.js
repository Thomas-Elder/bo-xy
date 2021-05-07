
/**
 * Display
 * A class for handling calling any draw functions.
 * 
 * @param {Object} config config file
 * @param {Object} contexts an object wrapping the game and hud contexts for drawing 
 */
export class Display {

  constructor (config, contexts){
    this.config = config;
    this.contexts = contexts;
 
    this.contexts.game_canvas.width   = this.config.screenSize.width;
    this.contexts.game_canvas.height  = this.config.screenSize.height;

    this.contexts.hud_canvas.width   = this.config.hudSize.width;
    this.contexts.hud_canvas.height  = this.config.hudSize.height;

    this.game_context = this.contexts.game_context;
    this.hud_context = this.contexts.hud_context;

    this.tick = 0;
  }

  draw(state){
    this.drawClear();
    this.drawBackground(state);
    this.drawPlayer(state);
    this.drawEnemies(state);
    this.drawExplosions(state);
    this.drawPowerBoxes(state);
    this.drawHud(state);
  }

  /**
   * drawClear
   * Clears the game_context and hud_context ready to draw game elements each frame.
   * 
   */
  drawClear() {
    var self = this;

    // Clear the contexts for redraw
    self.game_context.clearRect(0, 0, 
                            self.config.screenSize.width, 
                            self.config.screenSize.height);
    self.hud_context.clearRect(0, 0, 
                            self.config.hudSize.width, 
                            self.config.hudSize.height);
  }

  /**
   * drawBackground
   * Draws the background of the game, including stars.
   * 
   * @param state : an object describing the state of the game.
   * The following fields are expected in the state object:
   * hud: a Hud object
   * player: a PlayerBox object
   * enemies: an array of EnemyBox objects
   * explosions: an array of ExplodeBox objects
   * powerboxes: an array of PowerBox objects
   * nearStars: an array of StarBox objects
   * farStars: an array of StarBox objects
   */
  drawBackground(state) {
    var self = this;

    // Draw the background
    self.game_context.fillStyle = self.config.backgroundColour;
    self.game_context.fillRect(0, 
                            0, 
                            self.config.screenSize.width, 
                            self.config.screenSize.height);

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
  }

  /**
   * drawPlayer
   * Draws the player box
   * 
   * @param state : an object describing the state of the game.
   * The following fields are expected in the state object:
   * hud: a Hud object
   * player: a PlayerBox object
   * enemies: an array of EnemyBox objects
   * explosions: an array of ExplodeBox objects
   * powerboxes: an array of PowerBox objects
   * nearStars: an array of StarBox objects
   * farStars: an array of StarBox objects
   */
  drawPlayer(state) {
    var self = this;

    var blinkRate = self.config.fps / 2;

    self.tick++;

    if (self.tick > blinkRate)
      self.tick = 0;

    // Draw the player box
    if (state.player.isBlinking > 0) {
      if (self.tick < blinkRate/2) {
        self.game_context.fillStyle = state.player.colour;
        self.game_context.fillRect(state.player.x, 
                                state.player.y, 
                                state.player.width, 
                                state.player.height);
      } else {
        self.game_context.fillStyle = state.player.invColour;
        self.game_context.fillRect(state.player.x, 
                                state.player.y, 
                                state.player.width, 
                                state.player.height);
      }

    } else {
      self.game_context.fillStyle = state.player.colour;
      self.game_context.fillRect(state.player.x, 
                              state.player.y, 
                              state.player.width, 
                              state.player.height);
    }
  }

  /**
   * drawEnemies
   * Draws the enemy boxes
   * 
   * @param state : an object describing the state of the game.
   * The following fields are expected in the state object:
   * hud: a Hud object
   * player: a PlayerBox object
   * enemies: an array of EnemyBox objects
   * explosions: an array of ExplodeBox objects
   * powerboxes: an array of PowerBox objects
   * nearStars: an array of StarBox objects
   * farStars: an array of StarBox objects
   */
  drawEnemies(state) {
    var self = this;

    // Draw the enemy boxes
    state.enemies.forEach(function(enemy){
      self.game_context.fillStyle = enemy.colour;
      self.game_context.fillRect(enemy.x, 
                            enemy.y, 
                            enemy.width, 
                            enemy.height);
    });
  }

  /**
   * drawExplosions
   * Draws the explosion boxes
   * 
   * @param state : an object describing the state of the game.
   * The following fields are expected in the state object:
   * hud: a Hud object
   * player: a PlayerBox object
   * enemies: an array of EnemyBox objects
   * explosions: an array of ExplodeBox objects
   * powerboxes: an array of PowerBox objects
   * nearStars: an array of StarBox objects
   * farStars: an array of StarBox objects
   */
  drawExplosions(state) {
    var self = this;

    // Draw the explosions, if any
    state.explosions.forEach(function(explosion){
      self.game_context.fillStyle = explosion.currentColour;
      self.game_context.fillRect(explosion.x, 
                            explosion.y, 
                            explosion.width, 
                            explosion.height);
    });
  }

  /**
   * drawPowerBoxes
   * Draws the power boxes
   * 
   * @param state : an object describing the state of the game.
   * The following fields are expected in the state object:
   * hud: a Hud object
   * player: a PlayerBox object
   * enemies: an array of EnemyBox objects
   * explosions: an array of ExplodeBox objects
   * powerboxes: an array of PowerBox objects
   * nearStars: an array of StarBox objects
   * farStars: an array of StarBox objects
   */
  drawPowerBoxes(state) {
    var self = this;

    // Draw the powerboxes, if any
    state.powerboxes.forEach(function(powerboxes){
      self.game_context.fillStyle = powerboxes.colour;
      self.game_context.fillRect(powerboxes.x, 
                            powerboxes.y, 
                            powerboxes.width, 
                            powerboxes.height);
    });
  }

  /**
   * drawHud
   * Draws the hud
   * 
   * @param {Object} hudState : an object describing the game state for the hud. 
   * The following fields are expected in the state object:
   * score: {number} the current player score 
   * level: {number} the current level of the game
   * lives: {number} the number of lives the player has left
   */
  drawHud(hudState){

    this.hud_context.font = '20px sans-serif';

    var scoreString = 'score: ' + hudState.score;
    var levelString = 'level: ' + hudState.level;
    var livesString = 'lives: ' + hudState.lives;

    this.hud_context.fillStyle = '#3399FF';
    this.hud_context.fillText(scoreString, 10, 20);
    this.hud_context.fillText(levelString, 130, 20);
    this.hud_context.fillText(livesString, 250, 20);

  }

  /**
   * end
   * Displays the final score at the end of the game
   * 
   * @param {number} score the final score  
   * @param {number} level the final level
   */
  end(score, level){

    this.game_context.font = '20px sans-serif';

    var scoreString = 'score: ' + score;
    var levelString = 'level: ' + level;
    
    this.game_context.fillStyle = '#3399FF';
    this.game_context.fillText('Game over', 10, 20);
    this.game_context.fillText(scoreString, 130, 20);
    this.game_context.fillText(levelString, 250, 20);
  }
}