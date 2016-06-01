var geocoder = (function(){

	var getCoordinates = function(data){

		var eventLocations = [];
		var mapLocations = [];

		for (var a = 0; a < data.length; a++) {  
            eventLocations.push(data[a].info.address); 
            var location = data[a].info.location;
            getLatitudeLongitude(showResult, eventLocations[a], location, a);
        }

        var eventCoordinates = [];

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
		    	localStorage.setItem('mapLocations', JSON.stringify(mapLocations)); 
		    	localStorage.setItem('allEventsData', JSON.stringify(data)); 	
		    	geolocation.locations(mapLocations);
		    	distance.userToLocation(data);
		    }; 		  
		};

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

	}

	return {
		getCoordinates: getCoordinates
	}

})();