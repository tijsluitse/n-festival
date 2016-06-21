/* Requires */
var express = require('express'),
	hbs = require('hbs'),
	path = require('path'),
	app = express(),
	routes = require('./routes/index');

/* Make sure that people can get and post data by allowing cross origin */
app.use(function(req, res, next) {   	
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Use files in public map -> you can use /css/style.css as links */
app.use(express.static(path.join(__dirname, 'public')));

/* View engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* App responds to everything after / -> showevents etc. */
app.use('/', routes);

/* Partials --> nog niet nodig */
hbs.registerPartials(__dirname + '/views/partials');

/* Binds app to localhost:3000 in browser */
app.listen(3000, function () {
  	console.log('App listening on port 3000 :)');
});

module.exports = app;
