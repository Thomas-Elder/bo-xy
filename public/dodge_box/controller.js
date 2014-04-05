
// Define the Controller type.
function Controller() {

  this.up    = false;
  this.down  = false;
  this.left  = false;
  this.right = false;

}

// Define the Controller type's keyDown method.
Controller.prototype.keyDown = function(event) {

  event.preventDefault();

  var keyCode = event.which || event.keyCode;

  if (keyCode == 37)
    this.left = true;
  else if (keyCode == 38)
    this.up = true;
  else if (keyCode == 39)
    this.right = true;
  else if (keyCode == 40)
    this.down = true;

};

// Define the Controller type's keyUp method.
Controller.prototype.keyUp = function(event) {

  var keyCode = event.which || event.keyCode;

  if (keyCode == 37)
    this.left = false;
  else if (keyCode == 38)
    this.up = false;
  else if (keyCode == 39)
    this.right = false;
  else if (keyCode == 40)
    this.down = false;

};
