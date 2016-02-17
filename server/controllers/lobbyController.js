var LobbyManager = require('../models/lobbyManager');

// game page
exports.lobbies = function(req, res){
  
    var lobbyManager = new LobbyManager();
    lobbyManager.add({name:'Tom', score:'444'});
    lobbyManager.add({name:'Tom', score:'111'});
    lobbyManager.add({name:'Tom', score:'222'});
    lobbyManager.add({name:'Tom', score:'333'});
  
    res.render('lobbies', 
      { 
        title: 'L O B B I E S',
        lobbies: lobbyManager.getAll()
        });
  };
