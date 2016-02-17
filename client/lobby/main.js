window.onload = function(){
  console.log('loading lobby script... ');
  
  var socket = io('/lobby');
  
  socket.emit('connected', {msg:"connected to namespace /lobby"});
  
  $('#lobby-create').hide();
  $('#lobby').hide();
  
  $('#join').click(function(){
    $('#lobby-list').hide();
    $('#lobby-create').hide();
    $('#lobby').show();
  });
  
  $('#new').click(function(){
    $('#lobby-list').hide();
    $('#lobby').hide();
    $('#lobby-create').show();
  });
  
  $('#open').click(function(){
    $('#lobby-create').hide();
    $('#lobby-list').hide();
    $('#lobby').show();
  });
  
  $('#bail').click(function(){
     $('#lobby').hide();
     $('#lobby-create').hide();
     $('#lobby-list').show();
  });
  
  $('#start').click(function(){
    window.location.replace("http://localhost:8888/dodge");
  });
};