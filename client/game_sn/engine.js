
import {BoxManager} from './box/box_manager.mjs';
import {Hud} from './hud';
import {Display} from './display';
import {Controller} from './controller.mjs';
import {config} from './config';
import {EnemyBox, PlayerBox, ExplodeBox} from './box/boxes.mjs';
import {Utility} from './utility.mjs'

import { Howl } from 'howler';
var explosion = new Howl({ src: ['static/game_sn/media/explosion.mp3'], volume: 0.3 });

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
    var self = this;

    this.socket       = socket;
    this.level        = 0;
    this.lives        = config.box.player.lives;
    this.enemiesHit = 0;
    this.enemiesDodged = 0;

    this.max_level    = config.numberOfLevels;
    this.config = config;

    this.display = new Display(config, contexts);

    // Set up the controller to pass to the player
    this.controller   = new Controller();

    // Register the controllers event listeners
    window.onkeydown = function (event) { self.controller.keyDown(event); };
    window.onkeyup   = function (event) { self.controller.keyUp(event); };

    this.boxManager = new BoxManager(this.config, this.controller);

    // Instantiate the player
    this.player = new PlayerBox(this.config, this.controller);

    // Instantiate the enemies
    this.enemies = new Array(this.config.numberOfEnemies);

    for (var i = 0; i < this.config.numberOfEnemies; i++)
      this.enemies[i] = new EnemyBox(1, this.config);
  
    // Instantiate the explode boxes array.
    self.explosions = [];
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
        phase: 'intro',
        hud: self.hud,
        player: self.player, 
        enemies: self.enemies,
        explosions: self.explosions,
        farStars: self.boxManager.farStarBoxes,
        nearStars: self.boxManager.nearStarBoxes,
        powerboxes: [],
        score: self.enemiesDodged,
        level: 0,
        lives: 3
      };

      // set the phase...
      if (introCount != self.config.introDuration) {
        state.phase = 'intro';
        introCount++;

      } else if (levelChangeCount != self.config.levelChangeDuration) {
        state.phase = 'inter';
        levelChangeCount++;

      } else if (outroCount != self.config.outroDuration) {
        state.phase = 'outro';
        outroCount++;

      } else {
        self.enemies.forEach((enemy) => { enemy.level = self.level; });
        state.phase = 'play';
      }
      
      // If it's not game over, run the game
      if (!gameOver) {

        console.log('phase: ', state.phase)

        self.boxManager.updateBackground();
        self.player.update();
        self.updateExplosions();
        self.enemies.forEach((enemy) => { self.enemiesDodged += enemy.update(state.phase); });
        self.collision();

        self.lives = self.player.lives;
        self.score = self.boxManager.enemiesDodged;

        // Check if the level changed
        // And set levelChangeCount =0 so the break plays
        // Then update self.level.
        var currentLevel = Math.floor(self.enemiesDodged / 100);
        if (self.level != currentLevel) {
          levelChangeCount = 0;
          self.level = currentLevel;
        }

        // Then draw
        self.display.draw(state);

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

  collision(){
    var self = this;

    if (!self.player.isBlinking) {
      
      self.enemies.forEach(function (enemy) {
        if (!enemy.hit) {
          if (Utility.overlap(self.player, enemy)) {
            explosion.play();
            enemy.hit = true;
            self.explosions.push(new ExplodeBox(enemy.x, enemy.y,
              self.config));

            self.player.lives--;
            self.enemiesHit++;

            self.player = new PlayerBox(self.config, self.controller);
          }
        }
      });
    }
  }

    /**
   * updateExplosions
   * Iterates through the explode box array, calling update until
   * endOfExplode returns true.
   */
  updateExplosions() {

    var self = this;

    if (self.explosions.length > 0) {
      for (var k = 0; k < self.explosions.length; k++) {

        self.explosions[k].update();

        if (self.explosions[k].endOfExplode()) {
          self.explosions.splice(k, 1);
        }
      }
    }
  }
}