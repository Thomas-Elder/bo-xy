// Defines the Box type.
function RemoteBox(ini, socket, context) {
  
  this.x            = ini.playerStartPos.x ;
  this.y            = ini.playerStartPos.y ;
  this.width        = ini.playerSize.width;
  this.height       = ini.playerSize.height;
  this.screenWidth  = ini.screenSize.width;
  this.screenHeight = ini.screenSize.height;
  this.speed        = ini.playerSpeed;

  this.socket       = socket;
  this.context      = context;
  
  this.left = false;
  this.up = false;
  this.right = false;
  this.down = false;
}

// Define the Box type's draw method.
RemoteBox.prototype.draw = function() {

  this.context.fillStyle = '#3399FF';
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

// Define the Box type's update method.
RemoteBox.prototype.update = function() {

  if (this.left && this.x > 0) 
    this.x = this.x - this.speed;
  
  if (this.up && this.y > 0)
    this.y = this.y - this.speed;
  
  if (this.right && this.x + this.width < this.screenWidth)
    this.x = this.x + this.speed;
  
  if (this.down && this.y + this.height < this.screenHeight)
    this.y = this.y + this.speed;
};

RemoteBox.prototype.changeState = function(state){
  
  this.left = state.left;
  this.up = state.up;
  this.right = state.right;
  this.down = state.down;
}