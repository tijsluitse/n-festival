var nfest = nfest || {};
'use strict';

nfest.myRoute = (function () {
    var dayOneArr = [],
        dayTwoArr = [];

    var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
        allElements = document.querySelectorAll(".eventObj"),
        infoText = document.getElementById("infoText"),
        body = document.querySelector('body'),
        myTimetableList = document.getElementById('myTimetableList');
    body.classList.add('myTimetable');

    if (myRouteElements.length == 0) {
        infoText.classList.remove('hide');
    } else {
        infoText.classList.add('hide');
    }

    var showElements = function () {
        myTimetableList.classList.remove('hide');
        for (a = 0; a < allElements.length; a++) {
            allElements[a].classList.add('hide');
        }
        for (i = 0; i < myRouteElements.length; i++) {
            document.getElementById(myRouteElements[i]).classList.remove('hide');
            document.getElementById(myRouteElements[i]).classList.add('myRouteEvents');
        }
    }

    var whichDay = function () {
        var itemList = document.querySelectorAll(".eventObj:not(.hide)");
        var timeTableList = document.getElementById('myTimetableList');

        Array.prototype.forEach.call(itemList, function (event) {
            var onDay = event.dataset.start,
                day = moment(onDay).format('MM/DD/YY'),
                d1 = new Date('10-08-2016'),
                day1 = moment(d1).format('MM/DD/YY'),
                d2 = new Date('10-09-2016'),
                day2 = moment(d2).format('MM/DD/YY');

            if (day === day1) {
                dayOneArr.push(event);
            }
            if (day === day2) {
                dayTwoArr.push(event);
            }

            timeTableList.classList.add('hide');
            nfest.myRoute.dayOne();
            nfest.myRoute.dayTwo();

        });

    }

    var dayOne = function () {
        var listDayOne = document.getElementById('eventsDay1'),
            barTime = listDayOne.querySelector('.timeToEvent');

        barTime.classList.add('hide');
        
        for (i = 0; i < dayOneArr.length; i++) {
            listDayOne.appendChild(dayOneArr[i]);

            barTime.classList.remove('hide');
            barTime.innerHTML = 'DAY 1';
        }
    }

    var dayTwo = function () {
        var listDayTwo = document.getElementById('eventsDay2'),
            barTime = listDayTwo.querySelector('.timeToEvent');

        barTime.classList.add('hide');

        for (i = 0; i < dayTwoArr.length; i++) {
            listDayTwo.appendChild(dayTwoArr[i]);

            barTime.classList.remove('hide');
            barTime.innerHTML = 'DAY 2';
        }

    }

    return {
        showElements: showElements,
        whichDay: whichDay,
        dayOne: dayOne,
        dayTwo: dayTwo
    }

})();

nfest.myRoute.showElements();
nfest.myRoute.whichDay();