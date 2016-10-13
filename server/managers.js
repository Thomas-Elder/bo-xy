
/**
 * Lobbies
 * 
 * Instantiates an object of type Lobbies. 
 * Contains several functions for adding, removing and
 * returning information about current lobbies in the 
 * system.
 * 
 */
var Lobbies = function(){
  this.lobbies = [];
};

/**
 * add
 * @param {object} lobby The lobby to be added.
 * 
 * Add a lobby object to the array.
 */
Lobbies.prototype.add = function(lobby){
  this.lobbies.push(lobby);
};

/**
 * remove
 * @param {string} key The lobby to be removed.
 */
Lobbies.prototype.remove = function(key){
  var self = this;
  
  self.lobbies.forEach(function(lobby) {
    if(lobby.id === key) {
      self.lobbies.splice(self.lobbies.indexOf(lobby), 1);
    }    
  });
};

/**
 * get
 * @param {string} key the lobby to be returned.
 * @return {object} lobby The lobby being returned.
 */
Lobbies.prototype.get = function(key){
  
  var result;
  
  this.lobbies.forEach(function(lobby) {
    if(lobby.id === key) {
      result = lobby;
    }    
  });
  
  return result;
};

/**
 * getAll
 * @return {array} array of lobbies
 */
Lobbies.prototype.getAll = function () {
  return this.lobbies;
};


/**
 * Highscores
 * 
 * Instantiates an object of Highscores type. 
 * Contains several functions for adding, removing and 
 * returning score information.
 */
var Highscores = function(){
  this.highscores = [];
};

/**
 * add
 * @param score the score to be stored
 * 
 * Takes a score object and pushes it to the highscores 
 * array before sorting in descending order. 
 * 
 */
Highscores.prototype.add = function(score){
  
  // Push the new score, and sort descending order by score
  this.highscores.push(score);
  this.highscores.sort(
    function(a, b){
      return b.score - a.score;    
  });
};

/**
 * getAll
 * 
 * Returns an array of score objects.
 */
Highscores.prototype.getAll = function(){
  return this.highscores;
};

module.exports = {
  Highscores,
  Lobbies
};