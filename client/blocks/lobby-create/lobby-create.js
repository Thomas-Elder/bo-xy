window.onload = function(){  
  
  // OPEN
  $('#open').click(function(){
    // display the lobby details
    $('#lobby-create').hide();
    $('#lobby-list').hide();
    $('#new').hide();
    
    $('#lobbies').show();
    $('#lobby').show();
    
    // pass the name back to server for rooming
    lobby.name = $('#name').val();
    
    console.log(lobby.id);
    console.log(lobby.name);
    
    // emit open to the server with details
    socket.emit('open', lobby);
  });
};