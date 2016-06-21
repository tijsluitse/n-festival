/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for the discover function */

nfest.discover = (function () {

    /* Global variables */
    var discoverEvents = document.querySelectorAll('.eventDiscover'),
        discoverButton = document.getElementById('discoverBttn');

    /* Launcher function */
    var discoverLauncher = function () {
        nfest.discover.showRandomEvent();
        nfest.discover.mouseTouchEvents();
    }

    /* Hide all elements and then show random element */
    var showRandomEvent = function () {
        Array.prototype.forEach.call(discoverEvents, function (event) {
            event.classList.add('hide');
        });

        var item = discoverEvents[Math.floor(Math.random() * discoverEvents.length)];

        item.classList.remove('hide');
    }

    /* Interval function for showing single random event when button is released */
    var mouseTouchEvents = function () {
        var int = null;

        /* Mouse events when used on desktop */
        discoverButton.onmousedown = function () {
            int = setInterval(function () {
                var discoverEvents = document.querySelectorAll('.eventDiscover');

                Array.prototype.forEach.call(discoverEvents, function (event) {
                    event.classList.add('hide');
                });

                var item = discoverEvents[Math.floor(Math.random() * discoverEvents.length)];

                item.classList.remove('hide');

            }, 50);
        }

        /* Clear interval on mouse up/leave */
        discoverButton.onmouseup = function () {
            clearInterval(int);
            int = null;
        };

        /* Clear interval on mouse up/leave */
        discoverButton.onmouseleave = function () {
            clearInterval(int);
            int = null;
        };

        /* Touch events when used on phone */
        discoverButton.ontouchstart = function () {
            int = setInterval(function () {
                var discoverEvents = document.querySelectorAll('.eventDiscover');

                Array.prototype.forEach.call(discoverEvents, function (event) {
                    event.classList.add('hide');
                });

                var item = discoverEvents[Math.floor(Math.random() * discoverEvents.length)];

                item.classList.remove('hide');

            }, 50);
        }

        /* Clear interval on touch end */
        discoverButton.ontouchend = function () {
            clearInterval(int);
            int = null;
        };
    }

    return{
        discoverLauncher: discoverLauncher,
        showRandomEvent: showRandomEvent,
        mouseTouchEvents: mouseTouchEvents
    }


})();

/* Launcher */
nfest.discover.discoverLauncher();