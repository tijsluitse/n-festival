var currentPositionMarker = function () {

    var userLocation = JSON.parse(localStorage.getItem('userCoordinates'));
    var userPosition = new google.maps.LatLng(userLocation[0], userLocation[1]);

};


uit watchPosition:

marker.setPosition(new google.maps.LatLng(userLatitude, userLongitude));
map.setCenter(marker.getPosition());


//		var themeSelect = function() {
//			var themes = document.querySelectorAll('.themeSelect');
//			for(a = 0; a < themes.length; a++) {
//				if (themes[a].checked == true){
//					var id = themes[a].id;
//					console.log(id);
//					for (i = 0; i < allEvents.length; i++) {
//				    	var theme = allEvents[i].dataset.theme;				    	
//				    	if (theme == id) {
//				    		allEvents[i].classList.remove('hide');
//				    	}
//				    };
//				} else {
//					var id = themes[a].id;					
//					for (i = 0; i < allEvents.length; i++) {
//				    	var theme = allEvents[i].dataset.theme;				    	
//				    	if (theme == id) {
//				    		allEvents[i].classList.add('hide');
//				    	}
//				    };
//				}
//			}
//		};



var distance = (function(data){

	var userToLocation = function(data) {

			var userLocation = JSON.parse(localStorage.getItem('userCoordinates'));
			var allDistances = [];

			for (var i = 0; i < data.length; i++) {
				var id = data[i].info.datatype;
				var uLat = userLocation[0];
				var uLng = userLocation[1];
				var lat = data[i].info.lattitude;
				var lng = data[i].info.longtitude;
				var unit = "K";
				distance(id, uLat, uLng, lat, lng, unit, i);
			};

			function distance(id, lat1, lon1, lat2, lon2, unit, i) {
				var radlat1 = Math.PI * lat1/180
				var radlat2 = Math.PI * lat2/180
				var theta = lon1-lon2
				var radtheta = Math.PI * theta/180
				var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
				dist = Math.acos(dist)
				dist = dist * 180/Math.PI
				dist = dist * 60 * 1.1515
				if (unit == "K") {dist = dist * 1.609344}
				if (unit == "N") {dist = dist * 0.8684}
				
				var result = dist.toFixed(2);
				data[i].info.distance = result; 

				var bikeTime = 4 * result;
				bikeTime = bikeTime.toFixed(0);							

				var eventDistId = 'eventDist' + id;
				document.getElementById(eventDistId).innerHTML = result + ' km';

				var bikeDistId = 'bikeDist' + id;
				document.getElementById(bikeDistId).innerHTML = bikeTime + 'min ';
				
				allDistances.push({
					distance: result
			    });		

				if (data.length == allDistances.length) {
					localStorage.setItem('allEventsData', JSON.stringify(data));	
				};	
			};

		setInterval(function() {

			var userLocation = JSON.parse(localStorage.getItem('userCoordinates'));
			var allDistances = [];

			for (var i = 0; i < data.length; i++) {
				var id = data[i].info.datatype;
				var uLat = userLocation[0];
				var uLng = userLocation[1];
				var lat = data[i].info.lattitude;
				var lng = data[i].info.longtitude;
				var unit = "K";
				distance(id, uLat, uLng, lat, lng, unit, i);
			};

			function distance(id, lat1, lon1, lat2, lon2, unit, i) {
				var radlat1 = Math.PI * lat1/180
				var radlat2 = Math.PI * lat2/180
				var theta = lon1-lon2
				var radtheta = Math.PI * theta/180
				var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
				dist = Math.acos(dist)
				dist = dist * 180/Math.PI
				dist = dist * 60 * 1.1515
				if (unit == "K") {dist = dist * 1.609344}
				if (unit == "N") {dist = dist * 0.8684}
				
				var result = dist.toFixed(2);
				data[i].info.distance = result; 


				var bikeTime = 4 * result;
				bikeTime = bikeTime.toFixed(0);							

				var eventDistId = 'eventDist' + id;
				document.getElementById(eventDistId).innerHTML = result + ' km';

				var bikeDistId = 'bikeDist' + id;
				document.getElementById(bikeDistId).innerHTML = bikeTime + 'min ';
				
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
