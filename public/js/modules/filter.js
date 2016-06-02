var filter = (function(){

	var byDay = function(data) {

		var daySelection = document.getElementById('selectDay');
		var dates = document.querySelectorAll('.date');	

		daySelection.onchange = function () {	
		    
		    var selected = this.options[this.selectedIndex].value;    

		    for (i =0; i < dates.length; i++) {
		    	var specificDate = dates[i].dataset.date;	
		    	if (selected == "bothDays") {
		    		// dates[i].classList.add('show');
		    	}
	    		if (selected == specificDate) {
	    			dates[i].classList.remove('hide');
	    		} else {
	    			dates[i].classList.add('hide');
	    		}
		    };
		    
		};		

	};

	return {
		byDay: byDay
	};

})();