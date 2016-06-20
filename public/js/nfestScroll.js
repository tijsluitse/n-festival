/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Introduction functions */

nfest.scrollToNext = (function() { // Code inspired by Rover van Nispen

    var currentYPosition = function() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    };

    var elmYPosition = function(eID) {
        var elm = document.getElementById(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    };
    
    // Code in a function to create an isolate scope
    var smoothScroll = function (eID) {
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    };

    var introEnd = function () {
        var introPage = document.querySelector('.introPage');   

        if (!localStorage.getItem('introPage')) {
            introPage.classList.remove('hide');
            introPage.addEventListener('animationend', function(){
                introPage.classList.add('hide');
            });
            setTimeout(function() {
                nfest.scrollToNext.smoothScroll('menu');
            }, 2500);
            localStorage.setItem('introPage', 'true');
        } else {
            introPage.classList.add('hide');
        } 
    };

    var toCurrentEvents = function() {
        var currentEvents = document.getElementById('currentEvents'),
            hasEvents = nfest.helpers.hasClass(currentEvents, 'scrollNow');
        if (hasEvents) {
            nfest.scrollToNext.smoothScroll('pastEvents');
        }
    }

    return {
        smoothScroll: smoothScroll,
        currentYPosition: currentYPosition,
        elmYPosition: elmYPosition,
        introEnd: introEnd,
        toCurrentEvents: toCurrentEvents 
    }

}());

if(window.location.pathname == '/') {
    nfest.scrollToNext.introEnd();
}

if(window.location.pathname == '/day1' || window.location.pathname == '/day2' || window.location.pathname == '/program') {
    nfest.scrollToNext.toCurrentEvents();
}