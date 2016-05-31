'use strict'

var launcher = (function() {

	var init = function() {
        featureDetect.storage();
        geolocation.currentPositionMarker();
		ux.menuSlide();
        ux.detailPage();
	}

	return {
		init: init
	};

})();

launcher.init();