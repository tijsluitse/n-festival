var nfest = nfest || {};
'use strict';

nfest.discover = (function () {

    var discoverEvents = document.querySelectorAll('.eventDiscover'),
        discoverButton = document.getElementById('discoverBttn');


    Array.prototype.forEach.call(discoverEvents, function (event) {
        event.classList.add('hide');
    });
    
    var flash = setInterval(function () {
            var discoverEvents = document.querySelectorAll('.eventDiscover');

            Array.prototype.forEach.call(discoverEvents, function (event) {
                event.classList.add('hide');
            });

            var item = discoverEvents[Math.floor(Math.random() * discoverEvents.length)];

            item.classList.remove('hide');


        }, 100);


    if (discoverButton.addEventListener) {
        discoverButton.addEventListener('mousedown', flashEvents);
    } else {
        discoverButton.attachEvent('onmousedown', flashEvents);
    }

    function flashEvents() {

        flash();
    }
    
    
     if (discoverButton.addEventListener) {
        discoverButton.addEventListener('mouseup', stopFlash);
    } else {
        discoverButton.attachEvent('onmouseup', stopFlash);
    }
    
    function stopFlash (){
        clearInterval(flash);
    }








})();