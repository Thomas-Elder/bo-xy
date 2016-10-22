
var config = require('../../../../client/game_sn/config');
var ExplodeBox = require('../../../../client/game_sn/box/explode_box');

var explode;

describe('ExplodeBox', 
  function(){

    beforeEach(
      function(done){

        explode = new ExplodeBox(1, 1, config, {});
        done();
    });
    
    afterEach(
      function(done){
        delete explode;
        done();
    });    

    describe('Position', 
      function(){  
        it('should maintain positions passed to the constructor', 
          function(done){

            var expected = {x:1, y:1};

            var result = explode.getPosition();

            expect(result).toEqual(expected);
            done();
        });

        it('function endOfExplode should return true after 50 update calls', 
          function(done){

            var expected = true;

            for (var i = 0; i < 50; i++)
              explode.update();

            var result = explode.endOfExplode();

            expect(result).toEqual(expected);
            done();
        });
    });

    describe('Size', 
      function(){  
        it('should maintain intial size passed to the constructor', 
          function(done){

            var expected = {width: 20, height: 20};

            var result = explode.getSize();

            expect(result).toEqual(expected);
            done();
        });

        it('should grow in size on update', 
          function(done){

            var expected = {width: 22, height: 22};

            explode.update();
            var result = explode.getSize();

            expect(result).toEqual(expected);
            done();
        });
    });
});