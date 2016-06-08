var currentPositionMarker = function () {

    var userLocation = JSON.parse(localStorage.getItem('userCoordinates'));
    var userPosition = new google.maps.LatLng(userLocation[0], userLocation[1]);

};