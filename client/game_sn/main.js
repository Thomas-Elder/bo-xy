
var config = require('./config.js');

var Hud = require('./hud.js');
var Background = require('./background.js');
var Controller = require('./controller.js');
var BoxManager = require('./box/box_manager.js');

var Engine = require('./engine');

window.onload = function () {

  /** We need to get contexts on load, as otherwise the script is parsed
  * before the page is loaded, and the contexts don't exist yet.
  */
  var contexts = {};

  var game_canvas = document.getElementById('game_canvas');
  var hud_canvas = document.getElementById('hud_canvas');

  // Wrap these in an object to pass to the game
  contexts = {
    game_canvas: game_canvas,
    hud_canvas: hud_canvas,
    game_context: game_canvas.getContext('2d'),
    hud_context: hud_canvas.getContext('2d')
  }

  // Set up io and connect to the 'single' namespace
  var socket = io('/single');
  socket.emit('connected', {msg:"connected to namespace /single"});

  /** We need the game to return the end of game state, so we can 
  * display that to the user. 
  */
  var game_details = {};

  // Initially show the new player input field
  $("#new-player").show();
  $("#game").hide();
  $("#endgame").hide();

  $("#box").click(function(){
    $("#new-player").hide();
    $("#game").show();

    engine = new Engine(socket);

    engine.init(contexts);
    engine.run();
  }); 
};