window.onload = function(){

  // START
  $('#start').click(function(){
    
    socket.emit('start', lobby);
    window.location.replace("http://localhost:8888/dodge");
  });

  // BAIL
  $('#bail').click(function(){
    // display the lobby list
    $('#lobby').hide();
    $('#lobby-create').hide();
    $('#lobby-list').show();
    
    // emit bail to the server with lobby
    socket.emit('bail', lobby);
  });

  /**
   * Handle the newPlayer event
   */
  socket.on('newPlayer', 
    function(lobby){
      console.log('A new player has joined your lobby!');
  });

  /**
   * Handle the start lobby event
   */
  socket.on('start',
    function(lobby){
      window.location.replace("http://localhost:8888/dodge");
  });
};