/**
 * EnemyBox
 * @param startingPosition
 * @param level
 * @param config
 * 
 */
var EnemyBox = function(startingPosition, level, config) {
  this.x            = startingPosition.x;
  this.y            = startingPosition.y;
  this.width        = config.box.enemy.size.width;
  this.height       = config.box.enemy.size.height;
  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;
  
  this.onScreen     = true;
  
  this.speed        = config.box.enemy.speed[level];
};

/**
 * update
 * 
 */
EnemyBox.prototype.update = function() {

  // Move enemy down the screen
  if (this.y + this.height < this.screenHeight + this.height)
    this.y += this.speed;
  else
    this.onScreen = false;
};

/**
 * isOnScreen
 * 
 */
EnemyBox.prototype.isOnScreen = function() {
  return this.onScreen;
};

/**
 * getPosition
 * 
 */
EnemyBox.prototype.getPosition = function() {
  return {x: this.x, y: this.y};
};

/**
 * getSize
 * 
 */
EnemyBox.prototype.getSize = function() {
  return {width: this.width, height: this.height};
};

module.exports = EnemyBox;