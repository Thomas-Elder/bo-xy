
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
  this.highscores.push(score);
  this.highscores.sort(
    function(a, b){
      return b.score - a.score;    
  });
};

/**
 * remove
 * @param key
 */
Highscores.prototype.remove = function(key){
  
};

/**
 * get
 * @param key
 */
Highscores.prototype.get = function(key){
  
};

/**
 * getAll
 * 
 * Returns an array of score objects.
 */
Highscores.prototype.getAll = function(){
  return this.highscores;
};

module.exports = Highscores;