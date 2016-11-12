var async = require('async');

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

    beforeEach(function(done){

      // Connect a client socket to the server
      client_emit = io_client(url, socketOptions);

      // Connect a separate client socket to the server
      client_rcv = io_client(url, socketOptions);

      // Log connection
      client_emit.on('connect', function(){
        //console.log('socket_emit connected.');
      });

      client_rcv.on('connect', function(){
        //console.log('client_rcv connected.');
        done();
      });
    });
    
    afterEach(function(done){
        
      // Disconnect both sockets
      client_emit.disconnect(0);
      client_rcv.disconnect(0);

      done();
    });

    describe('connection', function(){
      console.log('');
      console.log('testing connection... ');
        
      it('should emit "connect" event to this client on connection', function(done){

        client_emit.on('connect', function(msg){
          expect(true).toEqual(true);
          done();
        });

        client_emit.disconnect();
        client_emit.connect(url, socketOptions);               
      });

      it('should emit "new-player" event to other clients in the namespace', function(done){
        client_rcv.on('new-player', function(){
          expect(true).toEqual(true);
          done();
        });

        client_emit.disconnect();
        client_emit.connect(url, socketOptions); 
      });
    });
    
    describe('open', function(){
      console.log('');
      console.log('testing open... ');

      it('should emit "new-lobby" event to other clients, on "open" event', function(done){

        var socket_id = "/mingle#" + client_emit.id;
        var lobby = {};

        lobby.id = socket_id;

        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobby) {
          expect(true).toEqual(true);
          done(); 
        }); 
      });

      it('should pass all lobby details on in the "new-lobby" event', function(done){

        var socket_id = "/mingle#" + client_emit.id;
        var expected = {users:[socket_id], id:socket_id};
        var lobby = {};

        lobby.id = socket_id;

        client_emit.emit('open', lobby);

        client_emit.on('new-lobby', function(lobby) {
          expect(lobby).toEqual(expected);
          done(); 
        });
      });
    });

    describe('join', function(){
      console.log('');
      console.log('testing join... ');

      it('should emit a "player-joined" event when a join event is handled', function(done){
        
        // First get the socket.id from client_emit, to host the lobby
        var socket_id = "/mingle#" + client_emit.id;
        var lobby = {};

        lobby.id = socket_id;

        // Open a lobby
        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobby){
          client_rcv.emit('join', lobby);
        });
        
        client_emit.on('player-joined', function(lobby) {
          expect(true).toEqual(true);
          done(); 
        });
      });

      it('should pass the lobby details to the original client', function(done){

        var socket_id = "/mingle#" + client_emit.id;
        var join_id = "/mingle#" + client_rcv.id
        
        var expected = {users:[socket_id, join_id], id:socket_id};
        var lobby = {};

        lobby.id = socket_id;

        client_emit.emit('open', lobby);
        
        client_rcv.on('new-lobby', function(lobby){

          client_rcv.emit('join', lobby);
        });

        client_emit.on('player-joined', function(lobby) {

          expect(lobby).toEqual(expected);
          done(); 
        });
      });
    });

    describe('bail', function(){
      console.log('');
      console.log('testing bail... ');

      it('should emit a "bail-lobby" event to other clients when the bail event is handled', function(done){
        
        // First get the socket.id from client_emit, to host the lobby
        var socket_id = "/mingle#" + client_emit.id;
        var lobby = {};

        lobby.id = socket_id;

        // Open a lobby
        client_emit.emit('open', lobby);

        // Create lobby object 
        var lobby = {users: [socket_id], id: socket_id};

        client_rcv.emit('join', lobby);
        client_emit.emit('bail', lobby);

        client_rcv.on('bail-lobby', function(){
          expect(true).toEqual(true);
          done(); 
        });
      });

      it('should emit a "bail-lobby" event to other clients when the bail event is handled', function(done){
        
        // First get the socket.id from client_emit, to host the lobby
        var socket_id = "/mingle#" + client_emit.id;
        var lobby = {};

        lobby.id = socket_id;

        // Open a lobby
        client_emit.emit('open', lobby);

        // Create lobby object 
        var lobby = {users: [socket_id], id: socket_id};

        client_rcv.emit('join', lobby);
        client_rcv.emit('bail', lobby);

        client_emit.on('bail-lobby', function(lobby){
          expect(true).toEqual(true);
          done(); 
        });
      });
    });

    describe('start', function(){
      console.log('');
      console.log('testing start... ');

      it('should emit a "start" event to other clients when the start event is handled', function(done){
        
        // First get the socket.id from client_emit, to host the lobby
        var socket_id = "/mingle#" + client_emit.id;
        var lobby = {};

        lobby.id = socket_id;

        // Open a lobby
        client_emit.emit('open', lobby);

        // Create lobby object 
        var lobby = {users: [socket_id], id: socket_id};

        // Get the client_rcv socket.id to join the lobby with
        var join_id = "/mingle#" + client_rcv.id

        // join the lobby
        client_rcv.emit('join', lobby);
        client_rcv.emit('start', lobby);

        client_emit.on('start', function(text){
          expect(true).toEqual(true);
          done(); 
        });
      });
    });

    describe('chat', function(){
      console.log('');
      console.log('testing chat... ');


      it('should emit a "msg" event to other clients when a msg event is handled', function(done){
        
        // First get the socket.id from client_emit, to host the lobby
        var socket_id = "/mingle#" + client_emit.id;
        var lobby = {};

        lobby.id = socket_id;

        // Open a lobby
        client_emit.emit('open', lobby);

        // Create lobby object 
        var lobby = {users: [socket_id], id: socket_id};

        // Get the client_rcv socket.id to join the lobby with
        var join_id = "/mingle#" + client_rcv.id

        // join the lobby
        client_rcv.emit('join', lobby);
        client_rcv.emit('msg', lobby, {user:'',text:'Sup!'});

        client_emit.on('msg', function(msg){
          expect(true).toEqual(true);
          expect(msg.text).toEqual('Sup!');     
          done(); 
        });
      });

      it('should emit a "msg" event to other clients when a msg event is handled', function(done){
        
        // First get the socket.id from client_emit, to host the lobby
        var socket_id = "/mingle#" + client_emit.id;
        var lobby = {};

        lobby.id = socket_id;

        // Open a lobby
        client_emit.emit('open', lobby);

        // Create lobby object 
        var lobby = {users: [socket_id], id: socket_id};

        // Get the client_rcv socket.id to join the lobby with
        var join_id = "/mingle#" + client_rcv.id

        // Wait til we recieve the new-lobby event
        client_rcv.on('new-lobby', function(){

          // Join the lobby
          client_rcv.emit('join', lobby);

          // Wait till we recieve the player-joined event
          client_emit.on('player-joined', function(){
            
            // Send the message
            client_emit.emit('msg', lobby, {user:'',text:'Sup!'});
            client_rcv.on('msg', function(msg){
              expect(true).toEqual(true);
              expect(msg.text).toEqual('Sup!');     
              done(); 
            });
          });
        });    
      });
    });
});