/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for filters usable on the homepage */

nfest.filter = (function () {

    var filterLauncher = function () {
        nfest.filter.filterDayButtons();
        nfest.filter.filterThemeButtons();
        nfest.filter.filterTheme();
    }

    var filterTheme = function () {
        var innovationButton = document.getElementById("innovationFilter"),
            musicButton = document.getElementById("musicFilter"),
            foodButton = document.getElementById("foodFilter"),
            eventList = document.querySelectorAll('.eventObj');

        nfest.helpers.onclick(innovationButton, function () {
            var themeSelected = 'Innovation';

            if (nfest.helpers.hasClass(innovationButton, 'filterDisable')) {

                for (i = 0; i < eventList.length; i++) {
                    var theme = eventList[i].dataset.theme;

                    if (themeSelected === theme) {
                        eventList[i].classList.add('hide');
                    }
                };
            } else {
                for (i = 0; i < eventList.length; i++) {
                    var theme = eventList[i].dataset.theme;

                    if (themeSelected === theme) {
                        eventList[i].classList.remove('hide');
                    }
                };
            }
        });

        nfest.helpers.onclick(musicButton, function () {
            var themeSelected = 'Music';

            if (nfest.helpers.hasClass(musicButton, 'filterDisable')) {
                for (i = 0; i < eventList.length; i++) {
                    var theme = eventList[i].dataset.theme;

                    if (themeSelected === theme) {
                        eventList[i].classList.add('hide');
                    }
                };
            } else {
                for (i = 0; i < eventList.length; i++) {
                    var theme = eventList[i].dataset.theme;

                    if (themeSelected === theme) {
                        eventList[i].classList.remove('hide');
                    }
                };
            }
        });

        nfest.helpers.onclick(foodButton, function () {
            var themeSelected = 'Food';

            if (nfest.helpers.hasClass(foodButton, 'filterDisable')) {
                for (i = 0; i < eventList.length; i++) {
                    var theme = eventList[i].dataset.theme;

                    if (themeSelected === theme) {
                        eventList[i].classList.add('hide');
                    }
                };
            } else {
                for (i = 0; i < eventList.length; i++) {
                    var theme = eventList[i].dataset.theme;

                    if (themeSelected === theme) {
                        eventList[i].classList.remove('hide');
                    }
                };
            }
        });
    }

    var filterDayButtons = function () {
        if (window.location.pathname == "/day1") {
            document.getElementById("dayTwoFilter").classList.remove("filterActive");
        } else if (window.location.pathname == "/day2") {
            document.getElementById("dayOneFilter").classList.remove("filterActive");
        } else {
            document.getElementById("dayTwoFilter").classList.remove("filterActive");
        }
    };

    var filterThemeButtons = function () {
        var innovationButton = document.getElementById("innovationFilter");
        innovationButton.onclick = function () {
            innovationButton.classList.toggle("filterDisable");
        }
        var musicButton = document.getElementById("musicFilter");
        musicButton.onclick = function () {
            musicButton.classList.toggle("filterDisable");
        }
        var foodButton = document.getElementById("foodFilter");
        foodButton.onclick = function () {
            foodButton.classList.toggle("filterDisable");
        }
    }

    return {
        filterLauncher: filterLauncher,
        filterTheme: filterTheme,
        filterDayButtons: filterDayButtons,
        filterThemeButtons: filterThemeButtons
    }

})();

nfest.filter.filterLauncher();