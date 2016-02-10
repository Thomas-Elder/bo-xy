var socket_io = require('socket.io');

var Events = function(){};

Events.prototype.setEventHandlers = function(server){

  var io = socket_io(server);
  var players = [];
  
  // set up event listeners/emitters
  io.on('connection',
    function(socket){
      console.log('user connected...');
      players.push(socket);
      
      // Run through all current players, and bro
      players.forEach(
        function(s){
          if(s.id != socket.id)
            s.broadcast.emit('new connection', s.id);
      });
      
      socket.broadcast.emit('new connection', socket.id);
      
      socket.on('keyDown', 
        function(data){
          socket.broadcast.emit('keyDown', socket.id, data);
      });
      
      socket.on('keyUp', 
        function(data){
          socket.broadcast.emit('keyUp', socket.id, data);
      });
      
      socket.on('disconnect',
        function(){
          socket.broadcast.emit('disconnected');    
          players.splice(players.indexOf(socket), 1);
      });
  });
}

module.exports = Events;