var nfest = nfest || {};
'use strict';

nfest.timeToEvent = (function () {

    var sortTimeToEvent = function () {
        var itemList = document.querySelectorAll('.eventObj');
        var nowArr = [],
            historyArr = [],
            comingArr = [];

        Array.prototype.forEach.call(itemList, function (event) {
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

        });

        var past = document.getElementById('pastEvents'),
            current = document.getElementById('currentEvents'),
            coming = document.getElementById('comingEvents'),
            eventsList = document.getElementById('eventsList');

        eventsList.classList.add('hide');

        for (i = 0; i < nowArr.length; i++) {
            nowArr[i].classList.remove('hide');
            current.appendChild(nowArr[i]);

            var barTime = nowArr[0].querySelector('.timeToEvent');

            barTime.classList.remove('hide');
            barTime.innerHTML = 'NOW';
        }
        var prevTime = null;

        for (i = 0; i < historyArr.length; i++) {
            historyArr[i].classList.remove('hide');
            past.appendChild(historyArr[i]);

            var barTime = historyArr[0].querySelector('.timeToEvent');

            barTime.classList.remove('hide');
            barTime.innerHTML = 'AFGELOPEN';
        }

        for (i = 0; i < comingArr.length; i++) {
            var now = moment(),
                starttime = comingArr[i].dataset.start,
                start = moment(starttime),
                time = moment(starttime).fromNow();

            comingArr[i].classList.remove('hide');
            coming.appendChild(comingArr[i]);

            // check if coming events are on this day, if so show the hours per event, if not show the time for all events
            if (now.startOf('day').isSame(start.startOf('day'))) {
                var barTime = comingArr[i].querySelector('.timeToEvent');

                // Check if time is already in html (with some help from Leander)
                if (prevTime != time) {
                    barTime.classList.remove('hide');
                    barTime.innerHTML = time.toUpperCase();
                }
                
                prevTime = time;

            } else {
                var barTime = comingArr[0].querySelector('.timeToEvent');

                barTime.classList.remove('hide');
                barTime.innerHTML = time.toUpperCase();
            }
        }
    }

    return {
        sortTimeToEvent: sortTimeToEvent
    }

})();

nfest.timeToEvent.sortTimeToEvent();