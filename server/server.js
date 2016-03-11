
/**
 * Module dependencies.
 */
var controllers = require('./controllers/controllers');
var config = require('./config');
var EventManager = require('./events');
var LobbyManager = require('./models/lobbyManager');

var path = require('path');

/**
 * Server
 * @param httpServer
 * @param express
 * @param app
 * 
 */
var Server = function(httpServer, express, app){
  
  // get instance references for these to use in start()
  this.app = app;
  this.server = httpServer;  
  this.io = require('socket.io')(httpServer);

  // set port, view dir and engine
  app.set('port', process.env.PORT || config.port);
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'jade');
  
  app.use(express.logger('dev'));

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  // set path for static files
  app.use('/static', express.static(path.join(__dirname, '../client')));
  
  // set lobby manager
  var lobbyManager = new LobbyManager();
  controllers.setLobbyManager(lobbyManager);
  
  // Create new events instance
  var eventManager = new EventManager();
  eventManager.lobbyEvents(this.io, lobbyManager);
  
  // setting up routes 
  app.get('/', controllers.index);
  app.get('/dodge', controllers.dodge);
  app.get('/highscores', controllers.highscores);
  app.get('/lobby', controllers.lobbies);
  app.get('*', controllers.none);
};

/**
 * start
 * 
 * Starts the server listening
 */
Server.prototype.start = function(){
  
  var port = this.app.get('port');

  // start listening!
  this.server.listen(port,
    function(){
      console.log('Express server listening on port: ' + port);
  });
};

/**
 * stop
 * 
 * Stops the server recieving any further requests.
 */
Server.prototype.stop = function(){
  this.server.close();
};

module.exports = Server;