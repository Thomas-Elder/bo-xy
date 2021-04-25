
var config = require('../../../../client/game_sn/config');
var PlayerBox = require('../../../../client/game_sn/box/player_box');

var player;
var controller;

describe('PlayerBox', 
  function(){

    beforeEach(
      function(done){

        // Mock controller so we can test actions are handled.
        controller = {
          up: false,
          down: false,
          left: false,
          right: false
        };

        player = new PlayerBox(config, controller, {});
        done();
    });
    
    afterEach(
      function(done){
        done();
    });    

    describe('Position', 
      function(){  
        it('should maintain positions passed to the constructor', 
          function(done){

            var expected = {x:390, y:290};

            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
        });
    });

    describe('Size', 
      function(){  
        it('should maintain size passed to the constructor', 
          function(done){

            var expected = {width: 20, height: 20};

            var result = player.getSize();

            expect(result).toEqual(expected);
            done();
        });
    });

    describe('Movement', 
      function(){

        it('should apply gravity',
          function(done){

            var expected = {x:390, y:286};

            /* So we set the controller.up to true, to move the box up. Gravity
             * is applied regardless of controller status, so we should only move
             * up by the player.speed - gravity.
             * 
             * Gravity is now applied after all controller actions are handled. 
             */
            controller.up = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
        });

        it('should move the box when the controller.right is true', 
          function(done){

            var expected = {x:395, y:291};

            controller.right = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
        });

        
        it('should move the box when the controller.left is true', 
          function(done){

            var expected = {x:385, y:291};

            controller.left = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
        });

        it('should move the box when the controller.up is true', 
          function(done){

            var expected = {x:390, y:286};

            controller.up = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
        });

        it('should move the box when the controller.down is true', 
          function(done){

            var expected = {x:390, y:296};

            controller.down = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
        });
    });

    describe('Display', 
      function(){

        it('should have isBlinking > 0 when newly created',
          function(done){

            var expected = true;

            var result = player.isBlinking > 0;

            expect(result).toEqual(expected);
            done();
        });
    });
});