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
            disableDefaultUI: true,
            scaleControl: false,
            mapTypeId: 'Styled'
        };

        var map = new google.maps.Map(document.getElementById("locationMap"), mapOptions);

        nfest.map.jsActivate(map);
        nfest.map.mapStyle(map);    
        nfest.map.watchLocation(map);               
        nfest.map.venueMarkers(map);
        nfest.map.removeVenueMarker(map);
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

    // var getLocation = function (map) {
        
    //     if (navigator.geolocation) { // check if geolocation is supported
            
    //         nfest.helpers.storageCheck(function (hasStorage) { // check is LS is supported
                
    //             if (hasStorage) { // LS supported
                    
    //                 if (localStorage.getItem("userCoordinates") === null) { // LS userCoordinates are empty
                        
    //                     navigator.geolocation.getCurrentPosition(success, error);                              

    //                     function success(position) {
    //                         var userLatitude = position.coords.latitude,
    //                             userLongitude = position.coords.longitude,
    //                             userCoordinates = [userLatitude, userLongitude];                
                            
    //                         localStorage.setItem('userCoordinates', userCoordinates);
                            
    //                         var userCoordinates = localStorage.getItem('userCoordinates'),
    //                             userC = userCoordinates.split(","),                            
    //                             userLat = parseFloat(userC[0]),
    //                             userLng = parseFloat(userC[1]);                           
    //                     };

    //                     function error() {
    //                         console.log('Unable to get your position.');                            
    //                         var latLng = new google.maps.LatLng(52.391286, 4.917583); // set map on Amsterdam Noord            
    //                         map.panTo(latLng);
    //                     };     

    //                 } else { // get userCoordinates from LS                    
    //                     var userCoordinates = localStorage.getItem('userCoordinates'),
    //                         userC = userCoordinates.split(","),                            
    //                         userLat = parseFloat(userC[0]),
    //                         userLng = parseFloat(userC[1]),
    //                         userPosition = new google.maps.LatLng(userLat, userLng);                                                                                
    //                 }

    //             } else { // no LS support
    //                 navigator.geolocation.getCurrentPosition(success, error);                        

    //                 function success(position) {
    //                     var userLatitude = position.coords.latitude,
    //                         userLongitude = position.coords.longitude,
    //                         userPosition = new google.maps.LatLng(userLat, userLng);
    //                 };
    
    //                 function error() {
    //                     console.log('Unable to get your position.');                        
    //                     var latLng = new google.maps.LatLng(52.391286, 4.917583); // set map on Amsterdam Noord                    
    //                     map.panTo(latLng);
    //                 };
    //             }
    //         });
    //     } else { // no geolocation support
    //         console.log('Geolocation is turned off or not supported, we cant calculate your location.');            
    //         var latLng = new google.maps.LatLng(52.391286, 4.917583); // set map on Amsterdam Noord
    //         map.panTo(latLng);
    //     }
    // }

    var updatePosition = function(marker) {

        function success(position) {

            // Get lat, lng from position
            var lat = position.coords.latitude,
                lng = position.coords.longitude,
                coords = [lat, lng];                

            // Update the marker with new lat and lng        
            marker.setPosition(new google.maps.LatLng(lat, lng));               
        };

        function error() {
            console.log('Unable to retrieve your location.');
            var latLng = new google.maps.LatLng(52.391286, 4.917583); // set map on Amsterdam Noord
            map.panTo(latLng);
        };

        var options = {
            enableHighAccuracy: true
        }

        navigator.geolocation.watchPosition(success, error, options);
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

                marker.setPosition(new google.maps.LatLng(userLat, userLng));
                map.setCenter(marker.getPosition());
                updatePosition(marker);

            };

            function error() {
                console.log('Unable to retrieve your location.');
                var latLng = new google.maps.LatLng(52.391286, 4.917583); // set map on Amsterdam Noord
                map.panTo(latLng);
            };

            var options = {
                enableHighAccuracy: true
            }

            navigator.geolocation.getCurrentPosition(success, error, options);

        } else {
            console.log('Geolocation is turned off or not supported, we cant calculate your location.');
        }
    }

    var venueMarkers = function (map) {

        var all = document.querySelectorAll('.addedToRoute');      
        
        Array.prototype.forEach.call(all, function (venue) {
            venue.addEventListener('click', function(){                
                location.reload();
            });
        });
        

        nfest.helpers.getVenueLocations(function (mapLocations, data) {
            var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
                infowindow = new google.maps.InfoWindow();

                if (myRouteElements.length == 0) {
                    // no items in array
                } else {
                    var items = document.querySelectorAll('.eventObj.myRouteEvents');                                      
                    items.forEach(function(item){                    
                        mapLocations.forEach(function(location){
                            if (item.dataset.location == location.link) {
                                var marker = new google.maps.Marker({
                                    position: {
                                        lat: parseFloat(location.lat),
                                        lng: parseFloat(location.lng)
                                    },
                                    map: map,
                                    animation: google.maps.Animation.DROP,
                                    icon: "/img/location.png",
                                    optimized: true,
                                    title: "First Infowindow!"
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
                            }
                        });
                    });    

                }

        });

        // nfest.helpers.getVenueLocations(function (mapLocations, data) {
        //     var locationMarkers = mapLocations,
        //         infowindow = new google.maps.InfoWindow();

        //     locationMarkers.forEach(function (location) {

                // var marker = new google.maps.Marker({
                //     position: {
                //         lat: parseFloat(location.lat),
                //         lng: parseFloat(location.lng)
                //     },
                //     map: map,
                //     icon: '/img/location.png',
                //     optimized: true,
                //     title: 'First Infowindow!'
                // });

                // var locationLink = location.link;

                // var link = '<a href="/location/' + locationLink + '" class="popupButton">';
                // var routeLink = '<a href="https://maps.google.com?saddr=Current+Location&daddr=' + location.lat + ',' + location.lng + '" class="popupButton buttonRoute">';

                // var contentString =
                //     '<div id="content">' +
                //     '<h1>' +
                //     location.title +
                //     '</h1>' +
                //     '<p>' +
                //     location.address +
                //     '</p>' +
                //     '<div class="popupButtons ">' +
                //     routeLink +
                //     'Route' +
                //     '</a>' +
                //     link +
                //     'Evenementen' +
                //     '</a>' +
                //     '</div>' +
                //     '</div>';

                // google.maps.event.addListener(marker, 'click', function () {
                //     infowindow.setContent(contentString);
                //     infowindow.open(map, marker);
                // });

                // marker.setMap(map);

        //     });
        // });

    }

    var removeVenueMarker = function (map) {
        // var remove = document.querySelectorAll(".addedToRoute");

        // for (var i = remove.length - 1; i >= 0; i--) {
        //     remove[i].onclick = function (evt) {
        //         nfest.map.venueMarkers();
        //     }
        // }
    }

    return {
        mapLauncher: mapLauncher,
        jsActivate: jsActivate,
        mapStyle: mapStyle,            
        updatePosition: updatePosition,
        watchLocation: watchLocation,    
        venueMarkers: venueMarkers,
        removeVenueMarker: removeVenueMarker
    }

})();

nfest.map.mapLauncher();