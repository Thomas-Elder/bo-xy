
import {BoxManager} from './box/box_manager';
import {Hud} from './hud';
import {Display} from './display';
import {Controller} from './controller';

const config = require('./config');

/**
 * A class for managing the game.
 */
export class Engine {

  /**
   * Engine
   * 
   * @param {*} socket 
   * @param {*} contexts 
   */
  constructor(socket, contexts){

    this.socket       = socket;
    this.total_score  = 0;
    this.level_score  = 0;
    this.level        = 0;
    this.lives        = config.box.player.lives;

    this.max_level    = config.numberOfLevels;
    this.config = config;

    this.display = new Display(config, contexts);
    this.display.init();
    
    this.hud = new Hud(this.config);

    // Set up the controller to pass to the player
    var controller   = new Controller();

    // Register the controllers event listeners
    window.onkeydown = function (event) { controller.keyDown(event); };
    window.onkeyup   = function (event) { controller.keyUp(event); };

    this.boxManager = new BoxManager(config, controller);
    this.boxManager.init();
  }

  /**
   * run
   */
  run(){
    
    var self = this;

    var introCount = 0;
    var outroCount = self.config.outroDuration;
    var levelChangeCount = self.config.levelChangeDuration;
    var gameOver = false;

    // loop
    function loop(){

      // Set the state var to pass to draw methods.
      var state = {
        phase: true,
        hud: self.hud,
        player: self.boxManager.playerBox, 
        enemies: self.boxManager.enemyBoxes,
        explosions: self.boxManager.explodeBoxes,
        farStars: self.boxManager.farStarBoxes,
        nearStars: self.boxManager.nearStarBoxes,
        powerboxes: []
      };

      // First we need to do intro stuff, till introCount == introDuration
      if (introCount != self.config.introDuration) {
        // Update everything we want on the screen during this
        self.boxManager.updateBackground();
        self.hud.update();
        self.boxManager.updatePlayer();

        // Then draaw it all
        self.display.drawClear();
        self.display.drawBackground(state);
        self.display.drawPlayer(state);
        self.display.drawHud({
          score: 0,
          level: 0,
          lives: 3
        });

        introCount++;

        // Then we need to do the same between levels... 
      } else if (levelChangeCount != self.config.levelChangeDuration) {
        // Update everything we want on the screen during this
        self.boxManager.updateBackground();
        self.hud.update();
        self.boxManager.updatePlayer();
        self.boxManager.updateExplosions();

        // Then draaw it all
        self.display.drawClear();
        self.display.drawBackground(state);
        self.display.drawExplosions(state);
        self.display.drawPlayer(state);
        self.display.drawHud({
          score: self.score,
          level: self.level,
          lives: self.lives
        });

        levelChangeCount++;

        // Then we need to do the same at the end... 
      } else if (outroCount != self.config.outroDuration) {
        self.boxManager.updateBackground();
        self.hud.update();
        self.boxManager.updateExplosions();

        self.display.drawClear();
        self.display.drawBackground(state);
        self.display.drawExplosions(state);
        self.display.drawHud({
          score: self.score,
          level: self.level,
          lives: self.lives
        });

        outroCount++;

        // Else run the game
      } else if (!gameOver) {

        // Update the game  
        self.boxManager.updateBackground();
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
          outroCount = 0;
          gameOver = true;
        }

      } else {
        self.endGame();          
        clearInterval(gameLoop);
      }
    }

    var gameLoop = setInterval(loop, 1000 / config.fps);  
  }

  /**
   * update
   */
  update(){

    // update all
    this.background.update();
    this.hud.update();
    this.boxManager.update(this.level);

    this.boxManager.enemyHit()
    this.lives = config.box.player.lives - this.boxManager.enemiesHit;
    
    this.level = Math.floor(this.boxManager.enemiesDodged / 100);
    this.score = this.boxManager.enemiesDodged;

  }

  /**
   * draw
   */
  draw(){

    // draw game
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

    // draw hud
    this.display.drawHud({
      score: this.score,
      level: this.level,
      lives: this.lives
    });
  }

  /**
   * endGame
   */
  endGame(){

    this.display.end(this.score, this.level);

    var gameDetails = {}; 

    gameDetails.playerName = $("#name").val();
    gameDetails.level = this.level;
    gameDetails.score = this.score;

    // Emit event with game details object to add to highscores
    this.socket.emit('score', gameDetails);
  }
}