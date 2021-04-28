var Server = require('../../server/server');

var request = require('request');

describe('Server', 
  function(){
    
    var server;
    
    var port = 8888;
    var url = 'http://localhost:' + port;

    beforeEach(
      function(done){
        
        server = new Server();
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
              'url':url + "/"
            },
            function(err, res){

              if(res === undefined)
                throw new Error('Server not responding.');
              
              expect(res.statusCode).toBe(200);
              done();
          });
      });
      
      it('should return OK statusCode to a request for "/blog"',
        function(done){
          request.get(
            {
              'url':url + "/blog"
            },
            function(err, res){

              if(res === undefined)
                throw new Error('Server not responding.');
              
              expect(res.statusCode).toBe(200);
              done();
          });
      });

      it('should return OK statusCode to a request for "/single"',
        function(done){
          request.get(
            {
              'url':url + "/single"
            },
            function(err, res){

              if(res === undefined)
                throw new Error('Server not responding.');
              
              expect(res.statusCode).toBe(200);
              done();
          });
      });
    
      it('should return OK statusCode to a request for "/mingle"',
        function(done){
          request.get(
            {
              'url':url + "/mingle"
            },
            function(err, res){

              if(res === undefined)
                throw new Error('Server not responding.');
              
              expect(res.statusCode).toBe(200);
              done();
          });
      });
    
      it('should return OK statusCode to a request for "/highscores"',
        function(done){
          request.get(
            {
              'url':url + "/highscores"
            },
            function(err, res){

              if(res === undefined)
                throw new Error('Server not responding.');
              
              expect(res.statusCode).toBe(200);
              done();
          });
      });

      it('should return OK statusCode to a request for "/gibberish"',
        function(done){
          request.get(
            {
              'url':url + "/gibberish"
            },
            function(err, res){

              if(res === undefined)
                throw new Error('Server not responding.');
              
              expect(res.statusCode).toBe(200);
              done();
          });
      });   
    });  
});