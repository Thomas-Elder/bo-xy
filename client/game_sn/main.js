
var config = require('./config.js');

var Hud = require('./hud.js');
var Background = require('./background.js');
var Controller = require('./controller.js');
var BoxManager = require('./box/box_manager.js');

var Engine = require('./engine');

window.onload = function () {

  // We need to get contexts on load, as otherwise the script is parsed
  // before the page is loaded, and the contexts don't exist yet.
  var contexts = {};

  var game_canvas = document.getElementById('game_canvas');
  var hud_canvas = document.getElementById('hud_canvas');

  contexts = {
    game_canvas: game_canvas,
    hud_canvas: hud_canvas,
    game_context: game_canvas.getContext('2d'),
    hud_context: hud_canvas.getContext('2d')
  }

  // Initially show the new player input field
  $("#new-player").show();
  $("#game").hide();

  $("#box").click(function(){
    $("#new-player").hide();
    $("#game").show();

    engine = new Engine();

    engine.init(contexts);
    engine.run();
  });

  // get the final score from the game, and send it to the server.
};