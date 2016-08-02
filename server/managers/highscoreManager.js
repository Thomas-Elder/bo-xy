
/**
 * Highscores
 * 
 * Instantiates an object of Highscores type. 
 * Contains several functions for adding, removing and 
 * returning score information.
 */
var HighscoreManager = function(){
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
HighscoreManager.prototype.add = function(score){
  
  // Push the new score, and sort descending order by score
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
HighscoreManager.prototype.remove = function(key){
  
};

/**
 * get
 * @param key
 */
HighscoreManager.prototype.get = function(key){
  
};

/**
 * getAll
 * 
 * Returns an array of score objects.
 */
HighscoreManager.prototype.getAll = function(){
  return this.highscores;
};

module.exports = HighscoreManager;