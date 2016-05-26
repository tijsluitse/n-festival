var geolocation = (function(){

    var user = function() {

        // var output = document.getElementById('output');

        if (!navigator.geolocation){
            alert('Geolocation is not supported by your browser');
            return;
        }

        function success(position) {
            var userLatitude  = position.coords.latitude;
            var userLongitude = position.coords.longitude;
            var userCoordinates = [userLatitude, userLongitude];

            localStorage.setItem('userCoordinates', JSON.stringify(userCoordinates));
            var userLocation = JSON.parse(localStorage.getItem('userCoordinates'));

            console.log(userLocation);

            // output.innerHTML = '<p>Latitude is ' + userLatitude + ' & Longitude is ' + userLongitude + '</p>';
        };

        function error() {
            alert('Unable to retrieve your location');
        };

        // output.innerHTML = '<p>Locating…</p>';

        navigator.geolocation.getCurrentPosition(success, error);

        setTimeout(function(){
            geolocation.user();
            console.log('retrieving current location');
        }, 5000);

    }

    return {
        user
    }

})();
