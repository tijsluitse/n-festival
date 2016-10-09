var nfest = nfest || {};
'use strict';

nfest.timeToEvent = (function () {


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

    for (i = 0; i < historyArr.length; i++) {
        historyArr[i].classList.remove('hide');
        past.appendChild(historyArr[i]);

        var barTime = historyArr[0].querySelector('.timeToEvent');

        barTime.classList.remove('hide');
        barTime.innerHTML = 'AFGELOPEN';
    }

    Array.prototype.forEach.call(comingArr, function (e) {
        e.classList.remove('hide');
        coming.appendChild(e);

        var starttime = e.dataset.start;
        var time = moment(starttime).fromNow();

        var barTime = e.querySelector('.timeToEvent');
        barTime.classList.remove('hide');
        
        barTime.innerHTML = time.toUpperCase();
    });


})();