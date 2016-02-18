var lobbyManager;

exports.setLobbyManager = function(lm){
  lobbyManager = lm;
};

// game page
exports.lobbies = function(req, res){
 
    res.render('lobbies', 
      { 
        title: 'L O B B I E S',
        lobbies: lobbyManager.getAll()
        });
  };
