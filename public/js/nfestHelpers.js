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

        nfest.helpers.getData("data/data.json", function (response) {
            var data = JSON.parse(response),
                mapLocations = [],
                eventCoordinates = [];

            for (var a = 0; a < data.length; a++) {
                var location = data[a].info.location;
                var address = data[a].info.address
                getLatitudeLongitude(showResult, address, location, a);
            }

            function getLatitudeLongitude(callback, address, location, a) {
                address = address || 'Buiksloterweg 47B1, 1031CE Amsterdam';
                geocoder = new google.maps.Geocoder();

                if (geocoder) {
                    geocoder.geocode({
                        'address': address
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            callback(results[0], address, location, a);
                        }
                    });
                }
            };

            function showResult(result, address, location, a) {
                var locationLng = result.geometry.location.lng();
                var locationLat = result.geometry.location.lat();

                data[a].info.longtitude = locationLng;
                data[a].info.lattitude = locationLat;

                mapLocations.push({
                    lng: locationLng,
                    lat: locationLat,
                    title: location,
                    address: address
                });

                if (mapLocations.length == data.length) {
                    cb(mapLocations, data);
                };
            };
        });

    }

    return {
        hasClass: hasClass,
        onclick: onclick,
        getData: getData,
        storageCheck: storageCheck,
        getVenueLocations: getVenueLocations
    }

})();