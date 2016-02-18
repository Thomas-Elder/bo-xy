
var Events = function(io, lm){
  var lobbyManager = lm;
  var lobbyNamespace = io.of('/lobby');

  lobbyNamespace.on('connection',
    function(socket){
      socket.on('connected',
        function(msg){
          console.log(msg.msg);
      });
      
      // create new lobby using the name passed from client
      socket.on('open',
        function(name){
          var lobby = {};
          lobby.id = socket.id;
          lobby.name = name;
          lobbyManager.add(lobby);
          
          // create new room and assign this socket to it.
          socket.join(lobby.id);
          
          // let the lobbyNamespace know about the new lobby
          lobbyNamespace.emit('newLobby', lobby);
      });
      
      // Add this socket to a room
      socket.on('join',
        function(lobby){
          
          console.log('A new player has joined lobby: ', lobby.id);
          
          // join room
          socket.join(lobby.id);
          
          // let the room know you've joined
          lobbyNamespace.to(lobby.id).emit('newPlayer', 'A player has joined!');
      });
      
      // Remove this socket from the room
      socket.on('bail',
        function(lobby){
          
          // leave room
          socket.leave(lobby.id);
          
          /// let the lobbyNamespace know about the lobby bailage
          lobbyNamespace.emit('bailLobby', lobby);
      });
  });
};

module.exports = Events;