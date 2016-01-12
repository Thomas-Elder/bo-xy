// Defines the ExplodeBox type.
function ExplodeBox(x, y, config, context) {
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