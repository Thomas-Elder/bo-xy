window.onload = function(){
  
  // NEW  
  $('#new').click(function(){
    // display the create lobby bit
    $('#lobby-list').hide();
    $('#lobby').hide();
    $('#new').hide();
      
    $('#lobbies').show();
    $('#lobby-create').show();
  });

  // LOBBIES
  $('#lobbies').click(function(){
    // display the lobby list
    $('#lobby').hide();
    $('#lobby-create').hide();
    $('#lobbies').hide();
    
    $('#new').show();
    $('#lobby-list').show();
  });
};