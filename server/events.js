
var Events = function(io){
  
  var lobbyNamespace = io.of('/lobby');

  lobbyNamespace.on('connection',
    function(socket){
      socket.on('connected',
        function(msg){
          console.log(msg.msg);
      });
      
      socket.on('',
        function(){
        
      });
  });
};

module.exports = Events;