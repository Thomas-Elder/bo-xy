
// Defines the ExplodeBox type.
var ExplodeBox = function(x, y, config, context) {
  this.x            = x;
  this.y            = y;
  this.width        = config.box.explode.size.width;
  this.height       = config.box.explode.size.height;

  this.context      = context;

  this.colour       = config.box.explode.colour;

  this.end          = false;

  this.count        = 0;
}

// Define the ExplodeBox type's draw method.
ExplodeBox.prototype.draw = function () {

  var i = Math.floor(this.count / 10);

  this.context.fillStyle = this.colour[i];
  this.context.fillRect(this.x,
                        this.y,
                        this.width,
                        this.height);
};

// Define the ExplodeBox type's update method.
ExplodeBox.prototype.update = function() {

  this.count++;
  this.width += 2;
  this.height += 2;

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