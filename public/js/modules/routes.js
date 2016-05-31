var sections = (function() {

		var init = function() {
			routie({
                '*': function(){
                    sections.toggle(window.location.hash);
                },
			    'homePage': function() {
			    	sections.toggle(window.location.hash);
			    },
			    'myTimetable': function() {
			    	sections.toggle(window.location.hash);
			    },
			    'showEvents': function() {
			    	sections.toggle(window.location.hash);
			    }
			});

		};

		var toggle = function(hashName) {
			var allSections = document.querySelectorAll('.toggleSection');

			for (var i = 0; i < allSections.length; i++) {
				allSections[i].classList.add('inactive');

                if (!hashName) {
                    allSections[0].classList.remove('inactive');

                } else {
                    document.querySelector(hashName).classList.remove('inactive');
                }
			}
		};

	return {
		init: init,
		toggle: toggle
	}

})();
