
import { PlayerBox, EnemyBox, ExplodeBox, Starbox } from './boxes'

import { Interaction } from '../interaction';

const { Howl } = require('howler');
var explosion = new Howl({ src: ['static/game_sn/media/explosion.mp3'], volume: 0.3 });

/**
 * BoxManager
 * A class for managing the itinialisation and updating for the games boxes.
 */
export class BoxManager {

  constructor(config, controller) {

    this.config = config;
    this.controller = controller;

    this.enemyBoxes = new Array(this.config.numberOfEnemies);
    this.enemySpeed = config.box.enemy.speed;
    this.enemySpacing = 0;

    this.explodeBoxes = [];

    this.enemiesDodged = 0;
    this.enemiesHit = 0;
  }

  /**
   * init
   * Initialises the necessary objects and variables for the Box Manager.
   * 
   * Initialises instances of the following classes:
   * - interaction
   * - player
   * - enemy boxes
   * - explode box
   */
  init() {
    var self = this;

    self.interaction = new Interaction();

    // Instantiate a new instance of type PlayerBox.
    self.playerBox = new PlayerBox(self.config, self.controller);


    /* Calculate placement of enemy boxes based on width of screen and number of
    * boxes.
    */
    self.enemySpacing = (self.config.screenSize.width - self.config.box.enemy.size.width) / (self.config.numberOfEnemies - 1);

    // Instantiate an array of new instances of type EnemyBox.
    for (var i = 0; i < self.enemyBoxes.length; i++) {
      var location = self.newEnemyLocation(self.config.screenSize.width, self.config.screenSize.height);
      self.enemyBoxes[i] = new EnemyBox(location, 0, self.config);
    }

    self.explodeBoxes = [];
  }

  /**
   * updatePlayer
   * Calls the player box's update function.
   */
  updatePlayer() {

    var self = this;

    self.playerBox.update();
  }

  /**
   * updateExplosions
   * Iterates through the explode box array, calling update until
   * endOfExplode returns true.
   */
  updateExplosions() {

    var self = this;

    if (self.explodeBoxes.length > 0) {
      for (var k = 0; k < self.explodeBoxes.length; k++) {

        self.explodeBoxes[k].update();

        if (self.explodeBoxes[k].endOfExplode()) {
          self.explodeBoxes.splice(k, 1);
        }
      }
    }
  }

  /**
   * updateEnemies
   * Iterates through the enemy box array. If the enemy is on the screen 
   * it calls update, and increments the number of enemies dodged.
   * Otherwise create a new box at a new location.
   * 
   * @param {int} level the level at which to set the new array of enemies
   */
  updateEnemies(level) {

    var self = this;

    for (var i = 0; i < self.enemyBoxes.length; i++) {

      if (self.enemyBoxes[i].onScreen) {
        self.enemyBoxes[i].update();
      }

      if (!self.enemyBoxes[i].onScreen) {
        if (!self.enemyBoxes[i].hit)
          self.enemiesDodged++;

        var location = self.newEnemyLocation(self.config.screenSize.width, self.config.screenSize.height);
        self.enemyBoxes[i] = new EnemyBox(location, level, self.config);
      }
    }
  }

  /**
   * clearEnemies
   * Iterates through the enemy box array and creates new boxes at new
   * locations.
   * 
   * @param {int} level the level at which to set the new array of enemies
   */
  clearEnemies(level) {

    var self = this;

    for (var i = 0; i < self.enemyBoxes.length; i++) {
      var location = self.newEnemyLocation(self.config.screenSize.width, self.config.screenSize.height);
      self.enemyBoxes[i] = new EnemyBox(location, level, self.config);
    }
  }

  /** 
   * enemyHit
   * Checks if there's a collision between the player box and 
   * any of the enemy boxes. 
   * If the player is not invulnerable, and the enemy box is on
   * the screen, and any coordinates of either box overlap, the 
   * enemy box is set offscreen, an explode box is created, and 
   * the enemiesHit count is incremented.
   * 
   * The player box is also re-instantiated to trigger the
   * invulnerability period.
  */
  enemyHit() {

    var self = this;

    if (!self.playerBox.isBlinking) {
      self.enemyBoxes.forEach(function (enemy) {
        if (enemy.onScreen) {
          if (self.interaction.collision(self.playerBox, enemy)) {
            explosion.play();
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
  }

  /**
   * newEnemyLocation
   * Uses the width and height parameters to generate a new random location.
   * The y value will put the location returned off the top of the screen, this is 
   * so when enemies spawn they move into the top of the screen randomly.
   * 
   * @param {int} screenWidth the width of the screen to create an enemy location for
   * @param {int} screenHeight the height of the screen to create an enemy location for
   * @returns {object} an object with two fields, x and y
   */
  newEnemyLocation(screenWidth, screenHeight) {

    return {
      x: Math.floor(Math.random() * screenWidth),
      y: -((screenHeight - Math.floor(Math.random() * screenHeight)))
    };
  }
}