'use strict'

var launcher = (function() {

	var init = function() {
        featureDetect.storage();
        geolocation.currentPositionMarker();
        ux.launcher();
	}

	return {
		init: init
	};

})();

launcher.init();