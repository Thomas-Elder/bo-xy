/**
* Configuration Settings for flappy_box
*/

var config = {

  /**
  * Global Configuration Settings
  */
  fps : 120,
  gravity : 2,

  screenSize : {
    width : 400,
    height : 400
  },

  playerSpeed : 5,

  playerSize : {
    height : 20,
    width : 20
  },

  playerStartPos : {
    x : 50,
    y : 50
  },

  numberOfEnemies : 7,

  enemySpeed : 5,

  enemySize : {
    height : 20,
    width : 20
  },

  enemyStartPos : {
    x : 100,
    y : 0
  },

/**
* Configuration Settings by difficulty
*/

  // EASY
  easy : {

    screenSize : {
      width : 400,
      height : 400
    },

    playerSpeed : 5,

    playerSize : {
      height : 20,
      width : 20
    },

    playerStartPos : {
      x : 50,
      y : 50
    }, 

    gravity : 2
  },

  // MEDIUM
  medium : {

    screenSize : {
      width : 800,
      height : 400
    },

    playerSpeed : 10,

    playerSize : {
      height : 30,
      width : 30
    },

    playerStartPos : {
      x : 50,
      y : 50
    }
  },

  // HARD
  hard : {

    screenSize : {
      width : 1200,
      height : 400
    },

    playerSpeed : 10,

    playerSize : {
      height : 40,
      width : 40
    },

    playerStartPos : {
      x : 50,
      y : 50
    }
  }
};

