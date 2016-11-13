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

      it('should emit "new-lobby" event to other clients, on "open" event', function(done){

        var socket_id = "/mingle#" + client_emit.id;
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = '';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobby) {
          expect(true).toEqual(true);
          done(); 
        }); 
      });

      it('should pass all lobby details on in the "new-lobby" event', function(done){

        var socket_id = "/mingle#" + client_emit.id;
        var expected = {
          id:socket_id, 
          name:'test',
          users:[{
            name:'Tom', 
            id:socket_id
          }]
        };
        
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = 'Tom';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        client_emit.emit('open', lobby);

        client_emit.on('new-lobby', function(lobby) {
          expect(lobby.name).toEqual(expected.name);
          expect(lobby.id).toEqual(expected.id);
          expect(lobby.users).toEqual(expected.users);
          done(); 
        });
      });
    });

    describe('join', function(){

      it('should emit a "player-joined" event when a join event is handled', function(done){
        
        // First get the socket.id from client_emit, to host the lobby
        var socket_id = "/mingle#" + client_emit.id;
        var join_id = "/mingle#" + client_rcv.id;
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = '';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        // Open a lobby
        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobby){
          client_rcv.emit('join', lobby, { id:join_id, name:'Tim' });
        });
        
        client_emit.on('player-joined', function(lobby) {
          expect(true).toEqual(true);
          done(); 
        });
      });

      it('should pass the lobby details to the original client', function(done){

        var socket_id = "/mingle#" + client_emit.id;
        var join_id = "/mingle#" + client_rcv.id;
        
        var expected = {
          id:socket_id, 
          name:'test',
          users:[{
            name:'Tom', 
            id:socket_id
          },
          {
            name:'Tim',
            id:join_id
          }]
        };
        
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = 'Tom';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        lobby.id = socket_id;

        client_emit.emit('open', lobby);
        client_rcv.on('new-lobby', function(lobby){
          client_rcv.emit('join', lobby, {id:join_id, name:'Tim'});
        });

        client_emit.on('player-joined', function(lobby) {
          expect(lobby.name).toEqual(expected.name);
          expect(lobby.id).toEqual(expected.id);
          expect(lobby.users).toEqual(expected.users);
          done(); 
        });
      });
    });

    describe('bail', function(){

      it('should emit a "bail-lobby" event to other clients when the bail event is handled', function(done){
        
        var socket_id = "/mingle#" + client_emit.id;
        var join_id = "/mingle#" + client_rcv.id;
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = '';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobby){
          client_rcv.emit('join', lobby, { id:join_id, name:'Tim' });
        });

        client_emit.on('player-joined', function(){
          client_emit.emit('bail', lobby);
        });
        
        client_rcv.on('bail-lobby', function(){
          expect(true).toEqual(true);
          done(); 
        });
      });

      it('should emit a "bail-lobby" event to other clients when the bail event is handled', function(done){
        
        var socket_id = "/mingle#" + client_emit.id;
        var join_id = "/mingle#" + client_rcv.id;
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = '';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobby){
          client_rcv.emit('join', lobby, { id:join_id, name:'Tim' });         
        });
        
        client_emit.on('player-joined', function(lobby){
          client_rcv.emit('bail', lobby);
        });

        client_emit.on('bail-lobby', function(lobby){
          expect(true).toEqual(true);
          done(); 
        });
      });
    });

    describe('start', function(){

      it('should emit a "start" event to other clients when client_rcv starts', function(done){
        
        var socket_id = "/mingle#" + client_emit.id;
        var join_id = "/mingle#" + client_rcv.id;
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = '';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobby){
          client_rcv.emit('join', lobby, { id:join_id, name:'Tim' });
        });
        
        client_emit.on('player-joined', function(lobby){
          client_rcv.emit('start', lobby);
        });        

        client_emit.on('start', function(text){
          expect(true).toEqual(true);
          done(); 
        });
      });

      it('should emit a "start" event to other clients when client_emit starts', function(done){
        
        var socket_id = "/mingle#" + client_emit.id;
        var join_id = "/mingle#" + client_rcv.id;
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = '';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobby){
          client_rcv.emit('join', lobby, { id:join_id, name:'Tim' });
        });
        
        client_emit.on('player-joined', function(lobby){
          client_emit.emit('start', lobby);
        });        

        client_rcv.on('start', function(text){
          expect(true).toEqual(true);
          done(); 
        });
      });
    });

    describe('chat', function(){

      it('should emit a "msg" event to other clients when a msg event is handled', function(done){

        var socket_id = "/mingle#" + client_emit.id;
        var join_id = "/mingle#" + client_rcv.id;
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = '';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobbg){
          client_rcv.emit('join', lobby, { id:join_id, name:'Tim' });
          client_rcv.emit('msg', lobby, {user:'',text:'Sup!'});
        });
        
        client_emit.on('msg', function(msg){
          expect(true).toEqual(true);
          expect(msg.text).toEqual('Sup!');     
          done(); 
        });
      });

      it('should emit a "msg" event to other clients when a msg event is handled', function(done){
        
        // First get the socket.id from client_emit, to host the lobby
        var socket_id = "/mingle#" + client_emit.id;
        var join_id = "/mingle#" + client_rcv.id;
        var lobby = {};
        var user = {};

        user.id = socket_id;
        user.name = '';

        lobby.id = socket_id;
        lobby.name = 'test';
        lobby.users = [];
        lobby.users.push(user);

        client_emit.emit('open', lobby);

        client_rcv.on('new-lobby', function(lobby){
          client_rcv.emit('join', lobby, { id:join_id, name:'Tim' });
        });

        client_emit.on('player-joined', function(){     
          client_emit.emit('msg', lobby, {user:'',text:'Sup!'});
        });

        client_rcv.on('msg', function(msg){
          expect(true).toEqual(true);
          expect(msg.text).toEqual('Sup!');     
          done(); 
        });            
      });
    });
});