
var EventManager = function(){};

EventManager.prototype.lobbyEvents = function(io, lm){
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
        function(lobby){
          
          lobby.users = [];
          lobby.id = socket.id;
          lobby.users.push(socket.id);
          lobbyManager.add(lobby);
          
          // create new room and assign this socket to it.
          socket.join(lobby.id);
          
          console.log(lobby);
          // let the lobbyNamespace know about the new lobby
          lobbyNamespace.emit('newLobby', lobby);
      });
      
      // Add this socket to a room
      socket.on('join',
        function(lobby){
          
          console.log('A new player has joined lobby: ', lobby.id);
          
          // join room
          socket.join(lobby.id);
          lobbyManager.get(lobby.id).users.push(socket.id);
          console.log(lobbyManager.get(lobby.id));
                
          // let the room know you've joined
          lobbyNamespace.to(lobby.id).emit('newPlayer', 'A player has joined!');
      });
      
      // Remove this socket from the room
      socket.on('bail',
        function(lobby){
          
          // leave room
          socket.leave(lobby.id);
          lobbyManager.get(lobby.id).users.pop(socket.id);
          console.log(lobbyManager.get(lobby.id));
          
          /// let the lobbyNamespace know about the lobby bailage
          lobbyNamespace.emit('bailLobby', lobby);
      });
      
      socket.on('start',
        function(lobby){
          lobbyNamespace.to(lobby.id).emit('start', 'Starting the game... ');
      });
  });
};

module.exports = EventManager;