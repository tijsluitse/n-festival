// var nfest=nfest||{};nfest.helpers=function(){var e=function(){nfest.helpers.elementCount(),nfest.helpers.addedToMyRoute()},t=function(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>-1},n=function(e,t){e.addEventListener?e.addEventListener("click",t,!1):e.attachEvent("onclick",t)},o=function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var e=n.responseText;t(e)}},n.open("GET",e,!0),n.send()},r=function(){var e=JSON.parse(localStorage.getItem("myRouteEvents")),t=document.getElementById("myRouteCounter");null===localStorage.getItem("myRouteEvents")||0===e.length?t.classList.add("hide"):t.innerHTML=e.length},l=function(){function e(e,t){return e.some(function(e){return t===e})}function e(e,t){return e.some(function(e){return t===e})}if(document.querySelector(".detailPage > .eventInfo")){var t=JSON.parse(localStorage.getItem("myRouteEvents")),n=document.querySelectorAll(".eventInfo");if(e(t,n[0].id)){var o="#"+n[0].id+".buttonAddToRoute";document.querySelector(o).classList.add("addedToRoute")}}if(document.querySelector("body > section#homePage")||document.querySelector("section.curatorDetail")||document.querySelector("body.myTimetable")||document.querySelector("section.locationDetail")){var t=JSON.parse(localStorage.getItem("myRouteEvents")),n=document.querySelectorAll(".eventObj");if(null==t)for(a=0;a<n.length;a++)n[a].classList.add("hide");if(t)if(0==t.length)for(a=0;a<n.length;a++)n[a].classList.add("hide");else for(var r=0;r<n.length;r++)if(e(t,n[r].id)){var o="#"+n[r].id+" .buttonAddToRoute";document.querySelector(o).classList.add("addedToRoute")}}},c=function(e){var t=function(){var e,t=new Date;try{return localStorage.setItem(t,t),e=localStorage.getItem(t)==t,localStorage.removeItem(t),e&&localStorage}catch(n){}}();e(t)},s=function(e){nfest.helpers.getData("https://nfest.lisaklein.nl/data",function(t){for(var n=JSON.parse(t),o=[],a=0;a<n.length;a++){var r=n[a].acf.location.lng,l=n[a].acf.location.lat,c=n[a].slug,s=n[a].title.rendered,u=n[a].acf.address;o.push({lng:r,lat:l,title:s,address:u,link:c}),o.length==n.length&&e(o,n)}})};return{helpersLauncher:e,hasClass:t,onclick:n,getData:o,elementCount:r,addedToMyRoute:l,storageCheck:c,getVenueLocations:s}}(),nfest.helpers.helpersLauncher();

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
        if (document.querySelector('.detailEventPage')) {                    	
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
        helpersLauncher: helpersLauncher,
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
