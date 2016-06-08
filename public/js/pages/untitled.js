var currentPositionMarker = function () {

    var userLocation = JSON.parse(localStorage.getItem('userCoordinates'));
    var userPosition = new google.maps.LatLng(userLocation[0], userLocation[1]);

};






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