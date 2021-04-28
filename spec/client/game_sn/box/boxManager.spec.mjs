
// const config = require('../../../client/game_sn/config.js');
//const PlayerBox = require('../../../../client/game_sn/box/boxes.js');
//const EnemyBox = require('../../../../client/game_sn/box/boxes.js');
//const ExplodeBox = require('../../../../client/game_sn/box/boxes.js');
//const Starbox = require('../../../../client/game_sn/box/boxes.js');

import {StarBox, PlayerBox, EnemyBox, ExplodeBox} from '../../../../client/game_sn/box/boxes.mjs';
import {BoxManager} from '../../../../client/game_sn/box/box_manager.mjs'

//import pkg from '../../../../client/game_sn/box/boxes.mjs';
//const {StarBox, PlayerBox, EnemyBox, ExplodeBox} = pkg;

describe('Box Manager',
  function(){

    beforeEach(
      function(done){
        done();
    });
    
    afterEach(
      function(done){
        done();
    }); 

    describe('init', function(){
      it('should create a new Interaction instance', function(done){

        done();
      });

      it('should create a new PlayerBox instance', function(done){

        done();
      });

      it('should create an array of EnemyBox instances', function(done){

        done();
      });
    });

    describe('update', function(){
      it('should call the player.update function', function(done){

        done();
      });
    });

    describe('enemyHit', function(){
      it('', function(){});
    });

    describe('newEnemyLocation', function(){
      it('', function(){});
    });
});