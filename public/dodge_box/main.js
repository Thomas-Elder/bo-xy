window.onload = function () {

  // Get a reference to the canvas element.
  var game_canvas  = document.getElementById('game_canvas');

  game_canvas.width   = config.screenSize.width;
  game_canvas.height  = config.screenSize.height;

  // Get a reference to the hud
  var hud_canvas   = document.getElementById('hud_canvas');

  // Get the (graphics?) context.
  var game_context = game_canvas.getContext('2d');

  var hud_context  = hud_canvas.getContext('2d');

  var splash = new Splash(config, game_context);

  splash.draw();

  var game = new Game();

  game.run();
};