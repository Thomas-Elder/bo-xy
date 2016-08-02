var index = require('./indexController');
var game = require('./gameController');
var highscores = require('./highscoresController');
var lobbies = require('./lobbyController');

exports.setLobbyManager = function(lobbyManager){  
  lobbies.setLobbyManager(lobbyManager);
};

exports.setHighscoreManager = function(highscoreManager){  
  highscores.setHighscoreManager(highscoreManager);
};

exports.none = function(req, res){
  res.render('notFound', { title: 'N O T H I N G'});
};

exports.index      = index.index;
exports.single     = game.single;
exports.mingle     = game.mingle;
exports.highscores = highscores.highscores;

exports.lobbies    = lobbies.lobbies;
exports.mingle     = lobbies.mingle;
