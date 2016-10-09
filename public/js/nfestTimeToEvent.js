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
                endtime = event.dataset.end,
                teststart = '06/14/2016 11:00',
                testend = '06/14/2016 15:00';

            var begin = moment(starttime).format(),
                end = moment(endtime).format(),
                now = moment().format(),
                test1 = moment(teststart).format(),
                test2 = moment(testend).format();

            //        if(begin >= now && end <= now){
            //            console.log('waddup');
            //        }

            if (begin <= now && end >= now) {
                nowArr.push(event);
            }

            if (end <= now) {
                historyArr.push(event);
            }

            if (begin >= now) {
                comingArr.push(event);
            }



            //        var time = moment(testtime).fromNow();

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
            barTime.innerHTML = "Now";
        }

        //    Array.prototype.forEach.call(nowArr, function(e){
        //        e.classList.remove('hide');
        //        current.appendChild(e);
        //    });

        Array.prototype.forEach.call(historyArr, function (e) {
            e.classList.remove('hide');
            past.appendChild(e);
        });

        Array.prototype.forEach.call(comingArr, function (e) {
            e.classList.remove('hide');
            coming.appendChild(e);
        });

        //    past.innerHTML = historyArr.join(" ");
        //    current.innerHTML = nowArr.join(" ");

        //    console.log(nowArr);
        //    console.log(historyArr);
        //    console.log(comingArr);

        //    Array.prototype.forEach.call(nowArr, function(e){
        //        e.classList.remove('hide');
        //    });
        //    
        //    Array.prototype.forEach.call(historyArr, function(e){
        //        e.classList.remove('hide');
        //    });
        //    
        //    Array.prototype.forEach.call(comingArr, function(e){
        //        e.classList.remove('hide');
        //    });

        //    window.setInterval(function () {
        //        var time = moment().format();
        //
        //    console.log(time);
        //    }, 5000);

nfest.location.locationLauncher();


})();