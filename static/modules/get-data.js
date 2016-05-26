var allEvents = (function(){

	var getData = function(){

		aja()
		  	.url('data/data.json')
		  	.method('GET') 	
		  	.type('json')
		  	.on('success', function(data){		 
		  		console.log(data);
				localStorage.setItem('allEventsData', JSON.stringify(data));
				var allEvents = localStorage.getItem('allEventsData');
		  	})
		.go();

	}

	return {
		getData
	}

})();