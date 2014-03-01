// Define the Background type.
function Background(screenWidth, screenHeight, speed, context) {
    this.screenWidth  = screenWidth;
    this.screenHeight = screenHeight;    
    this.context      = context;
    this.speed        = speed;
}

// Define the Backgrounds draw method.
Background.prototype.draw = function() {
    this.context.fillStyle = '#1A1A1A';
    this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);
};