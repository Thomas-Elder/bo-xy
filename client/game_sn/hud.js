
Hud = function(config, context) {
  this.config  = config;
  this.context = context;

  this.score   = 0;
  this.level   = 0;
  this.lives   = config.playerLives;
}

Hud.prototype.draw = function() {
  this.context.font = '20px sans-serif';

  var scoreString = 'score: ' + this.score;
  var levelString = 'level: ' + this.level;
  var livesString = 'lives: ' + this.lives;

  this.context.fillStyle = '#3399FF';
  this.context.fillText(scoreString, 10, 20);
  this.context.fillText(levelString, 130, 20);
  this.context.fillText(livesString, 250, 20);
};

Hud.prototype.update = function(score, level, lives) {
  this.score = score;
  this.level = level;
  this.lives = lives;
};


module.exports = Hud;