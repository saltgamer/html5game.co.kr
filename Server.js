/*  
	@ html5game.co.kr  - server.js -  
	@ Copyright(c) 2015 saltgamer@gmail.com
*/

var fs = require('fs'),
	express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	config = require('./config/config'),
	app = express(),
	port = process.env.PORT || 7777;

// Connect to mongodb
var connect = function () {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log('html5game server started on port ' + port);

