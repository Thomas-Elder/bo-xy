function BoxManager(config, controller,context) {
  this.config     = config;
  this.controller = controller;
  this.context    = context;

  this.enemyBoxes = new Array(this.config.numberOfEnemies);
  this.enemySpeed = config.enemySpeed;
  this.levelCount = 0;

  this.enemySpacing = 0;
}

BoxManager.prototype.init = function() {

  // Instantiate a new instance of type PlayerBox.
  this.playerBox = new PlayerBox(this.config, this.controller, this.context);

  // Calculate placement of enemy boxes based on width of screen and number of
  // boxes. 
  this.enemySpacing = this.config.screenSize.width / this.config.numberOfEnemies;

  // Instantiate an array of new instances of type EnemyBox.
  for (var i = 0; i < this.enemyBoxes.length; i++) {
    this.enemyBoxes[i] = new EnemyBox(i * this.enemySpacing,
                                      -config.enemySize.height * i,
                                      this.enemySpeed[this.levelCount],
                                      this.config,
                                      this.context);
  }
};

BoxManager.prototype.draw = function() {

  this.playerBox.draw();

  for (var i = 0; i < this.enemyBoxes.length; i++)
    this.enemyBoxes[i].draw();

};

BoxManager.prototype.update = function() {

  this.playerBox.update();

  /**
  * 
  */
  if (this.levelCount < (this.config.numberOfLevels * this.config.levelLength))
    this.levelCount++;

  // console.log(this.levelCount);

  /**
  * For each enemyBox, check if it is on the screen, if so call its update 
  * method, else initialise a new box.
  */
  for (var i = 0; i < this.enemyBoxes.length; i++) {

    if (this.enemyBoxes[i].isOnScreen()) {
      this.enemyBoxes[i].update();
    } else {

      var level = Math.floor(this.levelCount / this.config.levelLength);

      if (level >= this.enemySpeed.length)
        level = this.enemySpeed.length;

      //console.log(this.enemySpeed[level]);
      console.log(level);
      console.log(this.enemySpeed[level]);

      this.enemyBoxes[i] = new EnemyBox(i * this.enemySpacing,
                                        -config.enemySize.height * i,
                                        this.enemySpeed[level],
                                        this.config,
                                        this.context);
    }
  }
};



/**
 * Helper functions for the BoxManager
 */

/**
 * Collision Detection
 */
function collisionDetection() {

}