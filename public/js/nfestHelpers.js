/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page with helper functions */

nfest.helpers = (function () {

    /* Launcher function */
    var helpersLauncher = function () {
        nfest.helpers.elementCount();
        nfest.helpers.addedToMyRoute();
    };

    /* Check if element has class, code by http://tinyurl.com/joh2t62 */
    var hasClass = function (element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    /* Prefix function for onclick events, code by http://tinyurl.com/goltxgp */
    var onclick = function (target, cb) {
        if (target.addEventListener) {
            target.addEventListener('click', cb, false);
        } else {
            target.attachEvent('onclick', cb);
        }
    }    

    /* XML HTTP request for retrieve data */
    var getData = function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = xhr.responseText;
                cb(response);
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }

    /* Counter for all elements in the Local Storage "My Route" array */
    var elementCount = function() {
        var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
            counter = document.getElementById('myRouteCounter');
            
        if (localStorage.getItem('myRouteEvents') === null || myRouteElements.length === 0) {
            counter.classList.add('hide');
        } else {
            counter.innerHTML = myRouteElements.length;
        }
    }

    /* Check if clicked element is allready in "My Route" Local Storage array, code by http://tinyurl.com/jangrdn */
    var addedToMyRoute = function() {
        if (document.querySelector('.detailPage > .eventInfo')) {            
            var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
                allEvents = document.querySelectorAll('.eventInfo');   

            /* Check function */
            function checkAvailability(arr, val) {                    
                return arr.some(function(arrVal) {
                    return val === arrVal;
                });
            } 

            /* Check if element is in array */
            if (checkAvailability(myRouteElements, allEvents[0].id)) { 
                var string = '#' + allEvents[0].id + '.buttonAddToRoute';                                    
                document.querySelector(string).classList.add('addedToRoute');   
            }             
        }  

        if (document.querySelector('body > section#homePage') || document.querySelector('section.curatorDetail') || document.querySelector('body.myTimetable') || document.querySelector('section.locationDetail')) {            
            var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
                allEvents = document.querySelectorAll('.eventObj');

            /* Check if there are items in My Route Local Storage array */
            if (myRouteElements == null) {
                for (a = 0; a < allEvents.length; a++) {
                    allEvents[a].classList.add('hide');
                }
            } 
            if (myRouteElements) {
                if (myRouteElements.length == 0) {
                    for (a = 0; a < allEvents.length; a++) {
                        allEvents[a].classList.add('hide');
                    }                   
                } else {
                    for (var i = 0; i < allEvents.length; i++) {
                        function checkAvailability(arr, val) {                    
                            return arr.some(function(arrVal) {
                                return val === arrVal;
                            });
                        } 

                        if (checkAvailability(myRouteElements, allEvents[i].id)) { 
                            var string = '#' + allEvents[i].id + ' .buttonAddToRoute';                   
                            document.querySelector(string).classList.add('addedToRoute');   
                        }
                    }
                }
            }                
        }
    }

    /* Check if Local Storage is supported, code by https://mathiasbynens.be/notes/localstorage-pattern */
    var storageCheck = function (cb) {
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

    /* Get all venue locations data with helper */
    var getVenueLocations = function (cb) {

        nfest.helpers.getData('https://nfest.lisaklein.nl/data', function (response) { 
            
            var data = JSON.parse(response),
                mapLocations = [];

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

/* Launcher */
nfest.helpers.helpersLauncher();
