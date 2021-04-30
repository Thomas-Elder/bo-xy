
var Server = require('../../server/server');
var io_client = require('socket.io-client');


describe('Lobby events',
  function () {

    // Declared here to be accessible in all functions. 
    var server;
    var url = 'http://localhost:8888/mingle';
    var socketOptions = {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true
    };
    
    var client_emit;
    var client_rcv;

    // Spin up server before all tests
    beforeAll(function () {

      server = new Server();
      server.start();
    });

    // Close server after all tests
    afterAll(function () {
      server.stop();
    });

    beforeEach(function (done) {

      // Connect a client socket to the server
      client_emit = io_client(url, socketOptions);

      // Connect a separate client socket to the server
      client_rcv = io_client(url, socketOptions);

      // Check connection
      client_emit.on('ack', function () {
        client_rcv.on('ack', function () {

          done();
        });
      });
    });

    afterEach(function (done) {
      // Disconnect both sockets
      client_emit.disconnect(0);
      client_rcv.disconnect(0);
      done();
    });

    describe('connection', function () {

      it('should emit "ack" event to this client on connection', function (done) {

        client_emit.on('ack', function (msg) {
          expect(true).toEqual(true);
          done();
        });
  
        client_emit.on('disconnect', function () {
          client_emit.connect(url, socketOptions);
        });

        client_emit.disconnect();
      });

      it('should emit "newPlayer" event to other clients in the namespace', function (done) {
        client_rcv.on('newPlayer', function () {
          expect(true).toEqual(true);
          done();
        });

        client_emit.on('disconnect', function () {
          client_emit.connect(url, socketOptions);
        });

        client_emit.disconnect();
      });
    });

    describe('open', function () {

      it('should emit "newLobby" event to other clients, on "open" event', function (done) {

        client_rcv.on('newLobby', function (lobby) {
          expect(true).toEqual(true);
          done();
        });

        client_emit.emit('open', { msg: "open message" });
      });

      it('should pass all lobby details on in the "newLobby" event', function (done) {

        client_emit.on('newLobby', function (lobby) {
          expect(lobby).toEqual(expected);
          done();
        });

        var socket_id = client_emit.id;
        var expected = { users: [socket_id], id: socket_id };

        client_emit.emit('open');
      });
    });

    describe('join', function () {

      it('should emit a "PlayerJoined" event when a join event is handled', function (done) {

        client_emit.on('PlayerJoined', function (lobby) {
          expect(true).toEqual(true);
          done();
        });

        // First get the socket.id from client_emit, to host the lobby
        var lobby_id = client_emit.id;

        // Open a lobby
        client_emit.emit('open', {});

        // Create lobby object 
        var lobby = { users: [lobby_id], id: lobby_id };

        // Wait till rcv gets a newLobby event, confirming the lobby has been
        // created before attempting to join.
        client_rcv.on('newLobby', function () {
          client_rcv.emit('join', lobby);
        });
      });

      it('should pass the lobby details to the original client', function (done) {

        client_emit.on('PlayerJoined', function (lobby) {
          expect(lobby.users[0]).toEqual(expected.users[0]);
          expect(lobby.id).toEqual(expected.id);
          done();
        });

        // First get the socket.id from client_emit, to host the lobby
        var lobby_id = client_emit.id;

        // Open a lobby
        client_emit.emit('open', {});

        // Create lobby object 
        var lobby = { users: [lobby_id], id: lobby_id };

        var expected = { users: [lobby_id, client_rcv.id], id: lobby_id };

        // Wait till rcv gets a newLobby event, confirming the lobby has been
        // created before attempting to join.
        client_rcv.on('newLobby', function () {
          client_rcv.emit('join', lobby);
        });
      });

      it('should pass the lobby details to the new client', function (done) {

        client_rcv.on('PlayerJoined', function (lobby) {
          expect(lobby.users[0]).toEqual(expected.users[0]);
          expect(lobby.id).toEqual(expected.id);
          done();
        });

        // First get the socket.id from client_emit, to host the lobby
        var lobby_id = client_emit.id;

        // Open a lobby
        client_emit.emit('open', {});

        // Create lobby object 
        var lobby = { users: [lobby_id], id: lobby_id };

        var expected = { users: [lobby_id, client_rcv.id], id: lobby_id };

        // Wait till rcv gets a newLobby event, confirming the lobby has been
        // created before attempting to join.
        client_rcv.on('newLobby', function () {
          client_rcv.emit('join', lobby);
        });
      });
    });

    describe('bail', function () {
      it('should emit a "bailLobby" event to this client when the bail event is handled', function () {

        client_emit.on('bailLobby', function () {
          expect(true).toEqual(true);
          done();
        });

        // First get the socket.id from client_emit, to host the lobby
        var lobby_id = client_emit.id;

        // Open a lobby
        client_emit.emit('open', {});

        // Create lobby object 
        var lobby = { users: [lobby_id], id: lobby_id };

        client_emit.on('newLobby', function () {
          client_emit.emit('bail', lobby);
        });
      });

      it('should emit a "bailLobby" event to other clients when the bail event is handled', function () {

        client_rcv.on('bailLobby', function () {
          expect(true).toEqual(true);
          done();
        });

        // First get the socket.id from client_emit, to host the lobby
        var lobby_id = client_emit.id;

        // Open a lobby
        client_emit.emit('open', {});

        // Create lobby object 
        var lobby = { users: [lobby_id], id: lobby_id };

        client_rcv.on('newLobby', function () {
          client_rcv.emit('join', lobby);

          client_emit.on('playerJoined', function () {
            client_emit.emit('bail', lobby);
          });
        });
      });
    });

    describe('start', function () {

      it('should emit a "start" event to this client when the start event is handled', function () {

        client_emit.on('start', function () {
          expect(true).toEqual(true);
          done();
        });

        // First get the socket.id from client_emit, to host the lobby
        var lobby_id = client_emit.id;

        // Open a lobby
        client_emit.emit('open', {});

        // Create lobby object 
        var lobby = { users: [lobby_id], id: lobby_id };

        client_emit.on('newLobby', function () {
          client_emit.emit('start', lobby);
        });
      });

      it('should emit a "start" event to other clients when the start event is handled', function () {

        // Set up listener for event
        client_rcv.on('start', function () {
          expect(true).toEqual(true);
          done();
        });

        // Get the socket.id from client_emit, to host the lobby
        var lobby_id = client_emit.id;

        // Open a lobby
        client_emit.emit('open', {});

        // Create lobby object 
        var lobby = { users: [lobby_id], id: lobby_id };

        client_rcv.on('newLobby', function () {
          client_rcv.emit('join', lobby);

          client_emit.on('playerJoined', function () {
            client_emit.emit('start', lobby);
          });
        });
      });
    });
  });