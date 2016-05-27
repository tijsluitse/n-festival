'use strict'

var launcher = (function() {

	var init = function() {
        featureDetect.storage();
        geolocation.user();
        geolocation.map();
	}

	return {
		init: init
	};

})();

launcher.init();