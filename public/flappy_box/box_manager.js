function BoxManager(config, controller,context) {
  this.config     = config;
  this.controller = controller;
  this.context    = context;
}

BoxManager.prototype.init = function() {

  // Instantiate a new instance of type PlayerBox.
  this.playerBox = new PlayerBox(this.config, this.controller, this.context);

  // Instantiate a new instance of type EnemyBox.
  this.enemyBox  = new EnemyBox(this.config, this.context);
};

BoxManager.prototype.draw = function() {

  this.playerBox.draw();

  this.enemyBox.draw();
};

BoxManager.prototype.update = function() {

  this.playerBox.update();

  if (this.enemyBox.isOnScreen())
    this.enemyBox.update();
  else
    this.enemyBox = new EnemyBox(this.config, this.context);
};