
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

  // Get a reference to the canvas element.
  var game_canvas = document.getElementById('game_canvas');

  // Get a reference to the hud
  var hud_canvas = document.getElementById('hud_canvas');

  // Get the context.
  contexts = {
    game_canvas: game_canvas,
    hud_canvas: hud_canvas,
    game_context: game_canvas.getContext('2d'),
    hud_context: hud_canvas.getContext('2d')
  }

  engine = new Engine();

  engine.init(contexts);
  engine.run();
};