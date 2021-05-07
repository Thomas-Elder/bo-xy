import {Utility} from '../../../client/game_sn/utility.mjs';

describe('Utility', 
  function(){

    beforeEach(
      function(done){
        done();
    });
    
    afterEach(
      function(done){
        done();
    });    

    describe('overlap', 
      function(){  
        it('should return false for two boxes not overlapping', 
          function(done){

            var a = {
                x: 1,
                y: 1,
                width: 20,
                height: 20
            };

            var b = {
                x: 100,
                y: 100,
                width: 20,
                height: 20
            };

            var expected = false;

            var result = Utility.overlap(a, b);

            expect(result).toEqual(expected);
            done();
        });
        it('should return true for two boxes which are overlapping', 
          function(done){

            var a = {
                x: 1,
                y: 1,
                width: 20,
                height: 20
            };

            var b = {
                x: 19,
                y: 19,
                width: 20,
                height: 20
            };

            var expected = true;

            var result = Utility.overlap(a, b);

            expect(result).toEqual(expected);
            done();
        });
    });
});