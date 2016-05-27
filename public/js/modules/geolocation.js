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

        // setTimeout(function(){
        //     geolocation.user();
        //     console.log('retrieving current location');
        // }, 5000);

    };

    var map = function() {

        var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

        var userLocation = JSON.parse(localStorage.getItem('userCoordinates'));
        var userPosition = new google.maps.LatLng(userLocation[0], userLocation[1]);

        var mapOptions = {
            mapTypeControlOptions: {
                mapTypeIds: ['Styled'],
            },
            zoom: 14,
            center: userPosition,
            disableDefaultUI: true,
            scrollWheel: false, 
            mapTypeId: 'Styled'
        }
        
        var map = new google.maps.Map(document.getElementById("locationMap"), mapOptions);
        var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
        map.mapTypes.set('Styled', styledMapType);

        var contentString = 
            '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: userPosition,
            map: map,
            title: 'First Infowindow!'
        });
        
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        map.addListener('center_changed', function() {
            window.setTimeout(function() {
                map.panTo(marker.getPosition());
            }, 3000);
        });

        marker.setMap(map);

    };

    return {
        user: user, 
        map: map
    }

})();
