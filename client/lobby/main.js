window.onload = function(){

  var socket = io('/mingle');
  var lobby = {};
  
  socket.emit('connected', {msg:"connected to namespace /mingle"});
  
  // Initially show just the lobby list
  $('#lobby-list').show();
  $('#lobby-create').hide();
  $('#lobby').hide();
  $('#lobbies').hide();
    
  // JOIN
  $('#lobby-list').on('click',
    'button',
    function() {
      
      // display the lobby details
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

  // NEW  
  $('#new').click(function(){
    // display the create lobby bit
    $('#lobby-list').hide();
    $('#lobby').hide();
    $('#new').hide();
      
    $('#lobbies').show();
    $('#lobby-create').show();
  });
  
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
  
  $('#lobbies').click(function(){
    // display the lobby list
    $('#lobby').hide();
    $('#lobby-create').hide();
    $('#lobbies').hide();
    
    $('#new').show();
    $('#lobby-list').show();
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
  
  // START
  $('#start').click(function(){
    
    socket.emit('start', lobby);
    window.location.replace("http://localhost:8888/dodge");
  });
  
  
  /**
   * Event handlers
   */
  socket.on('newLobby', 
    function(lobby){
      $(".lobby-ulist").append('<li><div>L O B B Y : ' + lobby.name +'<div class="button-case"><button id="' + lobby.id + '" class="btn">J O I N</button></div></div></li>')
  });
  
  socket.on('PlayerJoined', 
    function(lobby){
      console.log('A new player has joined your lobby!');
  });
  
  socket.on('bailLobby', 
    function(lobby){
      $("li:has(button[id=" + lobby.id + "])").remove();
  });
  
  socket.on('start',
    function(lobby){
      window.location.replace("http://localhost:8888/dodge");
  });
};

