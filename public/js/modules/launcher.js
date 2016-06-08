'use strict'

var launcher = (function() {

	var init = function() {
//		ux.menuSlide();
        featureDetect.launcher();
//        ux.launcher();
	}

	return {
		init: init
	};

})();

launcher.init();