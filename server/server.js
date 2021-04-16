
// Local requires
var Controllers = require('./controllers/controllers');
var config = require('./config');
var EventManager = require('./events');
var managers = require('./managers');

// Express and Server requires
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

// Express middleware
var errorhandler = require('errorhandler')
var morgan = require('morgan')

// Socket requires
var io = require('socket.io')(server);

// Other requires
var path = require('path');

/**
 * Server
 */
var Server = function(){

  // set port, view dir and engine
  app.set('port', process.env.PORT || config.port);
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'pug');

  app.set('env', 'development');

  if ('development' == app.get('env')) {
    app.use(errorhandler());
    app.use(morgan('dev'));
  }

  // set path for static files
  app.use('/static', express.static(path.join(__dirname, '../client')));
  
  // setup managers
  var lobbyManager = new managers.Lobbies(); 
  var highscoreManager = new managers.Highscores();

  // setup controller, and pass managers
  var controllers = new Controllers(lobbyManager, highscoreManager);

  // Create new events instance
  var eventManager = new EventManager();
  eventManager.lobbyEvents(io, lobbyManager);
  eventManager.singleEvents(io, highscoreManager); 

  // setting up routes 
  app.get('/', controllers.index);
  app.get('/blog', controllers.blog);
  app.get('/single', controllers.single);
  app.get('/mingle', controllers.mingle);
  app.get('/highscores', controllers.highscores);
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
  io.close();
  server.close();
};

module.exports = Server;