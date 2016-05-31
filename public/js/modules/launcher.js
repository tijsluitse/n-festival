'use strict'

var launcher = (function() {

	var init = function() {
		document.getElementById('locationMap').classList.remove('hide');
        featureDetect.storage();
        geolocation.currentPositionMarker();
		ux.menuSlide();
	}

	return {
		init: init
	};

})();

launcher.init();