var sections = (function() {

		var init = function() {
				
			window.location.hash = '#homePage';
			
			routie({
			    'homePage': function() {	
			    	geolocation.user();	
			    	sections.toggle(this.path);
			    },
			    'myTimetable': function() {
			    	sections.toggle(this.path);			    			    
			    },
			    'showEvents': function() {
			    	allEvents.getData();			
			    	sections.toggle(this.path);
			    	geolocation.map();
			    }
			});
		
		};

		var toggle = function(hashName) {

			var allSections = document.querySelectorAll('section');				
			var section = document.getElementById(hashName);
					
			for (var i = 0; i < allSections.length; i++) {
				allSections[i].classList.remove('active');
			};
				
			section.classList.toggle('active');

		};

	return {
		init,
		toggle
	}

})();
