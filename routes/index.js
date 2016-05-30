var express = require('express');
var router = express.Router();

// GET data (kan dit in een andere file en data meesturen templates?)
var fs = require('fs');
var obj;
fs.readFile('./data/data.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {obj: obj};
    
    res.render('home', data);
});

router.get('/showevents', function (req, res, next) {  
    var data = {obj: obj};
    
    res.render('showEvents', data);
});

router.get('/timetable', function (req, res, next) {
    res.render('timeTable');
});

module.exports = router;