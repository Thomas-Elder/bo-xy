var Server = require('../../server/server');

var http = require('http');
var express = require('express');
var request = require('request');
var io_client = require('socket.io-client');

describe('Event Manager', 
  function(){
    
    var app = express();
    var httpServer = http.createServer(app);

    var server;
    
    var port = 8888;
    var url = 'http://localhost:' + port;

    beforeEach(
      function(done){
        
        server = new Server(httpServer, express, app);
        console.log('Starting the server...');
        server.start();
        done();

        // Connect a client socket to the server
        socket_emit = io_client.connect(url,
        {
          'reconnection delay':0,
          'reopen delay':0,
            'force new connection':true
        }); 

        // Log connection
        socket_emit.on('connect',
          function(){
            console.log('socket_emit connected.');
        });

        // Connect a separate client socket to the server
        socket_rcv = io_client.connect(url,
          {
            'reconnection delay':0,
            'reopen delay':0,
            'force new connection':true
        });

        // Log connection
        socket_rcv.on('connect',
          function(){
            console.log('socket_emit connected.');
        });
    });
    
    afterEach(
      function(done){
        // Disconnect both sockets
        console.log('socket_emit disconnecting... ');
        socket_emit.disconnect(true);

        console.log('socket_rcv disconnecting... ');
        socket_rcv.disconnect(true);

        server.stop();
        done();
    });
      
    describe('Lobby Events', 
      function(){
        
        it('Should whatever', 
          function(done){
              expect(true).toEqual(true);
              done();
          });
      });  
});