// Defines the Box type.
function PlayerBox(config, controller, context) {
  this.x            = config.playerStartPos.x ;
  this.y            = config.playerStartPos.y ;
  this.width        = config.playerSize.width;
  this.height       = config.playerSize.height;
  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;
  this.speed        = config.playerSpeed;
  this.gravity      = config.gravity;

  this.controller   = controller;
  this.context      = context;
}

// Define the PlayerBox type's draw method.
PlayerBox.prototype.draw = function() {
  this.context.fillStyle = '#3399FF';
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the PlayerBox type's update method.
PlayerBox.prototype.update = function() {
  if (this.controller.left && this.x > 0) 
    this.x = this.x - this.speed;

  // apply gravity
  if (this.y + this.height < this.screenHeight)
    this.y += this.gravity;

  if (this.controller.up && this.y > 0)
    this.y = this.y - this.speed;

  if (this.controller.right && this.x + this.width < this.screenWidth)
    this.x = this.x + this.speed;

  if (this.controller.down && this.y + this.height < this.screenHeight)
    this.y = this.y + this.speed;
};

