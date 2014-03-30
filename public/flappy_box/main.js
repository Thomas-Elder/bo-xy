window.onload = function () {

  // Get a reference to the canvas element.
  var myCanvas     = document.getElementById('myCanvas');

  //var difficulty = prompt('Choose your difficulty level :\neasy, medium or hard');

  //var config = config.easy;

  myCanvas.width   = config.screenSize.width;
  myCanvas.height  = config.screenSize.height;

  // Get the (graphics?) context.
  var context      = myCanvas.getContext('2d');

  var controller   = new Controller();

  window.onkeydown = function (event) { controller.keyDown(event); };
  window.onkeyup   = function (event) { controller.keyUp(event); };

  // Instantiate a new instance of type BoxManager.
  var boxManager   = new BoxManager(config, controller, context);
  boxManager.init();

  // Instantiate a new instance of type Background.
  var background   = new Background(config.screenSize, 0, context);

  // Define and initiate the game loop.
  function draw() {
    context.clearRect(0, 0, config.screenSize.width, config.screenSize.height);

    // Update and draw the background
    background.update();
    background.draw();

    // Update and draw the boxes
    boxManager.update();
    boxManager.draw();

  }

  setInterval(draw, 1000 / config.fps);
};