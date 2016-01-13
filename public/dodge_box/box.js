// Defines the Box type.
function Box(x, y, config, controller, context) {

  this.x            = x;
  this.y            = y;

  this.width        = config.size.width;
  this.height       = config.size.height;

  this.speed        = config.speed;
  this.gravity      = config.gravity;

  this.colour       = config.colour;
  this.lives        = config.lives;

  this.controller   = controller;
  this.context      = context;

  this.onScreen     = true;
}

// Define the PlayerBox type's draw method.
Box.prototype.draw = function() {

  this.context.fillStyle = this.colour;
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the PlayerBox type's update method.
Box.prototype.update = function(newLocation) {

  this.x = newLocation.x;
  this.y = newLocation.y;
};

// Returns an object with x an y coords, the box's current position
Box.prototype.getPosition = function() {

  return {x: this.x, y: this.y};
};

// Returns an object with width and height of the box
Box.prototype.getSize = function() {

  return {width: this.width, height: this.height};
};

// Returns true if the box is currently on the screen
Box.prototype.isOnScreen = function() {

  return this.onScreen;
};

// Set the box onScreen variable to false
Box.prototype.setOffScreen = function() {

  this.onScreen = false;
};

// Returns a the speed of the box
Box.prototype.getSpeed = function() {

  return this.speed;
};