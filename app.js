var Server = require('./server/server');

var http = require('http');
var express = require('express');
var app = express();
var httpServer = http.createServer(app);

var server = new Server(httpServer, express, app);

console.log('starting server... ');
server.start();