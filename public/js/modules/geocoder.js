var geocoder = (function(){

	var getCoordinates = function(data){

		var eventLocations = [];
		var mapLocations = [];

		for (var a = 0; a < data.length; a++) {  
            eventLocations.push(data[a].info.address); 
            var location = data[a].info.location;
            getLatitudeLongitude(showResult, eventLocations[a], location);
        }

        var eventCoordinates = [];

		function showResult(result, address, location) {
		    var locationLng = result.geometry.location.lng();
		    var locationLat = result.geometry.location.lat();			    	
		    mapLocations.push({
		    	lng: locationLng,
				lat: locationLat,
				title: location,
				address: address
		    });		   	
		    console.log("hoi");
		    geolocation.locations(mapLocations);	 
		};

		function getLatitudeLongitude(callback, address, location) {		  
		    address = address || 'Buiksloterweg 47B1, 1031CE Amsterdam'; // Default address		   
		    geocoder = new google.maps.Geocoder();		    
		    if (geocoder) {
		        geocoder.geocode({
		            'address': address
		        }, function (results, status) {
		            if (status == google.maps.GeocoderStatus.OK) {		
		                callback(results[0], address, location);
		            }
		        });
		    }
		};

	}

	return {
		getCoordinates: getCoordinates
	}

})();