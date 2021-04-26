
export class Hud {

  constructor(config) {
  this.config  = config;

  this.score   = 0;
  this.level   = 0;
  this.lives   = config.playerLives;
  }

  update(score, level, lives) {
    this.score = score;
    this.level = level;
    this.lives = lives;
  }
}