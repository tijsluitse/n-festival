var distance = (function(data){

	var userToLocation = function(data) {

		setInterval(function() {

			var userLocation = JSON.parse(localStorage.getItem('userCoordinates'));
			var allDistances = [];

			for (var i = 0; i < data.length; i++) {
				var uLat = userLocation[0];
				var uLng = userLocation[1];
				var lat = data[i].info.lattitude;
				var lng = data[i].info.longtitude;
				var unit = "K";
				distance(uLat, uLng, lat, lng, unit, i);
			};

			function distance(lat1, lon1, lat2, lon2, unit, i) {
				var radlat1 = Math.PI * lat1/180
				var radlat2 = Math.PI * lat2/180
				var theta = lon1-lon2
				var radtheta = Math.PI * theta/180
				var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
				dist = Math.acos(dist)
				dist = dist * 180/Math.PI
				dist = dist * 60 * 1.1515
				if (unit=="K") {dist = dist * 1.609344}
				if (unit=="N") {dist = dist * 0.8684}
				
				var result = dist.toFixed(2);
				data[i].info.distance = result; 
				var eventDistId = 'eventDist' + i;
				document.getElementById(eventDistId).innerHTML = result + 'km';
				
				allDistances.push({
					distance: result
			    });		

				if (data.length == allDistances.length) {
					localStorage.setItem('allEventsData', JSON.stringify(data));	
				};	
			};

		}, 10000);		
		
	};
		
	return {
		userToLocation: userToLocation
	}

})();
