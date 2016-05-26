'use strict'

var launcher = (function() {

	var init = function() {
        allEvents.getData(); // get-data.js
		sections.init(); // Routes.js
	}

	return {
		init: init
	};

})();

launcher.init();