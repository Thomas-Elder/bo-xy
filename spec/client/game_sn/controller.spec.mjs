
import {Controller} from '../../../client/game_sn/controller.mjs';

var controller;
var event;

describe('Controller', 
  function(){

    beforeEach(
      function(done){

        controller = new Controller();

        event = {};
        event.keyCode = 0;
        event.preventDefault = function(){};

        done();
    });
    
    afterEach(
      function(done){
        done();
    });    

    describe('KeyDown Events', 
      function(){  
        it('should set left true on keyDown event, keyCode 37', 
          function(done){

            var expected = true;

            event.keyCode = 37;
            controller.keyDown(event);
            var result = controller.left;

            expect(result).toEqual(expected);
            done();
        });
        it('should set up true on keyDown event, keyCode 38', 
          function(done){

            var expected = true;

            event.keyCode = 38;
            controller.keyDown(event);
            var result = controller.up;

            expect(result).toEqual(expected);
            done();
        });
        it('should set right true on keyDown event, keyCode 39', 
          function(done){

            var expected = true;

            event.keyCode = 39;
            controller.keyDown(event);
            var result = controller.right;

            expect(result).toEqual(expected);
            done();
        });
        it('should set down true on keyDown event, keyCode 40', 
          function(done){

            var expected = true;

            event.keyCode = 40;
            controller.keyDown(event);
            var result = controller.down;

            expect(result).toEqual(expected);
            done();
        });
    });

    describe('KeyUp Events', 
      function(){  
        it('should set left false on keyUp event, keyCode 37', 
          function(done){

            var expected = false;

            event.keyCode = 37;
            controller.keyUp(event);
            var result = controller.left;

            expect(result).toEqual(expected);
            done();
        });
        it('should set up false on keyUp event, keyCode 38', 
          function(done){

            var expected = false;

            event.keyCode = 38;
            controller.keyUp(event);
            var result = controller.up;

            expect(result).toEqual(expected);
            done();
        });
        it('should set right false on keyUp event, keyCode 39', 
          function(done){

            var expected = false;

            event.keyCode = 39;
            controller.keyUp(event);
            var result = controller.right;

            expect(result).toEqual(expected);
            done();
        });
        it('should set down false on keyUp event, keyCode 40', 
          function(done){

            var expected = false;

            event.keyCode = 40;
            controller.keyUp(event);
            var result = controller.down;

            expect(result).toEqual(expected);
            done();
        });
    });
});