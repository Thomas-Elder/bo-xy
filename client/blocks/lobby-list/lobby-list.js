window.onload = function(){  
  
  /**
   * Handle join clicking
   */
  $('#lobby-list').on('click',
    'button',
    function() {
      
      // hide the list and show the chosen lobby details
      $('#lobby-list').hide();
      $('#lobby-create').hide();
      $('#new').hide();
      
      $('#lobbies').show();
      $('#lobby').show();
          
      // get the lobbyID from the button attr
      lobby.id = $(this).attr('id');
      console.log('lobbyID = ', lobby.id);
      
      // emit join to the server with the id
      socket.emit('join', lobby);
  });

  /**
   * Event handlers
   */
  socket.on('newLobby', 
    function(lobby){
      $(".lobby-ulist").append('<li><div>L O B B Y : ' + lobby.name +'<div class="button-case"><button id="' + lobby.id + '" class="btn">J O I N</button></div></div></li>')
  });

  socket.on('bailLobby', 
    function(lobby){
      $("li:has(button[id=" + lobby.id + "])").remove();
  });
};