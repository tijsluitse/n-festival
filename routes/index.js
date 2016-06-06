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
            value = i;
        obj[i][id] = value;
    }

    // sort by name
    var dataByName = obj.slice(0);
    dataByName.sort(function(a,b) {
        var x = a.header.title.toLowerCase();
        var y = b.header.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    obj = dataByName;
});

/* GET home page. */
router.get('/', function (req, res, next) {

    var data = {
        obj: obj
    };

//    var eventArrHome = [];
//
//    var now = new Date(),
//        day1 = new Date('October 8, 2016 23:59:59');
//
//    function findDay(data, day) {
//        var obj = data.obj;
//
//        obj.forEach(function (item) {
//            if (item.info.date == day) {
//                eventArrHome.push(item);
//            }
//        });
//    };
//
//    if (now < day1) {
//        findDay(data, '08-10-2016');
//
//        res.render('homeDay1', {
//            obj: eventArrHome
//        });
//
//    } else {
//        findDay(data, '09-10-2016');
//
//        res.render('homeDay2', {
//            obj: eventArrHome
//        });
//    }
    
    res.render('home', {
            obj: obj
            });

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

    var data = {
        obj: obj
    };

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

router.get('/location/:place', function (req, res, next) {
    var data = {
        obj: obj
    };

    var location = req.params.place.replace(/-/g, " ");

    var eventArr = [];

    function findId(data, idToLookFor) {
        var obj = data.obj;

        obj.forEach(function (item) {
            if (item.info.location == idToLookFor) {
                eventArr.push(item);
            }
        });
    };

    findId(data, location);

    res.render('locationList', {
        obj: eventArr
    });
});

module.exports = router;