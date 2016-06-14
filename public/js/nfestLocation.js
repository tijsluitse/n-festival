/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

nfest.location = (function () {

    var locationLauncher = function () {
        // document.getElementById('locationViewFilter').classList.remove('hide');
        nfest.location.getUserLocation();
        nfest.location.watchLocation();
        nfest.location.eventDistance();
    };

    var getUserLocation = function () {
        // check if geolocation is supported
        if (navigator.geolocation) {

            nfest.helpers.storageCheck(function (hasStorage) {
                if (hasStorage) {
                    if (localStorage.getItem("userCoordinates") === null) {
                        navigator.geolocation.getCurrentPosition(success, error);

                        function success(position) {
                            var userLatitude = position.coords.latitude;
                            var userLongitude = position.coords.longitude;
                            var userCoordinates = [userLatitude, userLongitude];
                            localStorage.setItem('userCoordinates', userCoordinates);
                        };

                        function error() {
                            alert('Unable to get your position.');
                            // we kunnen hier misschien de afstanden uitzetten? Hide op min fietsen enzo
                        };

                    } else {
                        navigator.geolocation.getCurrentPosition(success, error);

                        function success(position) {
                            var userLatitude = position.coords.latitude;
                            var userLongitude = position.coords.longitude;
                            var userCoordinates = [userLatitude, userLongitude];
                            localStorage.setItem('userCoordinates', userCoordinates);
                            var userCoordinates = localStorage.getItem('userCoordinates');
                            var userC = userCoordinates.split(",");
                            var userLat = parseFloat(userC[0]);
                            var userLng = parseFloat(userC[1]);
                            var userCoordinates = [userLat, userLng];
                        };

                        function error() {
                            alert('Unable to get your position.');
                            // we kunnen hier misschien de afstanden uitzetten? Hide op min fietsen enzo
                        };
                    }

                } else {
                    navigator.geolocation.getCurrentPosition(success, error);

                    function success(position) {
                        var userLatitude = position.coords.latitude;
                        var userLongitude = position.coords.longitude;
                        var userCoordinates = [userLatitude, userLongitude];
                    };

                    function error() {
                        alert('Unable to get your position.');
                        // we kunnen hier misschien de afstanden uitzetten? Hide op min fietsen enzo
                    };
                }
            });


        } else {
            alert('Geolocation is turned off or not supported, we cant calculate your location.');

            // we kunnen hier misschien de afstanden uitzetten? Hide op min fietsen enzo
        }
    }

    var watchLocation = function (map) {

        if (navigator.geolocation) {
            function success(position) {
                var userLatitude = position.coords.latitude;
                var userLongitude = position.coords.longitude;
                var userCoordinates = [userLatitude, userLongitude];
                localStorage.setItem('userCoordinates', userCoordinates);
            };

            function error() {
                alert('Unable to retrieve your location.');
            };

            var options = {
                enableHighAccuracy: true
            }

            navigator.geolocation.watchPosition(success, error, options);
        } else {
            console.log('Geolocation is turned off or not supported, we cant calculate your location.');
        }
    }

    var eventDistance = function (data) {

        nfest.helpers.getData("http://n-festival.werk.vanjim.nl/wp-json/wp/v2/venues", function (response) {
            var data = JSON.parse(response);
            calculateDist(data);
            setInterval(function () {
                calculateDist(data);
            }, 10000);
        });

        var calculateDist = function (data) {

            var userCoordinates = localStorage.getItem('userCoordinates'),
                userC = userCoordinates.split(","),
                eventList = document.querySelectorAll('.eventObj');
            userLat = parseFloat(userC[0]),
                userLng = parseFloat(userC[1]),
                allDistances = [];

            Array.prototype.forEach.call(eventList, function (event) {
                var location = event.dataset.location;

                for (var i = 0; i < data.length; i++) {
                    var id = data[i].slug;
                    var uLat = userLat;
                    var uLng = userLng;
                    var lat = data[i].acf.location.lat;
                    var lng = data[i].acf.location.lng;
                    if (location === id) {
                        distance(id, uLat, uLng, lat, lng, event);
                    }
                }

            });

            function distance(id, lat1, lon1, lat2, lon2, event) {
                var unit = "K";
                var radlat1 = Math.PI * lat1 / 180
                var radlat2 = Math.PI * lat2 / 180
                var theta = lon1 - lon2
                var radtheta = Math.PI * theta / 180
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                dist = Math.acos(dist)
                dist = dist * 180 / Math.PI
                dist = dist * 60 * 1.1515
                if (unit == "K") {
                    dist = dist * 1.609344
                }
                if (unit == "N") {
                    dist = dist * 0.8684
                }

                var result = dist.toFixed(2),
                    bikeTime = 4 * result,
                    string = '.bikeDist';
                bikeTime = bikeTime.toFixed(0);

                allDistances.push({
                    distance: result
                });

                event.querySelector(string).innerHTML = bikeTime + ' min';

            }
        }

    }

    return {
        locationLauncher: locationLauncher,
        getUserLocation: getUserLocation,
        watchLocation: watchLocation,
        eventDistance: eventDistance
    }

})();

nfest.location.locationLauncher();