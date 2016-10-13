var Config = require('./config');
var EnemyBox = require('./box/enemyBox');
var PlayerBox = require('./box/playerBox');
var config = require('./config').getConfig();

/**
 * Game
 * @param socket the socket... should be io? we don't want to tie the game to 
 * one socket... there should be one Game running on the server, with multiple 
 * sockets interacting with it.  
 * 
 */
var Game = function(socket){

  this.socket = socket;  
  this.positions = [{x:20,y:20}, {x:40,y:40}];
  
  this.level = 0;
  this.enemyBoxes = [];
  
  for(var i = 0; i < config.numberOfEnemies; i++){
    this.enemyBoxes[i] = new EnemyBox(
      newEnemyLocation(),
      this.level,
      config);
  }
};

/**
 * 
 */
Game.prototype.run = function(){
  
  var game = this;
  
  console.log('Starting the game...');
  game.socket.emit('start',
      game.enemyBoxes
    );
  
  var loop = function(){
    
    // update each enemy box, creating a new enemy box if 
    // it's been set offScreen.
    for(var i = 0; i < game.enemyBoxes.length; i++){

        game.enemyBoxes[i].update();
        
        if (!game.enemyBoxes[i].isOnScreen()){        
          game.enemyBoxes[i] = new EnemyBox(
            newEnemyLocation(),
            game.level,
            config);
        }
    }

    // emit the update event
    game.socket.emit('update',
      game.enemyBoxes
    );
  };
 
  this.a = setInterval(loop, 100);
};

/**
 * clientUpdate
 * @param playerState an object with the state of the playerBox
 * 
 * Called when the server recieves an event from the client with 
 * an update of the playerBox.
 */
Game.prototype.clientUpdate = function(){
  
}

/**
 * stop
 * 
 * Called at the end of the game to stop the game loop.
 */
Game.prototype.stop = function(){
  clearInterval(this.a); 
};

/**
 * newEnemyLocation
 * @param config
 */
function newEnemyLocation() {

  return {
    x: Math.floor(Math.random() * config.screenSize.width), 
    y: -((config.screenSize.height - Math.floor(Math.random() * config.screenSize.height)))
  };
}

module.exports = Game;