/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for UX usable on most of the pages */

nfest.ux = (function () {

    /* Launcher function */
    var uxLauncher = function () {
        nfest.ux.backButton();
        nfest.ux.resetJs();
    };

    /* If user has Javascript reset HTML elements */
    var resetJs = function () {
        var myRouteButton = document.querySelector('.topHeader .myRoute'),
            allDistances = document.querySelectorAll('.eventDistance'),
            allAddToRouteButtons = document.querySelectorAll('.addToRouteMail'),
            locationsFilter = document.getElementById('filterHolder');

        if (myRouteButton) {
            myRouteButton.classList.remove('hidden');
        }
        if (locationsFilter) {
            locationsFilter.classList.remove('hide');
        }

        Array.prototype.forEach.call(allDistances, function (distance) {
            distance.classList.remove('hidden');
        });

        Array.prototype.forEach.call(allAddToRouteButtons, function (button) {
            button.removeAttribute('href');
        });

    };

    /* Dynamic back button for whole application duration */
    var backButton = function () {
        var eventUrl = window.location.pathname,
            eventUrl = eventUrl.split('/'),
            page = eventUrl[1],
            detailPage = eventUrl[2];

        if (window.location.pathname == '/' + page + '/' + detailPage || window.location.pathname == '/myroute') {
            document.querySelector('.menuIcon').classList.add('hide');
            var backButton = document.querySelector('.backButton');
            backButton.classList.remove('hide');
            backButton.onclick = function () {
                window.history.back();
            }
        }
        if (window.location.pathname == '/') {
            document.querySelector('.menuIcon').classList.add('hide');
        }
    };

    return {
        uxLauncher: uxLauncher,
        resetJs: resetJs,
        backButton: backButton
    }

})();

/* Launcher */
nfest.ux.uxLauncher();