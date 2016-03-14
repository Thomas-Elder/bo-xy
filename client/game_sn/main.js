window.onload = function () {

  // Get a reference to the canvas element.
  var game_canvas  = document.getElementById('game_canvas');

  game_canvas.width   = config.screenSize.width;
  game_canvas.height  = config.screenSize.height;

  // Get a reference to the hud
  var hud_canvas   = document.getElementById('hud_canvas');

  hud_canvas.width   = config.hudSize.width;
  hud_canvas.height  = config.hudSize.height;

  // Get the (graphics?) context.
  var game_context = game_canvas.getContext('2d');

  var hud_context  = hud_canvas.getContext('2d');


  var controller   = new Controller();

  window.onkeydown = function (event) { controller.keyDown(event); };
  window.onkeyup   = function (event) { controller.keyUp(event); };

  // Instantiate a new instance of type BoxManager.
  var boxManager   = new BoxManager(config, controller, game_context);
  boxManager.init();

  // Instantiate a new instance of type Background.
  var background   = new Background(config, 0, game_context);
  
  var hud          = new Hud(config, hud_context);  

  // Define and initiate the game loop.
  function draw() {
    game_context.clearRect(0, 0, config.screenSize.width, config.screenSize.height);
    hud_context.clearRect(0, 0, config.hudSize.width, config.hudSize.height);

    // Update and draw the background
    background.update();
    background.draw();

    // Update and draw the boxes
    boxManager.update();
    boxManager.draw();

    // Update and draw the hud
    hud.update(boxManager.getScore(), boxManager.getLevel(), boxManager.getLives());
    hud.draw();

    if (boxManager.getLevel() === config.numberOfLevels ||
      boxManager.getLives() === 0) {
        game_context.clearRect(0, 0, config.screenSize.width, config.screenSize.height);
        hud_context.clearRect(0, 0, config.hudSize.width, config.hudSize.height);
        
        boxManager.endGame();
          
        clearInterval(gameLoop);
    }
  }

  var gameLoop = setInterval(draw, 1000 / config.fps);
};