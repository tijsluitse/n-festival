'use strict'

var launcher = (function() {

	var init = function() {
        featureDetect.storage();
        geolocation.currentPositionMarker();
		ux.menuSlide();
	}

	return {
		init: init
	};

})();

launcher.init();