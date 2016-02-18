var index = require('./indexController');
var dodge = require('./dodgeController');
var highscores = require('./highscoresController');

var lobbies = require('./lobbyController');

exports.setLobbyManager = function(lobbyManager){  
  lobbies.setLobbyManager(lobbyManager);
};

exports.none = function(req, res){
  res.render('notFound', { title: 'N O T H I N G'});
};

exports.index = index.index;
exports.dodge = dodge.dodge;
exports.highscores = highscores.highscores;

exports.lobbies = lobbies.lobbies;
