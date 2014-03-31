// Defines the EnemyBox type.
function EnemyBox(x, y, level, config, context) {
  this.x            = x;
  this.y            = y;
  this.width        = config.enemySize.width;
  this.height       = config.enemySize.height;
  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;
  this.colour       = config.enemyColour[0];
  
  this.context      = context;
  
  this.onScreen     = true;
  
  this.speed        = config.enemySpeed[level];
  this.colour       = config.enemyColour[level];
}

// Define the EnemyBox type's draw method.
EnemyBox.prototype.draw = function() {
  this.context.fillStyle = this.colour;
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the EnemyBox type's update method.
EnemyBox.prototype.update = function() {

  // Move enemy down the screen
  if (this.y + this.height < this.screenHeight + this.height)
    this.y += this.speed;
  else
    this.onScreen = false;
};

EnemyBox.prototype.isOnScreen = function() {
  return this.onScreen;
};