// Defines the Box type.
function Box(ini, controller, context) {
  this.x            = ini.playerStartPos.x ;
  this.y            = ini.playerStartPos.y ;
  this.width        = ini.playerSize.width;
  this.height       = ini.playerSize.height;
  this.screenWidth  = ini.screenSize.width;
  this.screenHeight = ini.screenSize.height;
  this.speed        = ini.playerSpeed;

  this.controller   = controller;
  this.context      = context;
}

// Define the Box type's draw method.
Box.prototype.draw = function() {
  this.context.fillStyle = '#3399FF';
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the Box type's update method.
Box.prototype.update = function() {
  if (this.controller.left && this.x > 0) 
    this.x = this.x - this.speed;
  
  if (this.controller.up && this.y > 0)
    this.y = this.y - this.speed;
  
  if (this.controller.right && this.x + this.width < this.screenWidth)
    this.x = this.x + this.speed;
  
  if (this.controller.down && this.y + this.height < this.screenHeight)
    this.y = this.y + this.speed;
};