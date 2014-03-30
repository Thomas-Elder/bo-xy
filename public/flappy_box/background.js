// Define the Background type.
function Background(screenSize, speed, context) {
  this.screenWidth  = screenSize.width;
  this.screenHeight = screenSize.height;

  this.context      = context;
  this.speed        = speed;
}

// Define the Backgrounds draw method.
Background.prototype.draw = function() {
  this.context.fillStyle = '#1A1A1A';
  this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);
};

// Define the Backgrounds update method.
Background.prototype.update = function() {
  
};