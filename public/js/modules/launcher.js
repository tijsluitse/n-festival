'use strict'

var launcher = (function() {

	var init = function() {
        featureDetect.storage();
        geolocation.currentPositionMarker();
	}

	return {
		init: init
	};

})();

launcher.init();