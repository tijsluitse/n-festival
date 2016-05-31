'use strict'

var launcher = (function() {

	var init = function() {
		document.getElementById('locationMap').classList.remove('hide');
		ux.menuSlide();
        featureDetect.storage();
        geolocation.currentPositionMarker();
		
	}

	return {
		init: init
	};

})();

launcher.init();