
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
        delete player;
        done();
    });    

    describe('Position', 
      function(){  
        it('should maintain positions passed to the constructor', 
          function(done){

            var expected = {x:290, y:580};

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

            var expected = {x:290, y:577};

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

            var expected = {x:295, y:580};

            controller.right = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
        });

        
        it('should move the box when the controller.left is true', 
          function(done){

            var expected = {x:285, y:580};

            controller.left = true;
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