
var EventManager = function(){};

EventManager.prototype.lobbyEvents = function(io, lm){
  var lobbyManager = lm;
  var mingleNamespace = io.of('/mingle');

  mingleNamespace.on('connection',
    function(socket){
      
      socket.emit('connect', {msg:'you are connected'});
      socket.broadcast.emit('new-player', {msg:'new player x has joined'});
      
      socket.on('open', function(lobby){

        lobbyManager.add(lobby);
        socket.join(lobby.id);
        mingleNamespace.emit('new-lobby', lobby);
      });
      
      socket.on('join', function(lobby, user){

        if(lobbyManager.get(lobby.id).users.find(function(element){
          return element.id === user.id;
        }) === undefined)
          lobbyManager.get(lobby.id).users.push(user);

        socket.broadcast.to(lobby.id).emit('player-joined', lobbyManager.get(lobby.id)); 
        socket.join(lobby.id);
      });
      
      socket.on('bail', function(lobby){
          
        lobbyManager.get(lobby.id).users.pop(socket.id);
        mingleNamespace.emit('bail-lobby', lobby);
        socket.leave(lobby.id); 
      });
      
      socket.on('start', function(lobby){

        socket.broadcast.to(lobby.id).emit('start', 'Starting the game... ');
      });

      socket.on('msg', function(lobby, msg){

        socket.broadcast.to(lobby.id).emit('msg', msg);
      });

      socket.on('disconnect', function(){

      });

      socket.on('error', function(error){

        console.log(error);
      });
  });
};

EventManager.prototype.singleEvents = function(io, hm){

  var highscoreManager = hm;
  var singleNamespace = io.of('/single');

  singleNamespace.on('connection', function(socket){

    socket.emit('connect');
    
    // create new lobby using the name passed from client
    socket.on('score', function(gameDetails){

      console.log('Adding game score to highscores... ');
      highscoreManager.add({name:gameDetails.playerName, score:gameDetails.score});
    });

    socket.on('error', function(error){

      console.log(error);
    });
  });
};

module.exports = EventManager;