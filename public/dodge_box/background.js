// Define the Background type.
function Background(config, speed, context) {
  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;
  this.colour       = config.backgroundColour;

  this.context      = context;
  this.speed        = speed;
}

// Define the Backgrounds draw method.
Background.prototype.draw = function() {
  this.context.fillStyle = this.colour;
  this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);
};

// Define the Backgrounds update method.
Background.prototype.update = function() {
  
};