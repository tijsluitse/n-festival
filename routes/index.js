var express = require('express');
var router = express.Router();

var fs = require('fs');
var obj;
fs.readFile('./data/data.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
    
    console.log(obj[0].curators[0].name);
});

  var names = [
        {name: 'Lisa'},
        {name: 'Linda'},
        {name: 'Tijs'}
    ];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/showevents', function(req, res, next) {
    
    var data = {obj: obj};
    
  res.render('showEvents', data);
});

router.get('/timetable', function(req, res, next) {
  res.render('timeTable');
});

module.exports = router;