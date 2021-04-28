
import {Interaction} from '../../../client/game_sn/box/interaction.mjs';

var interaction;

describe('Interaction', 
  function(){

    beforeEach(
      function(done){

        interaction = new Interaction();
        done();
    });
    
    afterEach(
      function(done){
        done();
    });    

    describe('Collision', 
      function(){  
        it('should return false for two boxes not overlapping', 
          function(done){

            var a = {};
            a.getSize = function(){
              return {height: 20, width: 20};
            };

            a.getPosition = function(){
              return {x: 1, y: 1};
            };

            var b = {};
            b.getSize = function(){
              return {height: 20, width: 20};
            };

            b.getPosition = function(){
              return {x: 100, y: 100};
            };

            var expected = false;

            var result = interaction.collision(a, b);

            expect(result).toEqual(expected);
            done();
        });
        it('should return true for two boxes which are overlapping', 
          function(done){

            var a = {};
            a.getSize = function(){
              return {height: 20, width: 20};
            };

            a.getPosition = function(){
              return {x: 1, y: 1};
            };

            var b = {};
            b.getSize = function(){
              return {height: 20, width: 20};
            };

            b.getPosition = function(){
              return {x: 2, y: 2};
            };

            var expected = true;

            var result = interaction.collision(a, b);

            expect(result).toEqual(expected);
            done();
        });
    });
});