var Scores = require('../managers/highscoreManager');

var highscoresManager;

exports.setHighscoreManager = function(hm){
  highscoresManager = hm;
};

// game page
exports.highscores = function(req, res){

    res.render('highscores', 
      { 
        title: 'H I G H S C O R E S',
        scores: highscoresManager.getAll()
        });
  };
