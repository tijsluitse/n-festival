var express = require('express');
var router = express.Router();

// GET data (kan dit in een andere file en data meesturen templates?)
var fs = require('fs');
var obj;

fs.readFile('./public/data/data.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    
     for (var i = 0; i < obj.length; i++) {
         var id = "id",
             value = i
         
         obj[i][id] = value;
     }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {
        obj: obj
    };

    res.render('home', data);
});

router.get('/showevents', function (req, res, next) {
    var data = {
        obj: obj
    };

    res.render('showEvents', data);
});

router.get('/timetable', function (req, res, next) {
    res.render('timeTable');
});

router.get('/detail/:id', function (req, res, next) {
    
    if (req.query.js != undefined) {
        var js = false;
    } else {
        var js = 'layout';
    }
    
    var data = {obj: obj};

    function findId(data, idToLookFor) {
        var obj = data.obj;
        
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].id == idToLookFor) {
                return (obj[i]);
            }
        }
    }

    var item = findId(data, req.params.id);
    
    res.render('detailEvents', {
        item: item,
        layout: js
    });
});

module.exports = router;