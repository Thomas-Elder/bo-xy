var Server = require('../../server/server');

var request = require('request');
var io_client = require('socket.io-client');

describe('Single events',
  function () {

    // Declared here to be accessible in all functions. 
    var server;
    var url = 'http://localhost:8888/mingle';
    var socketOptions = {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true
    };

    var client;

    // Spin up server before all tests
    beforeAll(function () {

      server = new Server();
      server.start();
    });

    // Close server after all tests
    afterAll(function () {
      server.stop();
    });

    beforeEach(
      function (done) {

        // Connect a client socket to the server
        client = io_client(url, socketOptions);

        // Log connection
        client.on('ack',
          function () {
            done();
          });

        // Log connection error
        client.on('connect_error',
          function () {
            console.log('socket_emit not connected, there was an error.');
            done();
          });
      });

    afterEach(
      function (done) {

        client.disconnect(true);
        done();
      });

    describe('ack', function () {

      it('should emit "ack" event to this client on connection', function (done) {
        client.on('ack', function (msg) {
          expect(true).toEqual(true);
          done();
        });

        client.disconnect();
        client.connect(url, socketOptions);
      });
    });

    describe('score', function () {

      it('should', function (done) {
        done();
      });

    });
  });