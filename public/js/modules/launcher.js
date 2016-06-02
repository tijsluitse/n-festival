'use strict'

var launcher = (function() {

	var init = function() {		
		ux.menuSlide();
		ux.filterSlide();
        ux.launcher();
        featureDetect.storage();
        geolocation.currentPositionMarker();
	}

	return {
		init: init
	};

})();

launcher.init();