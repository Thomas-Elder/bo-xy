
/**
 * Controller
 * A class for managing the state of the controlling keys.
 * Due to the way key events are triggered, this controller sets
 * up states for the controlling keys to use for movement. So if a 
 * key down event is triggered, the state of that key is set true, 
 * until we get a key up event for that key.
 * 
 * This avoids the pause after the first key event is triggered, so 
 * movement can be smooth.
 */
export class Controller {
  constructor () {

    this.up    = false;
    this.down  = false;
    this.left  = false;
    this.right = false;
  }

  /**
   * keyDown
   * When a key down event is recieved, this function checks which
   * key is pressed, and sets the associated state to true.
   * 
   * event.preventDefault() is called first to prevent the default 
   * behaviour of the key being triggered, ie typing when we want 
   * the key to move the box.
   * @param {*} event a keyboard event
   */
  keyDown(event) {

    var keyCode = event.which || event.keyCode;

    if (keyCode < 41 && keyCode > 36) {
      event.preventDefault();

      if (keyCode == 37)
        this.left = true;
      else if (keyCode == 38)
        this.up = true;
      else if (keyCode == 39)
        this.right = true;
      else if (keyCode == 40)
        this.down = true;
    }
  }

  /**
   * keyUp
   * When a key up event is recieved, this function checks which
   * key has been released, and sets the associated state to false.
   * @param {*} event a keyboard event
   */
  keyUp (event) {

    var keyCode = event.which || event.keyCode;

    if (keyCode == 37)
      this.left = false;
    else if (keyCode == 38)
      this.up = false;
    else if (keyCode == 39)
      this.right = false;
    else if (keyCode == 40)
      this.down = false;
  }
}