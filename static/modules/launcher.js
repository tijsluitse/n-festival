'use strict'

var launcher = (function() {

	var init = function() {
        featureDetect.storage();
		sections.init(); // Routes.js
	}

	return {
		init: init
	};

})();

launcher.init();