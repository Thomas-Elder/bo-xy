function BoxManager(config, controller,context) {
  this.config     = config;
  this.controller = controller;
  this.context    = context;

  this.enemyBoxes = new Array(this.config.numberOfEnemies);

  this.spacingX = 0;
}

BoxManager.prototype.init = function() {

  // Instantiate a new instance of type PlayerBox.
  this.playerBox = new PlayerBox(this.config, this.controller, this.context);

  // Calculate placement of enemy boxes based on width of screen and number of
  // boxes. 
  this.spacingX = this.config.screenSize.width / this.config.numberOfEnemies;

  // Instantiate an array of new instances of type EnemyBox.
  for (var i = 0; i < this.enemyBoxes.length; i++)
    this.enemyBoxes[i] = new EnemyBox(i * this.spacingX, -config.enemySize.height * i, this.config, this.context);

};

BoxManager.prototype.draw = function() {

  this.playerBox.draw();

  for (var i = 0; i < this.enemyBoxes.length; i++)
    this.enemyBoxes[i].draw();

};

BoxManager.prototype.update = function() {

  this.playerBox.update();

  for (var i = 0; i < this.enemyBoxes.length; i++) {
    if (this.enemyBoxes[i].isOnScreen())
      this.enemyBoxes[i].update();
    else
      this.enemyBoxes[i] = new EnemyBox(i * this.spacingX, -config.enemySize.height * i, this.config, this.context);
  }
};