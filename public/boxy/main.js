window.onload = function () {

  // Get a reference to the canvas element.
  var myCanvas     = document.getElementById('myCanvas');

  var difficulty = prompt('Choose your difficulty level :\neasy, medium or hard');

  var ini;

  switch (difficulty) {
    case 'easy' :
      ini = config.easy;
      break;
    case 'medium' :
      ini = config.medium;
      break;
    case 'hard' :
      ini = config.hard;
      break;
  }

  myCanvas.width   = ini.screenSize.width;
  myCanvas.height  = ini.screenSize.height;

  // Get the (graphics?) context.
  var context      = myCanvas.getContext('2d');

  var controller   = new Controller();

  window.onkeydown = function (event) { controller.keyDown(event); };
  window.onkeyup   = function (event) { controller.keyUp(event); };

  // Instantiate a new instance of type Box.
  var myBox        = new Box(ini, controller, context);

  // Instantiate a new instance of type Background.
  var background   = new Background(ini.screenSize, 0, context);

  // Define and initiate the game loop.
  function draw() {
    context.clearRect(0, 0, ini.screenSize.width, ini.screenSize.height);
    background.draw();
    myBox.update();
    myBox.draw();
  }

  setInterval(draw, 1000 / config.fps);
};