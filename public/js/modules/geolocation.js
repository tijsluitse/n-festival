
var geolocation = (function() {

    var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

    var mapOptions = {
        mapTypeControlOptions: {
            mapTypeIds: ['Styled'],
        },
        zoom: 14,
        disableDefaultUI: true,
        scrollWheel: false, 
        mapTypeId: 'Styled'
    };
    
    var map = new google.maps.Map(document.getElementById("locationMap"), mapOptions);
    var styledMapType = new google.maps.StyledMapType(styles, {name: 'Styled'});
    map.mapTypes.set('Styled', styledMapType);

    var getUserPosition = function() {

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
            map.panTo({lat: userLatitude, lng: userLongitude});
        };

        function error() {
            alert('Unable to retrieve your location.');
            if (JSON.parse(localStorage.getItem('userCoordinates'))!== null) {

            } else {
                alert('Unable to retrieve your location.')
            }
        };

        navigator.geolocation.getCurrentPosition(success, error);

    };

    var watchPosition = function() {

        var marker = new google.maps.Marker({
            map: map,
            title: 'First Infowindow!'
        });

        var contentString = 
            '<div id="content">'+            
            '<p>' +
            location.address +
            '</p>' + 
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.setMap(map);

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
            marker.setPosition(new google.maps.LatLng(userLatitude, userLongitude));
        };

        function error() {
            alert('Unable to retrieve your location.');
            if (JSON.parse(localStorage.getItem('userCoordinates'))!== null) {

            } else {
                alert('Unable to retrieve your location.')
            }
        };

        var options = {
            enableHighAccuracy: true
        }

        navigator.geolocation.watchPosition(success, error, options);

    };

    var currentPositionMarker = function() {    

        var userLocation = JSON.parse(localStorage.getItem('userCoordinates'));
        var userPosition = new google.maps.LatLng(userLocation[0], userLocation[1]);

    };

    var locations = function(locationMarkers){        

        locationMarkers.forEach(function (location) {

            var marker = new google.maps.Marker({
                position: {lat: location.lat, lng: location.lng},
                map: map,
                title: 'First Infowindow!'
            });

            var contentString = 
                '<div id="content">'+            
                '<h1>' +
                location.title +
                '</h1>' +
                '<p>' +
                location.address +
                '</p>' +
                '<a href="#">' + 
                'Route beschrijving' + 
                '</a>' +
                '   |   ' + 
                '<a href="#">' + 
                'Bekijk evenementen' + 
                '</a>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
                map.setCenter(marker.getPosition());
            });

            marker.setMap(map);

        });

    };

    getUserPosition();
    watchPosition();

    return {
        getUserPosition: getUserPosition, 
        currentPositionMarker: currentPositionMarker,
        watchPosition: watchPosition,
        locations: locations
    }

})();
