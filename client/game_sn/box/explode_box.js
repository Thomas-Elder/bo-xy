
// Defines the ExplodeBox type.
var ExplodeBox = function(x, y, config) {
  this.x            = x;
  this.y            = y;
  this.width        = config.box.explode.size.width;
  this.height       = config.box.explode.size.height;

  this.colour       = config.box.explode.colour;
  this.currentColour= config.box.explode.colour[0];

  this.end          = false;

  this.count        = 0;
}

// Define the ExplodeBox type's update method.
ExplodeBox.prototype.update = function() {

  this.count++;
  this.width += 2;
  this.height += 2;

  this.currentColour = this.colour[Math.floor(this.count / 10)];

  if (this.count == 50) {
    this.end = true;
  }
};

ExplodeBox.prototype.endOfExplode = function() {
  return this.end;
};

// Returns an object with x an y coords, the box's current position
ExplodeBox.prototype.getPosition = function() {
  return {x: this.x, y: this.y};
};

// Returns an object with width and height of the box
ExplodeBox.prototype.getSize = function() {
  return {width: this.width, height: this.height};
};

module.exports = ExplodeBox;