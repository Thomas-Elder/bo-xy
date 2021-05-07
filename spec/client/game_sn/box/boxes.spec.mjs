
import { config } from '../../../../client/game_sn/config.mjs'
import { PlayerBox, EnemyBox, ExplodeBox, StarBox } from '../../../../client/game_sn/box/boxes.mjs';

/**
 * Enemy box tests
 */
var enemy;

describe('EnemyBox ',
  function () {

    beforeEach(
      function (done) {
        enemy = new EnemyBox(0, config);
        done();
      });

    afterEach(
      function (done) {
        done();
      });

    describe('Update',
      function () {
        it('should reposition on update once y coord is greater than screenheight',
          function (done) {

            enemy.y = 601;
            enemy.update();

            var expected = 0;

            var result = enemy.getPosition().y;

            expect(result).toBeLessThan(expected);

            done();
          });

        it('should return true when update triggers a repositioning of the box',
          function (done) {

            enemy.y = 601;
            var expected = true;

            var result = enemy.update();

            expect(result).toEqual(expected);

            done();
          });
      });

    describe('Size',
      function () {
        it('should maintain size passed to the constructor',
          function (done) {

            var expected = { width: 20, height: 20 };

            var result = enemy.getSize();

            expect(result).toEqual(expected);

            done();
          });
      });

    describe('Movement',
      function () {

        it('should update the position of the box when the update function is called',
          function (done) {

            var expected = { x: enemy.x, y: enemy.y + 1 };

            enemy.update();
            var result = enemy.getPosition();

            expect(result.x).toEqual(expected.x);
            expect(result.y).toEqual(expected.y);

            done();
          });
      });

  });

/**
 * Player box tests
 */
var player;
var controller;

describe('PlayerBox',
  function () {

    beforeEach(
      function (done) {

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
      function (done) {
        controller = null;
        player = null;
        done();
      });

    describe('Position',
      function () {
        it('should maintain positions passed to the constructor',
          function (done) {

            var expected = { x: 390, y: 290 };

            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
          });
      });

    describe('Size',
      function () {
        it('should maintain size passed to the constructor',
          function (done) {

            var expected = { width: 20, height: 20 };

            var result = player.getSize();

            expect(result).toEqual(expected);
            done();
          });
      });

    describe('Movement',
      function () {

        it('should apply gravity',
          function (done) {

            var expected = { x: 390, y: 286 };

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
          function (done) {

            var expected = { x: 395, y: 291 };

            controller.right = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
          });


        it('should move the box when the controller.left is true',
          function (done) {

            var expected = { x: 385, y: 291 };

            controller.left = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
          });

        it('should move the box when the controller.up is true',
          function (done) {

            var expected = { x: 390, y: 286 };

            controller.up = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
          });

        it('should move the box when the controller.down is true',
          function (done) {

            var expected = { x: 390, y: 296 };

            controller.down = true;
            player.update();
            var result = player.getPosition();

            expect(result).toEqual(expected);
            done();
          });
      });

    describe('Display',
      function () {

        it('should have isBlinking > 0 when newly created',
          function (done) {

            var expected = true;

            var result = player.isBlinking > 0;

            expect(result).toEqual(expected);
            done();
          });
      });
  });

/**
 * Explode box tests
 */
var explode;

describe('ExplodeBox',
  function () {

    beforeEach(
      function (done) {

        explode = new ExplodeBox(1, 1, config, {});
        done();
      });

    afterEach(
      function (done) {
        done();
      });

    describe('Position',
      function () {
        it('should maintain positions passed to the constructor',
          function (done) {

            var expected = { x: 1, y: 1 };

            var result = explode.getPosition();

            expect(result).toEqual(expected);
            done();
          });

        it('function endOfExplode should return true after 50 update calls',
          function (done) {

            var expected = true;

            for (var i = 0; i < 50; i++)
              explode.update();

            var result = explode.endOfExplode();

            expect(result).toEqual(expected);
            done();
          });
      });

    describe('Size',
      function () {
        it('should maintain intial size passed to the constructor',
          function (done) {

            var expected = { width: 20, height: 20 };

            var result = explode.getSize();

            expect(result).toEqual(expected);
            done();
          });

        it('should grow in size on update',
          function (done) {

            var expected = { width: 22, height: 22 };

            explode.update();
            var result = explode.getSize();

            expect(result).toEqual(expected);
            done();
          });
      });
  });

/**
 * Star box tests
 */
var star;

describe('StarBox',
  function () {

    beforeEach(
      function (done) {
        star = new StarBox(
          { x: 1, y: 1 },
          config,
          config.box.farstar.size.width,
          config.box.farstar.size.height,
          config.box.farstar.colour,
          config.box.farstar.speed
        );
        done();
      });

    afterEach(
      function (done) {
        done();
      });

    describe('Position',
      function () {
        it('should maintain positions passed to the constructor',
          function (done) {

            var expected = { x: 1, y: 1 };

            var result = star.getPosition();

            expect(result).toEqual(expected);

            done();
          });
      });

    describe('Size',
      function () {
        it('should maintain size passed to the constructor',
          function (done) {

            var expected = { width: 1, height: 1 };

            var result = star.getSize();

            expect(result).toEqual(expected);

            done();
          });
      });

    describe('Movement',
      function () {

        it('should update the position of the box when the update function is called',
          function (done) {

            var expected = { x: 1, y: 1 + config.box.farstar.speed };

            star.update();
            var result = star.getPosition();

            expect(result).toEqual(expected);

            done();
          });
      });

    describe('OnScreen',
      function () {
        it('should return true after creation',
          function (done) {

            var expected = true;

            var result = star.onScreen;

            expect(result).toEqual(expected);

            done();
          });

        it('should return false when the y position is greater than the screen height',
          function (done) {

            var expected = false;

            for (var i = 0; i <= config.screenSize.height / star.speed; i++)
              star.update();

            var result = star.onScreen;

            expect(result).toEqual(expected);

            done();
          });
      });
  });