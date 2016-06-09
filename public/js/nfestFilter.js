/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for filters usable on the homepage */

nfest.filter = (function () {

    
    var filterDayButtons = function () {
        if (window.location.pathname == "/day1") {
            document.getElementById("dayTwoFilter").classList.remove("filterActive");
            console.log('day1')
        } else if (window.location.pathname == "/day2") {
            document.getElementById("dayOneFilter").classList.remove("filterActive");
            console.log('day2')
        } else {
            document.getElementById("dayTwoFilter").classList.remove("filterActive");
        }
    };
    var filterThemeButtons = function () {
        var innovationButton = document.getElementById("innovationFilter");
        innovationButton.onclick = function() {
            innovationButton.classList.toggle("filterDisable");
        }
        var musicButton = document.getElementById("musicFilter");
        musicButton.onclick = function() {
            musicButton.classList.toggle("filterDisable");
        }
        var foodButton = document.getElementById("foodFilter");
        foodButton.onclick = function() {
            foodButton.classList.toggle("filterDisable");
        }
    }

    return {
        filterDayButtons: filterDayButtons,
        filterThemeButtons: filterThemeButtons
    }

})();

nfest.filter.filterDayButtons();
nfest.filter.filterThemeButtons();