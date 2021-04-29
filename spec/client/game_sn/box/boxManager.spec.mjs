
import { config } from '../../../../client/game_sn/config.mjs';
import { StarBox, PlayerBox, EnemyBox, ExplodeBox } from '../../../../client/game_sn/box/boxes.mjs';
import { BoxManager } from '../../../../client/game_sn/box/box_manager.mjs'
import { Controller } from '../../../../client/game_sn/controller.mjs';

var controller;
var boxManager;

describe('Box Manager',
  function () {

    beforeEach(
      function (done) {
        controller = new Controller();
        boxManager = new BoxManager(config, controller);
        done();
      });

    afterEach(
      function (done) {
        controller = null;
        boxManager = null;
        done();
      });

    describe('constructor', function () {
      it('should create a new Interaction instance', function (done) {
        expect(boxManager.interaction).not.toBe(null);
        done();
      });

      it('should create a new PlayerBox instance', function (done) {
        expect(boxManager.playerBox).not.toBe(null);
        done();
      });

      it('should create an array for EnemyBoxes', function (done) {
        expect(boxManager.enemyBoxes).not.toBe(null);
        done();
      });

      it('should create an array for EnemyBoxes of config length', function (done) {
        expect(boxManager.enemyBoxes.length).toBe(config.numberOfEnemies);
        done();
      });

      it('should create an array for nearStarBoxes', function (done) {
        expect(boxManager.nearStarBoxes).not.toBe(null);
        done();
      });

      it('should create an array for nearStarBox of config length', function (done) {
        expect(boxManager.nearStarBoxes.length).toBe(config.numberOfNearStars);
        done();
      });

      it('should create an array for farStarBoxes', function (done) {
        expect(boxManager.farStarBoxes).not.toBe(null);
        done();
      });

      it('should create an array for farStarBox of config length', function (done) {
        expect(boxManager.farStarBoxes.length).toBe(config.numberOfFarStars);
        done();
      });
    });

    describe('updatePlayer', function () {
      it('should call the player.update function', function (done) {

        done();
      });
    });

    describe('updateEnemies', function () {
      it('should call the enemy.update function', function (done) {

        done();
      });
    });

    describe('updateBackground', function () {
      it('should call the star.update function', function (done) {

        done();
      });
    });

    describe('updateExplosions', function () {
      it('should call the explode.update function', function (done) {

        done();
      });
    });

    describe('clearEnemies', function () {
      it('', function () { });
    });

    describe('enemyHit', function () {
      it('', function () { });
    });

    describe('newEnemyLocation', function () {
      it('', function () { });
    });

    describe('startStarLocation', function () {
      it('', function () { });
    });

    describe('newStarLocation', function () {
      it('', function () { });
    });
  });