/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page with helper functions */

nfest.helpers = (function () {

    // from: http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
    var hasClass = function (element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    var onclick = function (target, cb) {
        if (target.addEventListener) {
            target.addEventListener('click', cb, false);
        } else {
            target.attachEvent('onclick', cb);
        }
    }    

    var getData = function (url, cb) {

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {

                var response = xhr.responseText;
                cb(response);

            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }

    var elementCount = function() {
        var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
            counter = document.getElementById('myRouteCounter');
            
        if (localStorage.getItem("myRouteEvents") === null) {
            counter.classList.add('hide');
        } else {
            counter.innerHTML = myRouteElements.length;
        }
    }

    var addedToMyRoute = function() {
        if (document.querySelector('.detailPage > .eventInfo')) {            
            var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
                allEvents = document.querySelectorAll('.eventInfo');   

            function checkAvailability(arr, val) {                    
                return arr.some(function(arrVal) {
                    return val === arrVal;
                });
            } 

            if (checkAvailability(myRouteElements, allEvents[0].id)) { 
                var string = '#' + allEvents[0].id + '.buttonAddToRoute';                                    
                document.querySelector(string).classList.add('addedToRoute');   
            }             
        }  

        if (document.querySelector('body > section#homePage') || document.querySelector('section.curatorDetail') || document.querySelector('body.myTimetable') || document.querySelector('section.locationDetail')) {            
            var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
                allEvents = document.querySelectorAll('.eventObj');            
            
            for (var i = 0; i < allEvents.length; i++) {
                function checkAvailability(arr, val) {                    
                    return arr.some(function(arrVal) {
                        return val === arrVal;
                    });
                } 

                if (checkAvailability(myRouteElements, allEvents[i].id)) { 
                    var string = '#' + allEvents[i].id + ' .buttonAddToRoute';      
                    console.log(string);              
                    document.querySelector(string).classList.add('addedToRoute');   
                }
            }        
        }
    }

    var storageCheck = function (cb) {
        // Feature detect + local reference bron: https://mathiasbynens.be/notes/localstorage-pattern
        var hasStorage = (function () {
            var uid = new Date;
            var result;
            try {
                localStorage.setItem(uid, uid);
                result = localStorage.getItem(uid) == uid;
                localStorage.removeItem(uid);
                return result && localStorage;
            } catch (exception) {}
        }());

        cb(hasStorage);
    }

    var getVenueLocations = function (cb) {

        nfest.helpers.getData("https://nfest.lisaklein.nl/data", function (response) {
            
            var data = JSON.parse(response),
                mapLocations = [];

            localStorage.setItem('allEventsData', JSON.stringify(data));

            for (var a = 0; a < data.length; a++) {
                var locationLng = data[a].acf.location.lng,
                    locationLat = data[a].acf.location.lat,
                    link = data[a].slug,
                    title = data[a].title.rendered,
                    address = data[a].acf.address;
                
                mapLocations.push({
                    lng: locationLng,
                    lat: locationLat,
                    title: title,
                    address: address,
                    link: link
                });
                
                 if (mapLocations.length == data.length) {
                    cb(mapLocations, data);
                };
            }
        });
    }

    return {
        hasClass: hasClass,
        onclick: onclick,
        getData: getData,
        elementCount: elementCount,
        addedToMyRoute: addedToMyRoute,
        storageCheck: storageCheck,
        getVenueLocations: getVenueLocations
    }

})();

nfest.helpers.elementCount();
nfest.helpers.addedToMyRoute();
