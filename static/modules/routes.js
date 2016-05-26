var sections = (function() {

		var init = function() {

			window.location.hash = '#homePage';
			
			routie({
			    'homePage': function() {	
			    	sections.toggle(this.path);
			    },
			    'myTimetable': function() {
			    	sections.toggle(this.path);			    			    
			    },
			    'showEvents': function() {
			    	allEvents.getData();
			    	sections.toggle(this.path);
			    }
			});
		
		};

		var toggle = function(hashName) {
			
			var section = document.getElementById(hashName);
			var allSections = document.querySelectorAll('section');
					
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
