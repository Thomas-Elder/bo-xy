/**
* Configuration Settings for flappy_box
*/
var config = {

  /**
  * Global Configuration Settings
  */
  fps : 120,
  gravity : 2,
  backgroundColour : '#1A1A1A',
  numberOfLevels : 4,
  levelLength: 1000,
  numberOfEnemies : 20,

  hudSize : {
    width : 600,
    height : 50
  },

  hudTextColour : '#3399FF',

  screenSize : {
    width : 600,
    height : 600
  },

  box : {

    /**
     * PLAYER CONFIG
     */
    player : {
      speed : 5,
      lives : 3,

      colour : '#3399FF',

      size : {
        height : 20,
        width : 20
      }
    },

    /**
     * ENEMY CONFIG
     */
    enemy : {
      speed : [1, 2, 3, 4, 5, 6],

      colour : ['#FFFFFF',
                    '#FFFFAC',
                    '#FFFF56',
                    '#FFAC00',
                    '#FF5600',
                    '#FF0000'],

      size : {
        height : 20,
        width : 20
      },

      startPos : {
        x : 100,
        y : 0
      }
    },

    /**
     * EXPLODE CONFIG
     */
    explode : {
      size : {
        height : 20,
        width : 20
      },

      colour : ['#FFFFFF',
                '#DDDDDD',
                '#BBBBBB',
                '#999999',
                '#777777',
                '#555555']
    },
    
    /**
     * POWER CONFIG
     */
    power : {
      speed : 1,
      size : {
        height : 20,
        width : 20
      },
      
      colour : [
        '#00B789',
        '#88B789'
      ]
    }
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



module.exports = config;