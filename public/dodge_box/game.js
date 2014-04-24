function Game() {

  // Get a reference to the canvas element.
  this.game_canvas        = document.getElementById('game_canvas');

  this.game_canvas.width  = config.screenSize.width;
  this.game_canvas.height = config.screenSize.height;

  // Get a reference to the hud
  this.hud_canvas         = document.getElementById('hud_canvas');

  // Get the (graphics?) context.
  this.game_context       = this.game_canvas.getContext('2d');

  this.hud_context        = this.hud_canvas.getContext('2d');

  this.controller         = new Controller();

  window.onkeyup          = function (event) { this.controller.keyUp(event); };
  window.onkeydown        = function (event) { this.controller.keyDown(event); };

  // Instantiate a new instance of type BoxManager.
  this.boxManager         = new BoxManager(config, this.controller, this.game_context);
  this.boxManager.init();

  // Instantiate a new instance of type Background.
  this.background         = new Background(config, 0, this.game_context);

  this.hud                = new Hud(config, this.hud_context);

}

Game.prototype.run = function() {

  this.game_context.clearRect(0, 0, config.screenSize.width, config.screenSize.height);
  this.hud_context.clearRect(0, 0, config.hudSize.width, config.hudSize.height);

  // Update and draw the background
  this.background.update();
  this.background.draw();

  // Update and draw the boxes
  this.boxManager.update();
  this.boxManager.draw();

  // Update and draw the hud
  this.hud.update(this.boxManager.getScore(), this.boxManager.getLevel());
  this.hud.draw();

  setInterval(this.run, 1000 / config.fps);
};

Game.prototype.start = function() {

};

Game.prototype.stop = function() {

};

