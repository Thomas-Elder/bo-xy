
// Defines the StarBox type.
var StarBox = function (location, config) {
  this.x            = location.x;
  this.y            = location.y;
  
  this.width        = config.box.star.size.width;
  this.height       = config.box.star.size.height;

  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;

  this.colour       = config.box.star.colour;
  this.speed        = config.box.star.speed;

  this.onScreen     = true;
}

// Define the StarBox type's update method.
StarBox.prototype.update = function() {

  // Move enemy down the screen
  if (this.y + this.height < this.screenHeight + this.height)
    this.y += this.speed;
  else
    this.onScreen = false;
};

// Returns an object with x an y coords, the box's current position
StarBox.prototype.getPosition = function() {
  return {x: this.x, y: this.y};
};

// Returns an object with width and height of the box
StarBox.prototype.getSize = function() {
  return {width: this.width, height: this.height};
};


module.exports = StarBox;