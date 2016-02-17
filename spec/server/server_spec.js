var Server = require('../../server/server');

var http = require('http');
var express = require('express');
var app = express();
var httpServer = http.createServer(app);
var request = require('request');

describe('Server', 
  function(){
    
    var server;
    
    var port = 8888;
    var url = 'http://localhost:' + port;

    beforeEach(
      function(done){
        
        server = new Server(httpServer, express, app);
        console.log('Starting the server...');
        server.start();
        done();
    });
    
    afterEach(
      function(done){
        server.stop();
        done();
    });
    
    describe('connection tests', 
      function(){
        
        it('should return OK statusCode to a request for "/"', 
          function(done){
            
            request.get(
              {
                'url':url
              },
              function(err, res){

                if(res === undefined)
                  throw new Error('Server not responding.');
                
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    });
    
    it('',
      function(done){
        done();
    });
    
    it('',
      function(done){
        done();
    });
    
    it('',
      function(done){
        done();
    });    
});