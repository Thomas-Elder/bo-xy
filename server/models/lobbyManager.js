
/**
 * LobbyManager
 * 
 * Instantiates an object of type LobbyManager. 
 * Contains several functions for adding, removing and
 * returning information about current lobbies in the 
 * system.
 * 
 */
var LobbyManager = function(){
  this.lobbies = [];
};

/**
 * add
 * @param lobby
 * 
 * Add a lobby object to the array.
 */
LobbyManager.prototype.add = function(lobby){
  this.lobbies.push(lobby);
};

/**
 * remove
 * @param key the lobby to be removed
 */
LobbyManager.prototype.remove = function(key){
  this.lobbies.forEach(function(lobby) {
    if(lobby.id === key) {
      this.lobbies.pop(lobby);
    }    
  });
};

/**
 * get
 * @param key the lobby to be returned
 * @return lobby
 */
LobbyManager.prototype.get = function(key){
  this.lobbies.forEach(function(lobby) {
    if(lobby.id === key) {
      return lobby;
    }    
  });
};

/**
 * getAll
 * @return array of lobbies
 */
LobbyManager.prototype.getAll = function () {
  return this.lobbies;
};

module.exports = LobbyManager;