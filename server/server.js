
// Local requires
var controllers = require('./controllers/controllers');
var config = require('./config');
var EventManager = require('./events');
var LobbyManager = require('./managers/lobbyManager');
var HighscoreManager = require('./managers/highscoreManager');

// Express and Server requires
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

// Other requires
var path = require('path');

/**
 * Server
 */
var Server = function(){
  
  this.io = require('socket.io')(server);

  // set port, view dir and engine
  app.set('port', process.env.PORT || config.port);
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'jade');

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
  }

  // set path for static files
  app.use('/static', express.static(path.join(__dirname, '../client')));
  
  // set lobby manager
  var lobbyManager = new LobbyManager();
  controllers.setLobbyManager(lobbyManager);
  
  // set highscore manager
  var highscoreManager = new HighscoreManager();
  controllers.setHighscoreManager(highscoreManager);

  // Create new events instance
  var eventManager = new EventManager();
  eventManager.lobbyEvents(this.io, lobbyManager);
  eventManager.singleEvents(this.io, highscoreManager);

  // setting up routes 
  app.get('/', controllers.index);
  app.get('/single', controllers.single);
  app.get('/highscores', controllers.highscores);
  app.get('/mingle', controllers.mingle);
  app.get('/lobbies', controllers.lobbies);
  app.get('*', controllers.none);
 
};

/**
 * start
 * 
 * Starts the server listening
 */
Server.prototype.start = function(){
  
  var port = app.get('port');

  // start listening!
  server.listen(port,
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
  server.close();
};

module.exports = Server;