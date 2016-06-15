var nfest = nfest || {};
'use strict'; 

nfest.myRoute = (function() {	

	var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
		allElements = document.querySelectorAll(".eventObj"),
		infoText = document.getElementById("infoText"),
		body = document.querySelector('body'),
		myTimetableList = document.getElementById('myTimetableList');
		body.classList.add('myTimetable');

	if (myRouteElements.length == 0) {
        infoText.classList.remove('hide');
    } else {
        infoText.classList.add('hide');
    }

	var showElements = function() {
		myTimetableList.classList.remove('hide');
		for (a = 0; a < allElements.length; a++) {
			allElements[a].classList.add('hide');
		}
		for (i = 0; i < myRouteElements.length; i++) {	
			document.getElementById(myRouteElements[i]).classList.remove('hide');
			document.getElementById(myRouteElements[i]).classList.add('myRouteEvents');
		}
	}

	return {
		showElements: showElements
	}

})();

nfest.myRoute.showElements();