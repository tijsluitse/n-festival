var express = require('express');
//var hbs = require('hbs');
var path = require('path');
var app = express();
var routes = require('./routes/index');

// use files in public map -> you can use /css/style.css as links
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app responds to everything after / -> showevents etc.
app.use('/', routes);

// partials --> nog niet nodig
//hbs.registerPartials(__dirname + '/views/partials');

app.listen(3000, function () {
  console.log('App listening on port 3000 :)');
});

module.exports = app;
