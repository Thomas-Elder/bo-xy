function Hud(config, context) {
  this.config  = config;
  this.context = context;

  this.score   = 0;
  this.level   = 0;
}

Hud.prototype.draw = function() {
  this.context.font = '20px sans-serif';

  var scoreString = 'score: ' + this.score;
  var levelString = 'level: ' + this.level;

  this.context.fillStyle = '#3399FF';
  this.context.fillText(scoreString, 10, 20);
  this.context.fillText(levelString, 150, 20);
};

Hud.prototype.update = function(score, level) {
  this.score = score;
  this.level = level;
};