// Defines the Box type.
function Box(x, y, width, height, screenWidth, screenHeight, speed, controller, context) {
    this.x            = x;
    this.y            = y;
    this.width        = width;
    this.height       = height;
    this.screenWidth  = screenWidth;
    this.screenHeight = screenHeight;
    this.speed        = speed;
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