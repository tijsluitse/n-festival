var express = require('express'),
    router = express.Router(),
    http = require('http');

var apiData,
    categories,
    venueData,
    tags,
    curators,
    news,
    firstItems;

var getAllData = function () {
    // data requests
    // news data
    http.get({
        host: 'n-festival.werk.vanjim.nl',
        path: '/wp-json/wp/v2/posts?per_page=100'
    }, function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            news = JSON.parse(body);
            firstItems = [];
            firstItems.push(news[0], news[1], news[2]);
        });
    });

    // venue data
    http.get({
        host: 'n-festival.werk.vanjim.nl',
        path: '/wp-json/wp/v2/venues?per_page=100'
    }, function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            venueData = JSON.parse(body);
        });
    });

    // theme data
    http.get({
        host: 'n-festival.werk.vanjim.nl',
        path: '/wp-json/wp/v2/categories?per_page=100'
    }, function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            categories = JSON.parse(body);
        });
    });

    // tags data 
    http.get({
        host: 'n-festival.werk.vanjim.nl',
        path: '/wp-json/wp/v2/tags?per_page=100'
    }, function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            tags = JSON.parse(body);
        });
    });

    // curator data 
    http.get({
        host: 'n-festival.werk.vanjim.nl',
        path: '/wp-json/wp/v2/curators?per_page=100'
    }, function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            curators = JSON.parse(body);
        });
    });

    // event data
    http.get({
        host: 'n-festival.werk.vanjim.nl',
        path: '/wp-json/wp/v2/events?per_page=100'
    }, function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            apiData = JSON.parse(body);

            apiData.forEach(function (event) {
                // edit start / end times
                var startArray = event.acf.start_time.split(' '),
                    endArray = event.acf.end_time.split(' ');

                var day = startArray[0],
                    starttime = startArray[1],
                    endtime = endArray[1];

                var date = 'date',
                    startconvert = 'starttime_converted',
                    endconvert = 'endtime_converted',
                    convertedDateStart = 'startDate_converted',
                    convertedDateEnd = 'endDate_converted';

                var dayStart = event.acf.start_time.split('-'),
                    dayEnd = event.acf.end_time.split('-');

                var dds = dayStart[0],
                    mms = dayStart[1],
                    yys = dayStart[2];

                var dde = dayEnd[0],
                    mme = dayEnd[1],
                    yye = dayEnd[2];

                var dateTimeS = mms + '/' + dds + '/' + yys,
                    dayTimeE = mme + '/' + dde + '/' + yye;

                event.acf[date] = day;
                event.acf[startconvert] = starttime;
                event.acf[endconvert] = endtime;
                event[convertedDateStart] = dateTimeS;
                event[convertedDateEnd] = dayTimeE;

                // add address
                var venueName = event.acf.venue.post_name;

                for (var i = 0; i < venueData.length; i++) {
                    var venueSlug = venueData[i].slug,
                        venueAddress = venueData[i].acf.address,
                        address = 'post_address';

                    if (venueName === venueSlug) {
                        event.acf.venue[address] = venueAddress;
                    }
                }

                // add category names to events
                event.categories.forEach(function (category) {
                    for (var i = 0; i < categories.length; i++) {
                        var id = categories[i].id,
                            name = categories[i].name,
                            categoryName = 'categoryName';

                        if (id === category) {
                            event[categoryName] = name;
                        }
                    }
                });


                // add curator photo to data
                if (event.acf.curator) {
                    event.acf.curator.forEach(function (curator) {
                        var curId = curator.ID,
                            curatorPhoto = 'curator_photo';

                        for (var i = 0; i < curators.length; i++) {

                            if (curators[i].acf.avatar) {
                                var id = curators[i].id,
                                    photo = curators[i].acf.avatar.sizes.thumbnail;

                                if (id === curId) {
                                    curator[curatorPhoto] = photo;
                                }
                            }
                        }
                    });
                }

            });

            // sort data on starttime
            apiData.sort(function (a, b) {
                return new Date(a.startDate_converted).getTime() - new Date(b.startDate_converted).getTime()
            });
        });
    });

}

// interval bij real gebruik (voor demo snelle interval zodat je snel je events kan zien)
var interval = 1000 * 60 * 10;

getAllData();

// set interval zodat data steeds wordt ingeladen en je events kan toevoegen.
setInterval(getAllData, 5000);

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
    res.render('menu', {
        firstItems: firstItems
    });
});

router.get('/data', function (req, res, next) {
    res.json(venueData);
});

router.get('/discover', function (req, res, next) {    
    res.render('discover', {
        apiData: apiData
    });
});

router.get('/program', function (req, res, next) {
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
        res.redirect('/day2');
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

// get timetable page
router.get('/myroute', function (req, res, next) {
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

    res.render('myRoute', {
        apiData: dataByName
    });
});

router.get('/detail/:name', function (req, res, next) {
    var data = {
        obj: apiData
    };

    var item = findObject(data, ['slug'], req.params.name);

    // sort by name
    var dataByName = data.obj.slice(0);
    dataByName.sort(function (a, b) {
        var x = a.slug.toLowerCase();
        var y = b.slug.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    res.render('detailEvents', {
        item: item,
        allItems: dataByName
    });
});

router.get('/location', function (req, res, next) {
    var data = {
        obj: venueData
    };

    var dataByName = data.obj.slice(0);
    dataByName.sort(function (a, b) {
        var x = a.slug.toLowerCase();
        var y = b.slug.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    res.render('locationList', {
        venueData: dataByName
    });
});

router.get('/locationMapView', function (req, res, next) {
    res.render('locationMapView');
})

router.get('/location/:place', function (req, res, next) {
    var data = {
        obj: apiData
    };

    var venues = {
        obj: venueData
    }

    var venueDetail = findObject(venues, ['slug'], req.params.place);

    var locationArr = findObject(data, ['acf', 'venue', 'post_name'], req.params.place);

    res.render('locationDetail', {
        apiData: locationArr,
        venueDetail: venueDetail
    });
});

router.get('/curator', function (req, res, next) {
    var data = {
        obj: curators
    };

    var dataByName = data.obj.slice(0);
    dataByName.sort(function (a, b) {
        var x = a.slug.toLowerCase();
        var y = b.slug.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    res.render('curatorList', {
        curators: dataByName
    });
});

router.get('/curator/:name', function (req, res, next) {
    var data = {
        obj: apiData
    };

    var curatorsdata = {
        obj: curators
    };

    function getCuratorList(data, objectToLookFor) {
        var obj = data.obj,
            x;

        var eventArray = [];

        obj.forEach(function (item) {
            if (item.acf.curator) {
                item.acf.curator.forEach(function (curator) {
                    x = curator.post_name;

                    if (x == objectToLookFor) {
                        eventArray.push(item);
                    }
                });
            }
        });

        return eventArray;
    };

    var curatorDetail = findObject(curatorsdata, ['slug'], req.params.name);

    var curatorArr = getCuratorList(data, req.params.name);

    res.render('curatorDetail', {
        apiData: curatorArr,
        curatorDetail: curatorDetail
    });
});

router.get('/about', function (req, res, next) {
    res.render('about');
});


module.exports = router;