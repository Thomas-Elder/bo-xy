// Defines the EnemyBox type.
function EnemyBox(config, context) {
  this.x            = config.enemyStartPos.x ;
  this.y            = config.enemyStartPos.y ;
  this.width        = config.enemySize.width;
  this.height       = config.enemySize.height;
  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;
  //this.speed        = config.enemySpeed;
  this.gravity      = config.gravity;

  this.context      = context;

  this.onScreen     = true;
}

// Define the EnemyBox type's draw method.
EnemyBox.prototype.draw = function() {
  this.context.fillStyle = '#F01F0F';
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the EnemyBox type's update method.
EnemyBox.prototype.update = function() {

  // Move enemy down the screen
  if (this.y + this.height < this.screenHeight + this.height)
    this.y += this.gravity;
  else
    this.onScreen = false;
};

EnemyBox.prototype.isOnScreen = function() {
  return this.onScreen;
};