// Defines the Box type.
function PlayerBox(x, y, config, controller, context) {

  this.x            = x;
  this.y            = y;
  this.width        = config.size.width;
  this.height       = config.size.height;

  this.speed        = config.speed;

  this.colour       = config.colour;
  this.lives        = config.lives;

  this.controller   = controller;
  this.context      = context;
}

// Define the PlayerBox type's draw method.
PlayerBox.prototype.draw = function() {

  this.context.fillStyle = this.colour;
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the PlayerBox type's update method.
PlayerBox.prototype.update = function(newLocation) {

  this.x = newLocation.x;
  this.y = newLocation.y;
};

// Returns an object with x an y coords, the box's current position
PlayerBox.prototype.getPosition = function() {
  return {x: this.x, y: this.y};
};

// Returns an object with width and height of the box
PlayerBox.prototype.getSize = function() {

  return {width: this.width, height: this.height};
};

// Returns a the speed of the playerbox
PlayerBox.prototype.getSpeed = function() {

  return this.speed;
};