var nfest = nfest || {};
'use strict';

/* Sorting data on time */

nfest.timeToEvent = (function () {
    var itemList = document.querySelectorAll('.eventObj');
    var nowArr = [],
        historyArr = [],
        filterdArr = [],
        comingArr = [];

    var sortTimeToEvent = function () {

        Array.prototype.forEach.call(itemList, function (event) {
            var eventsList = document.getElementById('eventsList');

            event.classList.add('hide');

            var starttime = event.dataset.start,
                endtime = event.dataset.end;

            var begin = moment(starttime).format(),
                end = moment(endtime).format(),
                now = moment().format();

            if (begin <= now && end >= now) {
                nowArr.push(event);
            }

            if (end <= now) {
                historyArr.push(event);
            }

            if (begin >= now) {
                comingArr.push(event);
            }

            eventsList.classList.add('hide');
            nfest.timeToEvent.pastEvents();
            nfest.timeToEvent.currentEvents();
            nfest.timeToEvent.comingEvents();
        });
    }

    var pastEvents = function () {
        var past = document.getElementById('pastEvents'),
            barTime = past.querySelector('.timeToEvent');

        barTime.classList.add('hide');

        // AFGELOPEN
        for (i = 0; i < historyArr.length; i++) {
            historyArr[i].classList.remove('hide');
            past.appendChild(historyArr[i]);

            var hide = nfest.helpers.hasClass(historyArr[i], 'filterHide');

            if (hide) {
                // do nothing
            } else {
                barTime.classList.remove('hide');
                barTime.innerHTML = 'AFGELOPEN';
            }
        }

    }

    var currentEvents = function () {
        var current = document.getElementById('currentEvents'),
            barTime = current.querySelector('.timeToEvent');

        barTime.classList.add('hide');

        // NOW 
        for (i = 0; i < nowArr.length; i++) {
            nowArr[i].classList.remove('hide');
            current.appendChild(nowArr[i]);

            var hide = nfest.helpers.hasClass(nowArr[i], 'filterHide');

            if (hide) {
                // do nothing
            } else {
                barTime.classList.remove('hide');
                current.classList.add('scrollNow');
                barTime.innerHTML = 'NOW';
            }

        }
    }

    // COMING
    var comingEvents = function () {
        var coming = document.getElementById('comingEvents'),
            prevTime = null,
            barTime = coming.querySelector('.timeToEvent');

        barTime.classList.add('hide');

        for (i = 0; i < comingArr.length; i++) {
            comingArr[i].classList.remove('hide');
            coming.appendChild(comingArr[i]);
        }

        var items = coming.querySelectorAll('.eventObj:not(.filterHide)');

        for (i = 0; i < items.length; i++) {
            var now = moment(),
                starttime = items[i].dataset.start,
                start = moment(starttime),
                time = moment(starttime).fromNow();

            // check if coming events are on this day, if so show the hours per event, if not show the time for all events
            if (now.startOf('day').isSame(start.startOf('day'))) {

                var barTimeEvent = items[i].querySelector('.timeToEvent');

                barTimeEvent.classList.remove('hide');
                barTimeEvent.innerHTML = time.toUpperCase();

                // Check if time is already in html (with some help from Leander)

                if (prevTime === time) {
                    barTimeEvent.classList.add('hide');
                }

                prevTime = time;

            } else {
                var hide = nfest.helpers.hasClass(items[i], 'filterHide');
                
                if (hide) {
                    // do nothing
                } else {
                    barTime.classList.remove('hide');
                    barTime.innerHTML = time.toUpperCase();
                }
            }
        }
    }

    return {
        sortTimeToEvent: sortTimeToEvent,
        pastEvents: pastEvents,
        currentEvents: currentEvents,
        comingEvents: comingEvents
    }

})();

nfest.timeToEvent.sortTimeToEvent();