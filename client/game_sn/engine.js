
/**
 * A class for managing the game.
 */
var Engine = function(){

};

Engine.prototype.init = function(){

};

Engine.prototype.run() = function(){

};

Engine.prototype.collisionDetection = function(a, b) {
  if ((a.getPosition().x - b.getSize().width) < b.getPosition().x) {
    if (b.getPosition().x  < (a.getPosition().x + a.getSize().width)) {
      if ((b.getPosition().y + b.getSize().height) > a.getPosition().y) {
        if (b.getPosition().y < (a.getPosition().y + a.getSize().height)) {
          return true;
        }
      }
    }
  }

  return false;
};

Engine.prototype.newEnemyLocation = function(config) {

  return {
    x: Math.floor(Math.random() * config.screenSize.width), 
    y: -((this.config.screenSize.height - Math.floor(Math.random() * this.config.screenSize.height)))
  };
};


module.exports = Engine;