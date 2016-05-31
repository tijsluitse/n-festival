'use strict'

var launcher = (function() {

	var init = function() {
		ux.menuSlide();
        ux.detailPage();
        
        // waar gaan we dit neerzetten?
        document.getElementById('locationMap').classList.remove('hide');
        
        featureDetect.storage();
        geolocation.currentPositionMarker();

	}

	return {
		init: init
	};

})();

launcher.init();