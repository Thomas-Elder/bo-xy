
import {Starbox} from './box/boxes';

// Define the Background type.
var Background = function(config, speed, context) {
  this.screenWidth  = config.screenSize.width;
  this.screenHeight = config.screenSize.height;
  this.colour       = config.backgroundColour;

  this.context      = context;
  this.speed        = speed;

  this.config       = config;
  
  this.farStarBoxes   = new Array(this.config.numberOfFarStars);
  this.farStarSpeed   = config.box.farstar.speed;

  this.nearStarBoxes   = new Array(this.config.numberOfNearStars);
  this.nearStarSpeed   = config.box.nearstar.speed;
}

// Define the Backgrounds draw method.
Background.prototype.draw = function() {
  this.context.fillStyle = this.colour;
  this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);
};

Background.prototype.init = function() {

  // Instantiate an array of new instances of type StarBox.
  for (var i = 0; i < this.farStarBoxes.length; i++) {
    var location = this.startStarLocation(this.config);
    this.farStarBoxes[i] = new Starbox(location, this.config, 
                                                this.config.box.farstar.size.width, 
                                                this.config.box.farstar.size.height, 
                                                this.config.box.farstar.colour, 
                                                this.config.box.farstar.speed);
  }

  // Instantiate an array of new instances of type StarBox.
  for (var i = 0; i < this.nearStarBoxes.length; i++) {
    var location = this.startStarLocation(this.config);
    this.nearStarBoxes[i] = new Starbox(location, this.config, 
                                                  this.config.box.nearstar.size.width, 
                                                  this.config.box.nearstar.size.height, 
                                                  this.config.box.nearstar.colour, 
                                                  this.config.box.nearstar.speed);
  }
};

// Define the Backgrounds update method.
Background.prototype.update = function() {

  // Update the location of all farStarBoxes
  for (var i = 0; i < this.farStarBoxes.length; i++){
    if (this.farStarBoxes[i].onScreen){
      this.farStarBoxes[i].update();
    } else {
      var location = this.newStarLocation(this.config);
      this.farStarBoxes[i] = new Starbox(location, this.config, 
                                                    this.config.box.farstar.size.width, 
                                                    this.config.box.farstar.size.height, 
                                                    this.config.box.farstar.colour, 
                                                    this.config.box.farstar.speed);
    }
  }

  // Update the location of all nearStarBoxes
  for (var i = 0; i < this.nearStarBoxes.length; i++){
    if (this.nearStarBoxes[i].onScreen){
      this.nearStarBoxes[i].update();
    } else {
      var location = this.newStarLocation(this.config);
      this.nearStarBoxes[i] = new Starbox(location, this.config, 
                                                    this.config.box.nearstar.size.width, 
                                                    this.config.box.nearstar.size.height, 
                                                    this.config.box.nearstar.colour, 
                                                    this.config.box.nearstar.speed);
    }
  }
};

/**
 * newStarLocation
 */
 Background.prototype.startStarLocation = function(config) {

  return {
    x: Math.floor(Math.random() * config.screenSize.width), 
    y: this.config.screenSize.height - Math.floor(Math.random() * this.config.screenSize.height)
  };
};

/**
 * newStarLocation
 */
 Background.prototype.newStarLocation = function(config) {

  return {
    x: Math.floor(Math.random() * config.screenSize.width), 
    y: -(this.config.screenSize.height - Math.floor(Math.random() * this.config.screenSize.height))
  };
};

module.exports = Background;