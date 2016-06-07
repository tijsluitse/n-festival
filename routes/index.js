var express = require('express');
var router = express.Router();

// GET data 
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
    dataByName.sort(function (a, b) {
        var x = a.header.title.toLowerCase();
        var y = b.header.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    obj = dataByName;
});

// helper function to match data with day,name,location etc.
function findObject(data, arrayOfProps, objectToLookFor) {
    var obj = data.obj;

    var eventArray = [];

    obj.forEach(function (item) {
        var x = item;

        // get the right item from json data (with some help from Casper)
        arrayOfProps.forEach(function (prob) {
            x = x[prob];
        });

        if (x == objectToLookFor) {
            eventArray.push(item);
        }
    });

    return eventArray;
};


// Get home page
router.get('/', function (req, res, next) {

    var data = {
        obj: obj
    };

    var now = new Date(),
        day1 = new Date('October 8, 2016 23:59:59');

// show events day 1 if it's before day one, otherwise show events day 2
    if (now < day1) {
        var array = findObject(data, ['info', 'date'], '08-10-2016');

        res.render('home', {
            obj: array
        });

    } else {
        var array = findObject(data, ['info', 'date'], '09-10-2016');

        res.render('home', {
            obj: array
        });
    }

});

// get day 1
router.get('/day1', function (req, res, next) {
    var data = {
        obj: obj
    }

    var array = findObject(data, ['info', 'date'], '08-10-2016');

    res.render('home', {
        obj: array
    });

});

// get day 2
router.get('/day2', function (req, res, next) {
    var data = {
        obj: obj
    };

    var array = findObject(data, ['info', 'date'], '09-10-2016');

    res.render('home', {
        obj: array
    });
});

// get events page
router.get('/showevents', function (req, res, next) {
    var data = {
        obj: obj
    };

    res.render('showEvents', data);
});

// get timetable page
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