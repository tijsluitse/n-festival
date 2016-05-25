var allEvents = (function(){

	var getData = function(){

		aja()
		  	.url('data/data.json')
		  	.method('GET') 	
		  	.type('json')
		  	.on('success', function(data){		 
		  		console.log(data);				
		  	})
		.go();

	}

	return {
		getData
	}

})();