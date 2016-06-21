// var nfest=nfest||{};nfest.scrollToNext=function(){var o=function(){"/"==window.location.pathname&&(localStorage.getItem("introPage")&&(window.location="/#menu"),localStorage.getItem("introPage")||nfest.scrollToNext.introEnd()),"/day1"!=window.location.pathname&&"/day2"!=window.location.pathname&&"/program"!=window.location.pathname||nfest.scrollToNext.toCurrentEvents()},t=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(o){for(var t=document.getElementById(o),e=t.offsetTop,n=t;n.offsetParent&&n.offsetParent!=document.body;)n=n.offsetParent,e+=n.offsetTop;return e},n=function(o){var n=t(),r=e(o),l=r>n?r-n:n-r;if(100>l)return void scrollTo(0,r);var s=Math.round(l/100),s=20,c=Math.round(l/25),a=r>n?n+c:n-c,i=0;if(r>n)for(var u=n;r>u;u+=c)setTimeout("window.scrollTo(0, "+a+")",i*s),a+=c,a>r&&(a=r),i++;else for(var u=n;u>r;u-=c)setTimeout("window.scrollTo(0, "+a+")",i*s),a-=c,r>a&&(a=r),i++},r=function(){var o=document.querySelector(".introPage");localStorage.getItem("introPage")||(o.classList.remove("hide"),o.addEventListener("animationend",function(){setTimeout(function(){o.classList.add("hide"),localStorage.setItem("introPage","true")},1e3)}),setTimeout(function(){nfest.scrollToNext.smoothScroll("menu")},4e3))},l=function(){var o=document.getElementById("currentEvents"),t=nfest.helpers.hasClass(o,"scrollNow");t&&nfest.scrollToNext.smoothScroll("pastEvents")};return{scrollLauncher:o,smoothScroll:n,currentYPosition:t,elmYPosition:e,introEnd:r,toCurrentEvents:l}}(),nfest.scrollToNext.scrollLauncher();

/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Introduction functions */

nfest.scrollToNext = (function () {

    /* Launcher function */
    var scrollLauncher = function () {
        if (window.location.pathname == '/') {
            /* If its not the first time go to #menu */
            if (localStorage.getItem('introPage')) {
                window.location = '/#menu';
            }
            /* If its the first time show introduction animation */
            if (!localStorage.getItem('introPage')) {
                nfest.scrollToNext.introEnd();
            }
        }
        /* Scroll to current events on events pages */
        if (window.location.pathname == '/day1' || window.location.pathname == '/day2' || window.location.pathname == '/program') {
            nfest.scrollToNext.toCurrentEvents();
        }
    };

    /* Get current Y position in window, code by Rover van Nispen */
    var currentYPosition = function () {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    };

    /* Get element Y position in window, code by Rover van Nispen */
    var elmYPosition = function (eID) {
        var elm = document.getElementById(eID),
            y = elm.offsetTop,
            node = elm;

        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }

        return y;
    };

    /* Code in a function to create an isolate scope */
    var smoothScroll = function (eID) {
        var startY = currentYPosition(),
            stopY = elmYPosition(eID),
            distance = stopY > startY ? stopY - startY : startY - stopY;

        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }

        var speed = Math.round(distance / 100),
            speed = 20,
            step = Math.round(distance / 25),
            leapY = stopY > startY ? startY + step : startY - step,
            timer = 0;

        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        }

        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
    };

    /* If user lands for the first time, show introduction animation */
    var introEnd = function () {
        var introPage = document.querySelector('.introPage');

        if (!localStorage.getItem('introPage')) {
            introPage.classList.remove('hide');
            introPage.addEventListener('animationend', function () {
                setTimeout(function () {
                    introPage.classList.add('hide');
                    localStorage.setItem('introPage', 'true');
                }, 1000);
            });
            setTimeout(function () {  
            	introPage.style.opacity = '0';            
                introPage.classList.add('hide');
                localStorage.setItem('introPage', 'true');
            }, 3500);
            setTimeout(function () {
                nfest.scrollToNext.smoothScroll('menu');
            }, 4000);
        }
        // introPage.onclick = function() {
        //     	alert("hoi");
        //         introPage.classList.add('hide');
        //         introPage.style.opacity = '0';
        //     }
    };

    /* When the festival is in progress, scroll to current events */
    var toCurrentEvents = function () {
        var currentEvents = document.getElementById('currentEvents'),
            hasEvents = nfest.helpers.hasClass(currentEvents, 'scrollNow');
        if (hasEvents) {
            nfest.scrollToNext.smoothScroll('pastEvents');
        }
    }

    return {
        scrollLauncher: scrollLauncher,
        smoothScroll: smoothScroll,
        currentYPosition: currentYPosition,
        elmYPosition: elmYPosition,
        introEnd: introEnd,
        toCurrentEvents: toCurrentEvents
    }

}());

/* Launcher */
nfest.scrollToNext.scrollLauncher();