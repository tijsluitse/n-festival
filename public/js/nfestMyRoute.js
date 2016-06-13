var nfest = nfest || {};
'use strict'; 

nfest.myRoute = (function() {	

	var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
		allElements = document.querySelectorAll(".eventObj");

	var showElements = function() {
		for (a = 0; a < allElements.length; a++) {
			allElements[a].classList.add('hide');
		}

		for (i = 0; i < myRouteElements.length; i++) {	
			document.getElementById(myRouteElements[i]).classList.remove('hide');
		}
	}

	return {
		showElements: showElements
	}

})();

nfest.myRoute.showElements();