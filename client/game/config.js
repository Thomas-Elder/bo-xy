/**
 * getConfig
 * @return configuration settings for the game
 */
exports.getConfig = function(){
  
  return {
    /**
    * Global Configuration Settings
    */
    fps : 120,
    gravity : 2,
    numberOfLevels : 6,
    levelLength: 1000,
    numberOfEnemies : 20,

    hudSize : {
      width : 400,
      height : 50
    },

    screenSize : {
      width : 800,
      height : 800
    },

    box : {

      /**
       * PLAYER CONFIG
       */
      player : {
        lives : 3,

        size : {
          height : 20,
          width : 20
        }
      },

      /**
       * ENEMY CONFIG
       */
      enemy : {
        speed : [5, 10, 15, 20, 25, 30],

        size : {
          height : 20,
          width : 20
        },

        startPos : {
          x : 0,
          y : 0
        }
      },
    }
  };
};