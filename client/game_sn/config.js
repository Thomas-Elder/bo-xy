/**
* Configuration Settings for flappy_box
*/
var config = {

  /**
  * Global Configuration Settings
  */
  fps : 120,
  gravity : 2,
  backgroundColour : '#000000',
  numberOfLevels : 5,
  levelLength: 1000,
  numberOfEnemies : 20,
  numberOfFarStars : 50,
  numberOfNearStars : 10,

  hudSize : {
    width : 800,
    height : 50
  },

  hudTextColour : '#3399FF',

  screenSize : {
    width : 800,
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
      invColour: '#AAA',

      size : {
        height : 20,
        width : 20
      },

      invulnerability : 500
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
     * FAR STAR CONFIG
     */
    farstar : {
      speed : 0.3,

      size : {
        height : 1,
        width : 1
      },

      colour : '#FFFFFF'
    },

    /**
     * NEAR STAR CONFIG
     */
    nearstar : {
      speed : 0.6,

      size : {
        height : 3,
        width : 3
      },

      colour : '#FFFFFF'
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