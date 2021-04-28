
var EventManager = function () { };

EventManager.prototype.lobbyEvents = function (io, lm) {
  var lobbyManager = lm;
  var mingleNamespace = io.of('/mingle');

  mingleNamespace.on('connection',
    function (socket) {

      socket.emit('ack', { msg: 'you are connected' });
      mingleNamespace.emit('newPlayer', { msg: 'new player x has joined' });

      // create new lobby using the name passed from client
      socket.on('open',
        function () {

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
        function (lobby) {

          // join room
          socket.join(lobby.id);

          // push the socket.id into the lobby.users object
          lobbyManager.get(lobby.id).users.push(socket.id);

          //console.log('Logging ', lobby, 'after lobbyManager.get(lobby.id).users.push(socket.id);');

          // let the room know you've joined
          mingleNamespace.to(lobby.id).emit('PlayerJoined', lobbyManager.get(lobby.id));
        });

      // Remove this socket from the room
      socket.on('bail',
        function (lobby) {

          // leave room
          socket.leave(lobby.id);
          lobbyManager.get(lobby.id).users.pop(socket.id);

          /// let the mingleNamespace know about the lobby bailage
          mingleNamespace.emit('bailLobby', lobby);
        });

      socket.on('start',
        function (lobby) {
          mingleNamespace.to(lobby.id).emit('start', 'Starting the game... ');
        });

      socket.on('disconnect', function () {

      });
    });
};

EventManager.prototype.singleEvents = function (io, hm) {

  var highscoreManager = hm;
  var singleNamespace = io.of('/single');

  singleNamespace.on('connection',
    function (socket) {

      socket.emit('ack');

      // create new lobby using the name passed from client
      socket.on('score',
        function (gameDetails) {
          console.log('Adding game score to highscores... ');
          highscoreManager.add({ name: gameDetails.playerName, score: gameDetails.score });
        });
    });
};

module.exports = EventManager;