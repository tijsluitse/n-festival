var filter = (function(){

//	var allEvents = document.querySelectorAll('.eventObj');

//	resetEvents.onclick = function() {
//		for (a = 0; a < allEvents.length; a++) {
//			allEvents[a].classList.remove('hide');
//		}
//	}

	var timeSelect = function() {

//		var currentEvents = document.getElementById('currentEvents');
//		var resetEvents = document.getElementById('resetEvents');

//		currentEvents.onclick = function() {
//			var today = new Date();
//			var time = today.getHours() + '.' + today.getMinutes();
//			time = "12:01";
//			var dd = today.getDate();
//			var mm = today.getMonth() + 1;
//			var yyyy = today.getFullYear();
//			if (dd < 10) {
//				dd = '0'+ dd;
//			};
//			if (mm < 10) {
//			    mm = '0' + mm;
//			}; 
//			today = mm + '-' + dd + '-' + yyyy;
//			today = "09-10-2016";
//
//			for(a = 0; a < allEvents.length; a ++) {				
//				var eventStartTime = allEvents[a].dataset.start;				
//				eventStartTime = eventStartTime.replace(":", ".");
//				var eventDateTime = allEvents[a].dataset.date;
//				if (today == eventDateTime && eventStartTime > time) {
//					allEvents[a].classList.remove('hide');
//				} else {
//					allEvents[a].classList.add('hide');
//				}
//			}
//
//		}
		
	};

	var formSubmit = function(data) {

		// Day selection
//		var dayOne = document.getElementById('dayOne');
//		var dayTwo = document.getElementById('dayTwo');

		// Time selection
//		var fromTime = document.getElementById('from');
//		var tillTime = document.getElementById('till');

		// Submit button
//		var filterSubmit = document.getElementById('filterButton');	

//		var daySelect = function() {
//			var days = document.querySelectorAll('.optionsDays');
//			for(a = 0; a < days.length; a++) {
//				if (days[a].checked == true){
//					var id = days[a].value;
//					for (i = 0; i < allEvents.length; i++) {
//				    	var date = allEvents[i].dataset.date;				    	
//				    	if (date == id) {
//				    		allEvents[i].classList.remove('hide');
//				    	}
//				    };
//				} else {
//					var id = days[a].value;					
//					for (i = 0; i < allEvents.length; i++) {
//				    	var date = allEvents[i].dataset.date;				    	
//				    	if (date == id) {
//				    		allEvents[i].classList.add('hide');
//				    	}
//				    };
//				}
//			} 
//		};

//		var themeSelect = function() {
//			var themes = document.querySelectorAll('.themeSelect');
//			for(a = 0; a < themes.length; a++) {
//				if (themes[a].checked == true){
//					var id = themes[a].id;
//					console.log(id);
//					for (i = 0; i < allEvents.length; i++) {
//				    	var theme = allEvents[i].dataset.theme;				    	
//				    	if (theme == id) {
//				    		allEvents[i].classList.remove('hide');
//				    	}
//				    };
//				} else {
//					var id = themes[a].id;					
//					for (i = 0; i < allEvents.length; i++) {
//				    	var theme = allEvents[i].dataset.theme;				    	
//				    	if (theme == id) {
//				    		allEvents[i].classList.add('hide');
//				    	}
//				    };
//				}
//			}
//		};

//		filterSubmit.onclick = function() {
//			// daySelect();			
//			themeSelect();
//		};

	};

//	timeSelect();
//	formSubmit();

	return {
		formSubmit: formSubmit
	};

})();