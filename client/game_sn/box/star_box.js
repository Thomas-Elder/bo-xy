
/**
 * StarBox
 */
 export class Starbox {

  constructor(location, config, width, height, colour, speed) {
    this.x            = location.x;
    this.y            = location.y;
    
    this.width        = width;
    this.height       = height;

    this.screenWidth  = config.screenSize.width;
    this.screenHeight = config.screenSize.height;

    this.colour       = colour;
    this.speed        = speed;

    this.onScreen     = true;
  }

  // Define the StarBox type's update method.
  update () {

    // Move enemy down the screen
    if (this.y + this.height < this.screenHeight + this.height)
      this.y += this.speed;
    else
      this.onScreen = false;
  }

  // Returns an object with x an y coords, the box's current position
  getPosition () {
    return {x: this.x, y: this.y};
  }

  // Returns an object with width and height of the box
  getSize () {
    return {width: this.width, height: this.height};
  }
}