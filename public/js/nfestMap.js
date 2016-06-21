/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Google Maps functions */

nfest.map = (function () {

    /* Global variables */
    var mapOptions = {
        mapTypeControlOptions: {
            mapTypeIds: ['Styled'],
        },
        zoom: 12,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        disableDefaultUI: true,
        scaleControl: false,
        mapTypeId: 'Styled'
    };

    var map = new google.maps.Map(document.getElementById("locationMap"), mapOptions);

    /* Launcher function */
    var mapLauncher = function () {
        nfest.map.jsActivate(map);
        nfest.map.mapStyle(map);
        nfest.map.watchLocation(map);

        if (window.location.pathname == '/myroute') {
            /* Show only locations that are in "My Route" */
            nfest.map.venueMarkersMyRoute(map);
        } else {
            /* Show all location markers */
            nfest.map.venueMarkersAllLocations(map);
        }
    }

    /* Show map when user has Javascript */
    var jsActivate = function (map) {
        var locationMap = document.getElementById('locationMap');
        locationMap.classList.remove('hide');
    }

    /* Custom made map styles */
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

    /* Update marker when user changes position */
    var updatePosition = function (marker) {

        function success(position) {
            /* Get lat, lng from position */
            var lat = position.coords.latitude,
                lng = position.coords.longitude,
                coords = [lat, lng];

            /* Update the marker with new lat and lng */
            marker.setPosition(new google.maps.LatLng(lat, lng));
        };

        function error() {
            /* Error handling. Set map to Amsterdam Noord */
            var latLng = new google.maps.LatLng(52.391286, 4.917583); 
            map.panTo(latLng);
        };

        var options = {
            enableHighAccuracy: true
        }

        navigator.geolocation.watchPosition(success, error, options);
    }

    /* Watch location of user when user changes location */
    var watchLocation = function (map) {

        if (navigator.geolocation) {

            function success(position) {
                nfest.helpers.storageCheck(function (hasStorage) { // check is LS is supported
                    var userLat,
                        userLng;

                    var userLatitude = position.coords.latitude,
                        userLongitude = position.coords.longitude,
                        userCoordinates = [userLatitude, userLongitude];


                    if (hasStorage) {
                        localStorage.setItem('userCoordinates', userCoordinates);

                        var userCoordinates = localStorage.getItem('userCoordinates'),
                            userC = userCoordinates.split(",");

                        userLat = parseFloat(userC[0]);
                        userLng = parseFloat(userC[1]);
                    } else {
                        userLat = userLatitude;
                        userLng = userLongitude;
                    }

                    var image = {
                        url: '/img/marker.svg',
                        size: new google.maps.Size(36, 57),
                        scaledSize: new google.maps.Size(36, 57),
                        origin: new google.maps.Point(0, 0)
                    };

                    var marker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        optimized: false,
                        title: 'Eigen locatie marker'
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

                    marker.setPosition(new google.maps.LatLng(userLat, userLng));

                    map.setCenter({
                        lat: 52.391286,
                        lng: 4.917583
                    });
                    updatePosition(marker);
                });

            };

            function error() {
                /* Error handling. Set map to Amsterdam Noord */
                var latLng = new google.maps.LatLng(52.391286, 4.917583); 
                map.panTo(latLng);
            };

            var options = {
                enableHighAccuracy: true
            }

            navigator.geolocation.getCurrentPosition(success, error, options);

        } else {
            /* Error handling. Set map to Amsterdam Noord */
            var latLng = new google.maps.LatLng(52.391286, 4.917583); 
            map.panTo(latLng);
        }
    }

    /* Shows all locations that are in "My Route" elements */
    var venueMarkersMyRoute = function (map) {

        var all = document.querySelectorAll('.addedToRoute');

        Array.prototype.forEach.call(all, function (venue) {
            venue.addEventListener('click', function () {
                location.reload();
            });
        });

        /* Get data for all venues */
        nfest.helpers.getVenueLocations(function (mapLocations, data) {
            var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
                infoText = document.getElementById("infoText"),
                infowindow = new google.maps.InfoWindow();

            if (myRouteElements == null) {
                infoText.classList.remove('hide');
            }
            if (myRouteElements) {
                if (myRouteElements.length == 0) {
                    infoText.classList.remove('hide');
                } else {
                    var items = document.querySelectorAll('.eventObj.myRouteEvents');
                    Array.prototype.forEach.call(items, function (item) {
                        mapLocations.forEach(function (location) {
                            if (item.dataset.location == location.link) {

                                var image = {
                                    url: '/img/location43x68.png',
                                    size: new google.maps.Size(43, 68),
                                    scaledSize: new google.maps.Size(43, 68),
                                    origin: new google.maps.Point(0, 0)
                                };

                                var marker = new google.maps.Marker({
                                    position: {
                                        lat: parseFloat(location.lat),
                                        lng: parseFloat(location.lng)
                                    },
                                    map: map,
                                    icon: image,
                                    optimized: true,
                                    title: "First Infowindow!"
                                });

                                var locationLink = location.link;

                                var link = '<a href="/location/' + locationLink + '" class="popupButton">';
                                var routeLink = '<a href="https://maps.google.com?saddr=Current+Location&daddr=' + location.lat + ',' + location.lng + '" class="popupButton buttonRoute" target="blank">';

                                var contentString =
                                    '<div id="content">' +
                                    '<h1>' + location.title + '</h1>' +
                                    '<p>' + location.address + '</p>' +
                                    '<div class="popupButtons ">' +
                                    routeLink + 'Route' + '</a>' + link + 'Evenementen' + '</a>' +
                                    '</div>' +
                                    '</div>';

                                google.maps.event.addListener(marker, 'click', function () {
                                    infowindow.setContent(contentString);
                                    infowindow.open(map, marker);
                                });

                                marker.setMap(map);
                            }
                        });
                    });
                }
            }

        });
    }

    /* Show all venue locations on map */
    var venueMarkersAllLocations = function (map) {
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

                var locationLink = location.link,
                    link = '<a href="/location/' + locationLink + '" class="popupButton">',
                    routeLink = '<a href="https://maps.google.com?saddr=Current+Location&daddr=' + location.lat + ',' + location.lng + '" class="popupButton buttonRoute">';

                var contentString =
                    '<div id="content">' +
                    '<h1>' + location.title + '</h1>' +
                    '<p>' + location.address + '</p>' +
                    '<div class="popupButtons ">' +
                    routeLink + 'Route' + '</a>' + link + 'Evenementen' + '</a>' +
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
        updatePosition: updatePosition,
        watchLocation: watchLocation,
        venueMarkersMyRoute: venueMarkersMyRoute,
        venueMarkersAllLocations: venueMarkersAllLocations
    }

})();

/* Launcher */
nfest.map.mapLauncher();