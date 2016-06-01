var filter = (function(){

	var byDay = function(data) {

		var daySelection = document.getElementById('selectDay');

		daySelection.onchange = function () {	
		    
		    var selected = this.options[this.selectedIndex].value;    

		    if (selected == "bothDays") {
		   		document.getElementById('08-10-2016').classList.remove('hide');
		   		document.getElementById('09-10-2016').classList.remove('hide');
			} 

			if (selected == "dayOne") {
				document.getElementById('09-10-2016').classList.add('hide');
			} 

			if (selected == "dayTwo") {
				document.getElementById('08-10-2016').classList.add('hide');
			};
		    
		};		

	};

	return {
		byDay: byDay
	};

})();