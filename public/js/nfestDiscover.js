var nfest = nfest || {};
'use strict';

nfest.discover = (function () {
    var discoverEvents = document.querySelectorAll('.eventDiscover'),
        discoverButton = document.getElementById('discoverBttn');

    var discoverLauncher = function () {
        nfest.discover.showRandomEvent();
        nfest.discover.mouseTouchEvents();
    }

    var showRandomEvent = function () {
        Array.prototype.forEach.call(discoverEvents, function (event) {
            event.classList.add('hide');
        });

        var item = discoverEvents[Math.floor(Math.random() * discoverEvents.length)];

        item.classList.remove('hide');
    }

    var mouseTouchEvents = function () {
        var int = null;

        //mouse events when used on desktop
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

        discoverButton.onmouseup = function () {
            clearInterval(int);
            int = null;
        };

        discoverButton.onmouseleave = function () {
            clearInterval(int);
            int = null;
        };

        // touch events when used on phone
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

nfest.discover.discoverLauncher();