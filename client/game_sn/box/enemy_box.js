
// Defines the EnemyBox type.
var EnemyBox = function (location, level, config) {
  this.x            = location.x;
  this.y            = location.y;
  
  this.width        = config.box.enemy.size.width;
  this.height       = config.box.enemy.size.height;

  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;

  this.colour       = config.box.enemy.colour[level];
  this.speed        = config.box.enemy.speed[level];
  this.colour       = config.box.enemy.colour[level];

  this.onScreen     = true;
  this.hit          = false;
}

// Define the EnemyBox type's update method.
EnemyBox.prototype.update = function() {

  // Move enemy down the screen
  if (this.y + this.height < this.screenHeight + this.height)
    this.y += this.speed;
  else
    this.onScreen = false;
};

// Returns an object with x an y coords, the box's current position
EnemyBox.prototype.getPosition = function() {
  return {x: this.x, y: this.y};
};

// Returns an object with width and height of the box
EnemyBox.prototype.getSize = function() {
  return {width: this.width, height: this.height};
};


module.exports = EnemyBox;