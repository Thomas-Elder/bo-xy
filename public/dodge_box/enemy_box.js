// Defines the EnemyBox type.
function EnemyBox(x, y, level, config, context) {

  this.x            = x;
  this.y            = y;
  this.width        = config.box.enemy.size.width;
  this.height       = config.box.enemy.size.height;

  this.onScreen     = true;

  this.speed        = config.box.enemy.speed[level];
  this.colour       = config.box.enemy.colour[level];

  this.context      = context;
}

// Define the EnemyBox type's draw method.
EnemyBox.prototype.draw = function() {

  this.context.fillStyle = this.colour;
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the EnemyBox type's update method.
EnemyBox.prototype.update = function(newLocation) {

  this.x = newLocation.x;
  this.y = newLocation.y;
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

// Returns a the speed of the enemybox
EnemyBox.prototype.getSpeed = function() {

  return this.speed;
};