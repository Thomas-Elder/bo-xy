
var EventManager = function(){};

EventManager.prototype.lobbyEvents = function(io, lm){
  var lobbyManager = lm;
  var mingleNamespace = io.of('/mingle');

  mingleNamespace.on('connection',
    function(socket){
      
      socket.emit('connect', {msg:'you are connected'});
      socket.broadcast.emit('newPlayer', {msg:'new player x has joined'});
      
      // create new lobby using the name passed from client
      socket.on('open',
        function(){

          var lobby = {};
          lobby.users = [];
          lobby.id = socket.id;
          lobby.users.push(socket.id);
          lobbyManager.add(lobby);

          // create new room and assign this socket to it.
          socket.join(lobby.id);

          // let the mingleNamespace know about the new lobby
          mingleNamespace.emit('newLobby', lobby);
      });
      
      // Add this socket to a room
      socket.on('join',
        function(lobby){

          // join room
          socket.join(lobby.id);

          // push the socket.id into the lobby.users object
          lobbyManager.get(lobby.id).users.push(socket.id);
                
          // let the room know you've joined
          socket.broadcast.to(lobby.id).emit('PlayerJoined', lobbyManager.get(lobby.id));
      });
      
      // Remove this socket from the room
      socket.on('bail',
        function(lobby){
          
          lobbyManager.get(lobby.id).users.pop(socket.id);
                    
          /// let the lobby know about the bailage
          mingleNamespace.emit('bailLobby', lobby);

          // leave room
          socket.leave(lobby.id); 
      });
      
      socket.on('start',
        function(lobby){
          socket.broadcast.to(lobby.id).emit('start', 'Starting the game... ');
      });

      socket.on('msg',
        function(lobby, msg){
          socket.broadcast.to(lobby.id).emit('msg', msg);
      });

      socket.on('disconnect', function(){

      });
  });
};

EventManager.prototype.singleEvents = function(io, hm){

  var highscoreManager = hm;
  var singleNamespace = io.of('/single');

  singleNamespace.on('connection',
    function(socket){

      socket.emit('connect');
      
      // create new lobby using the name passed from client
      socket.on('score',
        function(gameDetails){
          console.log('Adding game score to highscores... ');
          highscoreManager.add({name:gameDetails.playerName, score:gameDetails.score});
      });
    });
};

module.exports = EventManager;