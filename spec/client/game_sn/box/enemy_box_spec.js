
var config = require('../../../../client/game_sn/config');
var EnemyBox = require('../../../../client/game_sn/box/enemy_box');

var enemy;

describe('EnemyBox', 
  function(){

    beforeEach(
      function(done){
        enemy = new EnemyBox({x:1,y:1}, 0, config);
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

            var expected = {x:1, y:1};

            var result = enemy.getPosition();

            expect(result).toEqual(expected);

            done();
        });
    });

    describe('Size', 
      function(){  
        it('should maintain size passed to the constructor', 
          function(done){

            var expected = {width: 20, height: 20};

            var result = enemy.getSize();

            expect(result).toEqual(expected);

            done();
        });
    });

    describe('Movement', 
      function(){  
        
        it('should update the position of the box when the update function is called',
          function(done){

            var expected = {x:1, y:2};

            enemy.update();
            var result = enemy.getPosition();

            expect(result).toEqual(expected);

            done();
        });
    });

    describe('OnScreen', 
      function(){
        it('should return true after creation', 
          function(done){

            var expected = true;

            var result = enemy.onScreen;

            expect(result).toEqual(expected);

            done();
        });

        it('should return false when the y position is greater than the screen height', 
          function(done){

            var expected = false;

            for (var i = 0; i <= config.screenSize.height; i++)
              enemy.update();

            var result = enemy.onScreen;

            expect(result).toEqual(expected);

            done();
        });
    });
});