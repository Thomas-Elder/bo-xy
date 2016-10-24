var Server = require('../../server/server');

var request = require('request');
var io_client = require('socket.io-client');

describe('Lobby events', 
  function(){

    var server;

    var url = 'http://localhost:8888/mingle';
    var socketOptions = {
          'reconnection delay' : 0, 
          'reopen delay' : 0, 
          'force new connection' : true
        };
    var client_emit;
    var client_rcv;

    server = new Server();
    console.log('Starting the server...');
    server.start();

    beforeEach(
      function(done){

        // Connect a client socket to the server
        client_emit = io_client(url, socketOptions);

        // Log connection
        client_emit.on('connect',
          function(){
            console.log('socket_emit connected.');
            done();
        });

        // Log connection error
        client_emit.on('connect_error',
          function(){
            console.log('socket_emit not connected, there was an error.');
            done();
        });

        // Connect a separate client socket to the server
        client_rcv = io_client(url, socketOptions);

        // Log connection
        client_rcv.on('connect',
          function(){
            console.log('client_rcv connected.');
            done();
        });

        // Log connection error
        client_rcv.on('connect_error',
          function(){
            console.log('client_rcv not connected, there was an error.');
            done();
        });
    });
    
    afterEach(
      function(done){
        // Disconnect both sockets
        console.log('client_emit disconnecting... ');
        client_emit.disconnect(true);

        console.log('client_rcv disconnecting... ');
        client_rcv.disconnect(true);
 
        done();
    });

    describe('connection',
      function(){
        
        it('should emit "connect" event to this client on connection', 
          function(done){

            client_emit.on('connect', function(msg){
              console.log('connect rcvd:', msg);
              expect(true).toEqual(true);
              done();
            });

            client_emit.disconnect();
            client_emit.connect(url, socketOptions);                
        });

        it('should emit "newPlayer" event to other clients in the namespace', 
          function(done){
            client_rcv.on('newPlayer', function(){
              expect(true).toEqual(true);
              done();
            });

            client_emit.disconnect();
            client_emit.connect(url, socketOptions); 
        });
    });
    
    describe('open', function(){

      it('should emit "newLobby" event to other clients, on "open" event', 
        function(done){

          client_emit.emit('open', {msg:"open message"});

          client_rcv.on('newLobby', 
            function(lobby) {
              expect(true).toEqual(true);
              done(); 
          }); 
      });

      it('should emit "newLobby" event to this client, on "open" event', 
        function(done){

          client_emit.emit('open', {msg:"open message"});

          client_emit.on('newLobby', 
            function(lobby) {
              expect(true).toEqual(true);
              done(); 
          }); 
      });

      it('should pass all lobby details on in the "newLobby" event', function(done){

        var socket_id = "/mingle#" + client_emit.id;
        var expected = {users:[], id:socket_id};

        client_emit.emit('open', expected);

        client_emit.on('newLobby', 
          function(lobby) {

            expect(lobby.id).toEqual(expected.id);
            expect(lobby.users.length).toEqual(1);
            expect(lobby.users).toEqual([socket_id]);
            done(); 
        });
      });
    });

    describe('join', function(){

      it('should emit a "PlayerJoined" event when a join event is handled', function(done){
        
        // First get the socket.id from client_emit, to host the lobby
        var lobby_id = "/mingle#" + client_emit.id;

        // Open a lobby
        client_emit.emit('open', {});

        // Create lobby object 
        var lobby = {users: [lobby_id], id: lobby_id};

        // Get the client_rcv socket.id to join the lobby with
        var join_id = "/mingle#" + client_rcv.id
        
        var expected = {users:[lobby_id, join_id], id:lobby_id};

        client_rcv.emit('join', lobby);

        client_emit.on('PlayerJoined', 
          function(lobby) {

            expect(lobby.id).toEqual(expected.id);
            expect(lobby.users.length).toEqual(2);
            expect(lobby.users).toEqual(expected.users);
            done(); 
        });
      });
    });
});