var Scores = require('../models/highscoreManager');

// game page
exports.highscores = function(req, res){
  
    var scores = new Scores();
    scores.add({name:'Tom', score:'444'});
    scores.add({name:'Tom', score:'111'});
    scores.add({name:'Tom', score:'222'});
    scores.add({name:'Tom', score:'333'});
  
    res.render('highscores', 
      { 
        title: 'H I G H S C O R E S',
        scores: scores.getAll()
        });
  };
