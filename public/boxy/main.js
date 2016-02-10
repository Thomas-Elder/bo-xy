window.onload = function () {

  // Get a reference to the canvas element.
  var myCanvas     = document.getElementById('myCanvas');
  var ini = config;

  myCanvas.width   = ini.screenSize.width;
  myCanvas.height  = ini.screenSize.height;

  // Get the (graphics?) context.
  var context      = myCanvas.getContext('2d');

  // Instantiate a socket object to listen and emit events
  var socket = io();

  var controller   = new Controller(socket);

  window.onkeydown = function (event) { controller.keyDown(event); };
  window.onkeyup   = function (event) { controller.keyUp(event); };

  // Instantiate a new instance of type Box.
  var myBox        = new Box(ini, controller, context);
  
  var remoteBoxes = [];

  socket.on('new connection',
    function(id){
      console.log('another player has entered... ');
     remoteBoxes[id] = new RemoteBox(ini, socket, context);
  });
  
  socket.on('keyUp',
    function(id, data){
      console.log('id: ', id, ' data: ', data);
     remoteBoxes[id].changeState(data);
  });
  
  socket.on('keyDown',
    function(id, data){
      console.log('id: ', id, ' data: ', data);
     remoteBoxes[id].changeState(data);
  });
  
  // Instantiate a new instance of type Background.
  var background   = new Background(ini.screenSize, 0, context);
  
  // Define and initiate the game loop.
  function draw() {
    context.clearRect(0, 0, ini.screenSize.width, ini.screenSize.height);
    background.draw();
    myBox.update();
    myBox.draw();
    
    for (var key in remoteBoxes){
      remoteBoxes[key].update();
      remoteBoxes[key].draw();
    }
  }

  setInterval(draw, 1000 / config.fps);
};