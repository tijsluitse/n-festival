var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/showevents', function(req, res, next) {
  res.render('showEvents');
});

router.get('/timetable', function(req, res, next) {
  res.render('timeTable');
});

module.exports = router;