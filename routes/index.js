var express = require('express');
var router = express.Router();
var http = require('http');

var apiData;

http.get({
    host: 'n-festival.werk.vanjim.nl',
    path: '/wp-json/wp/v2/events'
}, function (response) {
    // Continuously update stream with data
    var body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {

        // Data reception is done, do whatever with it!
        apiData = JSON.parse(body);

        apiData.forEach(function (event) {
            var startArray = event.acf.start_time.split(' '),
                endArray = event.acf.end_time.split(' ');

            var day = startArray[0],
                starttime = startArray[1],
                endtime = endArray[1];
            
            var date = 'date',
                startconvert = 'starttime_converted',
                endconvert = 'endtime_converted';
            
            event.acf[date] = day;
            event.acf[startconvert] = starttime;
            event.acf[endconvert] = endtime;
        });

    });
});

router.get('/menu', function(req, res, next){
    res.render('menu');
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
        obj: apiData
    };
    
    var now = new Date(),
        day1 = new Date('October 8, 2016 23:59:59');

    // show events day 1 if it's before day one, otherwise show events day 2
    if (now < day1) {
        var array = findObject(data, ['acf', 'date'], '08-10-2016');

        res.render('home', {
            apiData: array
        });

    } else {
        var array = findObject(data, ['acf', 'date'], '09-10-2016');

        res.render('home', {
            apiData: array
        });
    }

});

// get day 1
router.get('/day1', function (req, res, next) {
    var data = {
        obj: apiData
    };

   var array = findObject(data, ['acf', 'date'], '08-10-2016');

    res.render('home', {
        apiData: array
    });

});

// get day 2
router.get('/day2', function (req, res, next) {
    var data = {
        obj: apiData
    };

    var array = findObject(data, ['acf', 'date'], '09-10-2016');

    res.render('home', {
        apiData: array
    });
});

// get events page
router.get('/programpage', function (req, res, next) {
    var data = {
        obj: apiData
    };

    // sort by name
    var dataByName = data.obj.slice(0);
    dataByName.sort(function (a, b) {
        var x = a.slug.toLowerCase();
        var y = b.slug.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    res.render('programPage', {
        apiData: dataByName
    });
});

// get timetable page
router.get('/myroute', function (req, res, next) {
    res.render('myRoute');
});


router.get('/detail/:name', function (req, res, next) {
    var data = {
        obj: apiData
    };

    var item = findObject(data, ['slug'], req.params.name);
    
    console.log(item);

    res.render('detailEvents', {
        item: item
    });
});

router.get('/location', function (req, res, next) {

    res.render('locationList');
//router.get('/location', function(req, res, next){
//    var data = {
//        obj: obj
//    };
//
//    // sort by name
//    var dataByName = data.obj.slice(0);
//    dataByName.sort(function (a, b) {
//        var x = a.header.title.toLowerCase();
//        var y = b.header.title.toLowerCase();
//        return x < y ? -1 : x > y ? 1 : 0;
//    });
//    
//    res.render('locationList', {
//        obj: dataByName
//    });
});

router.get('/locationMapView', function(req, res, next){
    var data = {
        obj: obj
    };

    res.render('locationMapView', {
        obj: obj
    });
})

router.get('/location/:place', function (req, res, next) {
    var data = {
        obj: apiData
    };

    var locationArr = findObject(data, ['acf', 'venue', 'post_name'], req.params.place);

    res.render('locationDetail', {
        apiData: locationArr
    });
});

router.get('/about', function (req, res, next) {
    res.render('about');
});

module.exports = router;