// Defines the Box type.
var PlayerBox = function(config) {
  this.x            = (config.screenSize.width / 2) - (config.playerSize.width / 2);
  this.y            = config.screenSize.height - config.playerSize.height;

  this.lives        = config.playerLives;
}

// Define the PlayerBox type's draw method.
PlayerBox.prototype.draw = function() {
  this.context.fillStyle = this.colour;
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the PlayerBox type's update method.
PlayerBox.prototype.update = function(x, y) {
  this.x = x;
  this.y = y;
};

// Returns an object with x an y coords, the PlayerBox's current position
PlayerBox.prototype.getPosition = function() {
  return {x: this.x, y: this.y};
};

module.exports = PlayerBox;