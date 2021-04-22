
// Box requirements
var PlayerBox = require('./box/player_box');
var EnemyBox = require('./box/enemy_box');
var ExplodeBox = require('./box/explode_box');
var Starbox = require('./box/star_box');
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
const { levelChangeDuration, outroDuration } = require('./config');

/**
 * A class for managing the game.
 */
var Engine = function(socket){

  this.socket       = socket;
  this.total_score  = 0;
  this.level_score  = 0;
  this.level        = 0;
  this.lives        = config.box.player.lives;

  this.max_level    = config.numberOfLevels;
  this.config = config;

};

/**
 * 
 */
Engine.prototype.init = function(contexts){

  this.interaction = new Interaction();

  this.display = new Display(config, contexts);
  this.display.init();

  this.background = new Background(config);
  this.background.init();
  
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

  var introCount = 0;
  var outroCount = self.config.outroDuration;
  var levelChangeCount = self.config.levelChangeDuration;

  // loop
  function loop(){

    // Set the state var to pass to draw methods.
    var state = {
      background: self.background,
      hud: self.hud,
      player: self.boxManager.playerBox, 
      enemies: self.boxManager.enemyBoxes,
      explosions: self.boxManager.explodeBoxes,
      farStars: self.background.farStarBoxes,
      nearStars: self.background.nearStarBoxes,
      powerboxes: []
    };

    // First we need to do intro stuff, till introCount == introDuration
    if (introCount != self.config.introDuration) {
      // Update everything we want on the screen during this
      self.background.update();
      self.hud.update();
      self.boxManager.updatePlayer();

      // Then draaw it all
      self.display.drawClear();
      self.display.drawBackground(state);
      self.display.drawPlayer(state);
      self.display.drawHud({
        score: self.score,
        level: self.level,
        lives: self.lives
      });

      introCount++;

      // Then we need to do the same between levels... 
    } else if (levelChangeCount != levelChangeDuration) {
      // Update everything we want on the screen during this
      self.background.update();
      self.hud.update();
      self.boxManager.updatePlayer();

      // Then draaw it all
      self.display.drawClear();
      self.display.drawBackground(state);
      self.display.drawPlayer(state);
      self.display.drawHud({
        score: self.score,
        level: self.level,
        lives: self.lives
      });

      levelChangeCount++;

      // Then we need to do the same at the end... 
    } else if (outroCount != outroDuration) {
      self.background.update();
      self.hud.update();
      self.display.drawClear();
      self.display.drawBackground(state);
      self.display.drawHud({
        score: self.score,
        level: self.level,
        lives: self.lives
      });

      outroCount++;

      // Else run the game
    } else {

      // Update the game  
      self.background.update();
      self.hud.update();
      self.boxManager.updatePlayer();
      self.boxManager.updateExplosions();
      self.boxManager.updateEnemies(self.level);
      self.boxManager.enemyHit();
      self.lives = config.box.player.lives - self.boxManager.enemiesHit;
      self.score = self.boxManager.enemiesDodged;

      // Check if the level changed
      // And set levelChangeCount =0 so the break plays
      // Then update self.level, and clearEnemies
      var currentLevel = Math.floor(self.boxManager.enemiesDodged / 100); 
      if (self.level != currentLevel) {
        levelChangeCount = 0;
        self.level = currentLevel;
        self.boxManager.clearEnemies(self.level);
      }

      // And the draws...
      self.display.drawClear();
      self.display.drawBackground(state);
      self.display.drawPlayer(state);
      self.display.drawEnemies(state);
      self.display.drawExplosions(state);
      self.display.drawHud({
        score: self.score,
        level: self.level,
        lives: self.lives
      });

      // Check if game is over and clearInterval if so
      if (self.lives === 0 || self.level === config.numberOfLevels) {
        self.endGame();          
        clearInterval(gameLoop);
      }
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
  this.boxManager.update(this.level);

  this.boxManager.enemyHit()
  this.lives = config.box.player.lives - this.boxManager.enemiesHit;
  
  this.level = Math.floor(this.boxManager.enemiesDodged / 100);
  this.score = this.boxManager.enemiesDodged;

};

/**
 * draw
 */
Engine.prototype.draw = function(){

  // draw
  this.display.drawGame({
    background: this.background,
    hud: this.hud,
    player: this.boxManager.playerBox, 
    enemies: this.boxManager.enemyBoxes,
    explosions: this.boxManager.explodeBoxes,
    farStars: this.background.farStarBoxes,
    nearStars: this.background.nearStarBoxes,
    powerboxes: []
  });

  this.display.drawHud({
    score: this.score,
    level: this.level,
    lives: this.lives
  });
};

/**
 * 
 */
Engine.prototype.endGame = function(){

  this.display.end(this.score, this.level);

  var gameDetails = {}; 

  gameDetails.playerName = $("#name").val();
  gameDetails.level = this.level;
  gameDetails.score = this.score;

  // Emit event with game details object to add to highscores
  this.socket.emit('score', gameDetails);
};

module.exports = Engine;