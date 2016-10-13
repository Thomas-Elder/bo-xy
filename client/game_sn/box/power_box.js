// Defines the PowerBox type.
function PowerBox(x, y, config) {
  this.x            = x;
  this.y            = y;
  this.width        = config.box.power.size.width;
  this.height       = config.box.power.size.height;
  this.speed        = config.box.power.speed;
  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;

  this.colour       = config.box.power.colour;
  
  this.onScreen     = true;

  this.count        = 0;
  this.colourIndex  = 0;
}

// Define the PowerBox type's update method.
PowerBox.prototype.update = function() {

  this.count++;

  if (this.count === 20) {
    this.colourIndex = this.colourIndex === 1 ? 0 : 1;
    this.count = 0;
  }
  
  // Move box down the screen
  if (this.y + this.height < this.screenHeight + this.height)
    this.y += this.speed;
  else
    this.onScreen = false;
};

// Returns true if the box is currently on the screen
PowerBox.prototype.isOnScreen = function() {
  return this.onScreen;
};

// Set the box onScreen variable to false
PowerBox.prototype.setOffScreen = function() {
  this.onScreen = false;
};

// Returns an object with x an y coords, the box's current position
PowerBox.prototype.getPosition = function() {
  return {x: this.x, y: this.y};
};

// Returns an object with width and height of the box
PowerBox.prototype.getSize = function() {
  return {width: this.width, height: this.height};
};