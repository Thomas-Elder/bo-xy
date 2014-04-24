// Define the Splash type.
function Splash(config, context) {
  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;
  this.colour       = config.backgroundColour;
  this.startColour  = config.startColour;
  
  this.startSize    = config.startSize;

  this.context      = context;
}

// Define the Splash draw method.
Splash.prototype.draw = function() {
  this.context.fillStyle = this.colour;
  this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);

  this.context.fillStyle = this.startColour;
  this.context.fillRect((this.screenWidth / 2) - (this.startSize.width / 2),
                      (this.screenHeight / 2) - (this.startSize.height / 2),
                      this.startSize.width, this.startSize.height);
};

// Define the Splash update method.
Splash.prototype.update = function() {
  
};