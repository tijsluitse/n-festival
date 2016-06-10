/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

nfest.location = (function () {

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
                            localStorage.setItem('userCoordinates', JSON.stringify(userCoordinates));
                        };

                        function error() {
                            alert('Unable to get your position.');
                            // we kunnen hier misschien de afstanden uitzetten? Hide op min fietsen enzo
                        };

                    } else {
                        var userCoordinates = JSON.parse(localStorage.getItem('userCoordinates'));
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
    
    return {
        getUserLocation: getUserLocation
    }

})();