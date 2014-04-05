function Hud(config, context) {
  this.config  = config;
  this.context = context;

  this.score   = 0;
}

Hud.prototype.draw = function() {
  this.context.font = '20px sans-serif';

  var scoreString = 'Score: ' + this.score;

  this.context.fillStyle = '#3399FF';
  this.context.fillText(scoreString, 10, 20);
};

Hud.prototype.update = function(score) {
  this.score = score;
};