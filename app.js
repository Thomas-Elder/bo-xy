
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();

// all environments
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.logger('dev'));

// set path for public
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// setting up routes 
app.get('/', routes.index);
app.get('/boxy', routes.boxy);
app.get('/flappy_box', routes.flappy_box);
app.get('*', routes.none);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
