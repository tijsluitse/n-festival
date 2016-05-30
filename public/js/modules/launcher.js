'use strict'

var launcher = (function() {

	var init = function() {
		ux.menuSlide();
        featureDetect.storage();
        geolocation.user();
        geolocation.map();
		sections.init(); // Routes.js

	}

	return {
		init: init
	};

})();

launcher.init();