// Defines the EnemyBox type.
function EnemyBox(x, y, level, config, context) {
  this.x            = x;
  this.y            = y;
  this.width        = config.enemySize.width;
  this.height       = config.enemySize.height;
  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;
  this.colour       = config.enemyColour[0];
  
  this.context      = context;
  
  this.onScreen     = true;
  
  this.speed        = config.enemySpeed[level];
  this.colour       = config.enemyColour[level];
}

// Define the EnemyBox type's draw method.
EnemyBox.prototype.draw = function() {
  this.context.fillStyle = this.colour;
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the EnemyBox type's update method.
EnemyBox.prototype.update = function() {

  // Move enemy down the screen
  if (this.y + this.height < this.screenHeight + this.height)
    this.y += this.speed;
  else
    this.onScreen = false;
};

// Returns true if the box is currently on the screen
EnemyBox.prototype.isOnScreen = function() {
  return this.onScreen;
};

// Set the box onScreen variable to false
EnemyBox.prototype.setOffScreen = function() {
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