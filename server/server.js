
/**
 * Module dependencies.
 */
var routes = require('../routes');
var config = require('./config');
var Events = require('./events')

var express = require('express');
var path = require('path');

var Server = function(httpServer, express, app){

  this.express = express;
  this.app = app;
  
  this.events = new Events();
  this.server = httpServer;

  // all environments
  this.app.set('port', process.env.PORT || config.port);
  this.app.set('views', path.join(__dirname, '../views'));
  this.app.set('view engine', 'jade');

  this.app.use(express.logger('dev'));

  // set path for public
  this.app.use(express.static(path.join(__dirname, '../public')));

  // development only
  if ('development' == this.app.get('env')) {
    this.app.use(express.errorHandler());
  }

  // setting up routes 
  this.app.get('/', routes.index);
  this.app.get('*', routes.none);
};

Server.prototype.start = function(){
  // assign event handlers
  this.events.setEventHandlers(this.server);

  // start listening!
  this.server.listen(this.app.get('port'), 
    function(){
      console.log('Express server listening on port ' + '8888');
  });
};

module.exports = Server;