/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

nfest.map = (function () {

    var mapLauncher = function () {
        var mapOptions = {
            mapTypeControlOptions: {
                mapTypeIds: ['Styled'],
            },
            zoom: 12,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            mapTypeId: 'Styled'
        };

        var map = new google.maps.Map(document.getElementById("locationMap"), mapOptions);

        nfest.map.jsActivate(map);
        nfest.map.mapStyle(map);
        nfest.map.getLocation(map); 
        nfest.map.watchLocation(map);               
        nfest.map.venueMarkers(map);
    }

    var jsActivate = function (map) {
        var locationMap = document.getElementById('locationMap');
        locationMap.classList.remove('hide');
    }

    var mapStyle = function (map) {
        var styles = [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e9e9e9"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }, {
                "lightness": 21
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dedede"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#333333"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f2f2f2"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]

        var styledMapType = new google.maps.StyledMapType(styles, {
            name: 'Styled'
        });
        map.mapTypes.set('Styled', styledMapType);
    }

    var getLocation = function (map) {
        // check if geolocation is supported
        if (navigator.geolocation) {

            nfest.helpers.storageCheck(function (hasStorage) {
                if (hasStorage) {
                    if (localStorage.getItem("userCoordinates") === null) {
                        navigator.geolocation.getCurrentPosition(success, error);                              

                        function success(position) {
                            var userLatitude = position.coords.latitude,
                                userLongitude = position.coords.longitude,
                                userCoordinates = [userLatitude, userLongitude];                
                            
                            localStorage.setItem('userCoordinates', userCoordinates);
                            
                            var userCoordinates = localStorage.getItem('userCoordinates'),
                                userC = userCoordinates.split(","),                            
                                userLat = parseFloat(userC[0]),
                                userLng = parseFloat(userC[1]);


                            nfest.map.setMarker(map, userLat, userLng);
                        };

                        function error() {
                            // set map on Amsterdam Noord
                            var latLng = new google.maps.LatLng(52.391286, 4.917583);
                            map.panTo(latLng);
                        };     

                    } else {                    
                        var userCoordinates = localStorage.getItem('userCoordinates'),
                            userC = userCoordinates.split(","),                            
                            userLat = parseFloat(userC[0]),
                            userLng = parseFloat(userC[1]);
          

                        var userPosition = new google.maps.LatLng(userLat, userLng);
                        nfest.map.setMarker(map, userLat, userLng);                                               
                    }

                } else {
                    navigator.geolocation.getCurrentPosition(success, error);                        

                    function success(position) {
                        var userLatitude = position.coords.latitude,
                            userLongitude = position.coords.longitude;

                        var userPosition = new google.maps.LatLng(userLat, userLng);
                        nfest.map.setMarker(map, userLatitude, userLongitude);
                    };

                    function error() {
         
                       // set map on Amsterdam Noord
                        var latLng = new google.maps.LatLng(52.391286, 4.917583);
                        map.panTo(latLng);
                    };

                }
            });


        } else {
            // set map on Amsterdam Noord
            var latLng = new google.maps.LatLng(52.391286, 4.917583);
            map.panTo(latLng);
        }
    }

    var setMarker = function (map, userLat, userLong) {
        var marker = new google.maps.Marker({
            map: map,
            icon: '/img/marker.png',
            optimized: false,
            title: 'First Infowindow!'
        });

        var contentString =
            '<div id="content">' +
            '<p>' +
            'Uw eigen locatie' +
            '</p>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        });

        marker.setMap(map);
        marker.setPosition(new google.maps.LatLng(userLat, userLong));
        map.setCenter(marker.getPosition());
    }

    var watchLocation = function(map) {

        if(navigator.geolocation) {
            function success(position) {
                
                var userLatitude = position.coords.latitude,
                    userLongitude = position.coords.longitude,
                    userCoordinates = [userLatitude, userLongitude];                
                
                localStorage.setItem('userCoordinates', userCoordinates);
                
                var userCoordinates = localStorage.getItem('userCoordinates'),
                    userC = userCoordinates.split(","),                           
                    userLat = parseFloat(userC[0]),
                    userLng = parseFloat(userC[1]);

                // map.panTo({
                //     lat: userLat,
                //     lng: userLng
                // });

                var marker = new google.maps.Marker({
                    map: map,
                    icon: '/img/marker.png',
                    optimized: false,
                    title: 'First Infowindow!'
                });

                var contentString =
                    '<div id="content">' +
                    '<p>' +
                    'Uw eigen locatie' +
                    '</p>' +
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                });                

                // nfest.map.setMarker(map, userLat, userLng);              

                marker.setMap(map);
                marker.setPosition(new google.maps.LatLng(userLat, userLng));
                // map.setCenter(marker.getPosition());

            };

            function error() {
                // alert('Unable to retrieve your location.');
            };

            var options = {
                enableHighAccuracy: true
            }

            navigator.geolocation.watchPosition(success, error, options);
        } else {
            console.log('Geolocation is turned off or not supported, we cant calculate your location.');
        }
    }

    var venueMarkers = function (map) {

        // nfest.helpers.getVenueLocations(function (mapLocations, data) {
        //     var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
        //         infowindow = new google.maps.InfoWindow();

        //         if (myRouteElements.length == 0) {
        //             console.log("No Items in array");
        //         } else { // items in local storage
        //             var items = document.querySelectorAll('.eventObj.myRouteEvents'); 


        //             for (var i = 0; i < items.length; i++) {
        //                 var location = items[i].dataset.location;
        //                 // console.log(location);
        //                 // console.log(mapLocations[i].link);
        //             }      

        //         }

        // });

        nfest.helpers.getVenueLocations(function (mapLocations, data) {
            var locationMarkers = mapLocations,
                infowindow = new google.maps.InfoWindow();

            locationMarkers.forEach(function (location) {

                var marker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(location.lat),
                        lng: parseFloat(location.lng)
                    },
                    map: map,
                    icon: '/img/location.png',
                    optimized: true,
                    title: 'First Infowindow!'
                });

                var locationLink = location.link;

                var link = '<a href="/location/' + locationLink + '" class="popupButton">';
                var routeLink = '<a href="https://maps.google.com?saddr=Current+Location&daddr=' + location.lat + ',' + location.lng + '" class="popupButton buttonRoute">';

                var contentString =
                    '<div id="content">' +
                    '<h1>' +
                    location.title +
                    '</h1>' +
                    '<p>' +
                    location.address +
                    '</p>' +
                    '<div class="popupButtons ">' +
                    routeLink +
                    'Route' +
                    '</a>' +
                    link +
                    'Evenementen' +
                    '</a>' +
                    '</div>' +
                    '</div>';

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                });

                marker.setMap(map);

            });
        });

    }

    return {
        mapLauncher: mapLauncher,
        jsActivate: jsActivate,
        mapStyle: mapStyle,    
        getLocation: getLocation,
        watchLocation: watchLocation,
        setMarker: setMarker,
        venueMarkers: venueMarkers
    }

})();

nfest.map.mapLauncher();