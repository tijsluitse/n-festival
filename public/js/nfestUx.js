/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for UX usable on most of the pages */

nfest.ux = (function () {

    var uxLauncher = function () {
        // directly launch ux modules for every page
        // nfest.ux.menuSlide();
        nfest.ux.introEnd();
        nfest.ux.backButton();
        nfest.ux.scrollToNow();
        nfest.ux.resetJs();
    };

    var resetJs = function () {
        var myRouteButton = document.querySelector('.topHeader .myRoute'),
            allDistances = document.querySelectorAll('.eventDistance'),
            allAddToRouteButtons = document.querySelectorAll('.addToRouteMail'),
            locationsFilter = document.getElementById('filterHolder');

        if (myRouteButton) {
            myRouteButton.classList.remove('hidden');
        }
        if (locationsFilter) {
            locationsFilter.classList.remove('hide');
        }

        Array.prototype.forEach.call(allDistances, function (distance) {
            distance.classList.remove('hidden');
        });

        Array.prototype.forEach.call(allAddToRouteButtons, function (button) {
            button.removeAttribute('href');
        });

    };

    var introEnd = function () {
        var introPage = document.querySelector(".introPage");   

        if (!localStorage.getItem("introPage")) {
            introPage.classList.remove("hide");
            introPage.addEventListener("animationend", function(){
                introPage.classList.add("hide");
            });
            localStorage.setItem("introPage", "true");
        } else {
            introPage.classList.add("hide");
        } 
    };

    // var menuSlide = function () {
    //     var menu = document.getElementById('menu'),
    //         menuButton = document.getElementById('menuButton');

    //     menu.classList.add('hide');
    //     menu.classList.add('menuSlide');

    //     nfest.helpers.onclick(menuButton, function () {
    //         menu.classList.toggle('hide');
    //         document.getElementById('menubar1').classList.toggle('animateBar1');
    //         document.getElementById('menubar2').classList.toggle('animateBar2');
    //         document.getElementById('menubar3').classList.toggle('animateBar3');
    //     });

    // };

    var scrollToNow = function() {
        if (window.location.pathname == "/day1" || window.location.pathname == "/day2") {
            var currentEvents = document.querySelector('#currentEvents');
setTimeout(function(){
    if (nfest.helpers.hasClass('currentEvents', 'scrollNow')) {
                scroll()
            } else {

            }
}, 2000)

            var scroll = function() {
                var nowEvents = document.getElementById('comingEvents');
                console.log(nowEvents.offsetTop);

                function scrollTo(element, to, duration) {                    
                    var start = element.scrollTop,
                        change = to - start,
                        currentTime = 0,
                        increment = 40;

                    var animateScroll = function(){        
                        currentTime += increment;
                        var val = Math.easeInOutQuad(currentTime, start, change, duration);
                        element.scrollTop = val;
                        if(currentTime < duration) {
                            setTimeout(animateScroll, increment);
                        }
                    };
                    animateScroll();
                }

                //t = current time, b = start value, c = change in value, d = duration
                Math.easeInOutQuad = function (t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t + b;
                    t--;
                    return -c/2 * (t*(t-2) - 1) + b;
                };

                scrollTo(document.body, nowEvents.offsetTop - 25, 1250, "to now"); 
            }

        }
    }

    var backButton = function () {
        var eventUrl = window.location.pathname;
        eventUrl = eventUrl.split('/');
        var page = eventUrl[1];
        var detailPage = eventUrl[2];
        if (window.location.pathname == "/" + page + "/" + detailPage || window.location.pathname == "/myroute") {
            document.querySelector(".menuIcon").classList.add("hide");
            var backButton = document.querySelector(".backButton");
            backButton.classList.remove("hide");
            backButton.onclick = function () {
                window.history.back();
            }
        }
        if (window.location.pathname == "/") {
            document.querySelector(".menuIcon").classList.add("hide");
        }
    };

    //    var detailSlide = function () {
    //        // get elements from popupDetail partial
    //        var detail = document.querySelector('.detailContainer'),
    //            detailExit = document.querySelector('.detailExit'),
    //            showDetail = document.getElementById('showDetail'),
    //            closeButton = document.querySelector('.closeDetailButton');
    //
    //        showDetail.classList.remove('hide');
    //
    //        setTimeout(function () {
    //            detail.classList.add('detailToggle');
    //            detailExit.classList.add('detailToggle');
    //        }, 20);
    //        
    //        nfest.helpers.onclick(detailExit, function(){
    //            detail.classList.remove('detailToggle');
    //            detailExit.classList.remove('detailToggle');
    //            showDetail.classList.add('hide');
    //        });
    //        
    //        nfest.helpers.onclick(closeButton, function(){
    //            detail.classList.remove('detailToggle');
    //            detailExit.classList.remove('detailToggle');
    //            showDetail.classList.add('hide');
    //        });
    //    }

    return {
        uxLauncher: uxLauncher,
        // menuSlide: menuSlide,
        resetJs: resetJs,
        scrollToNow: scrollToNow,
        backButton: backButton,
        introEnd: introEnd
        // detailSlide: detailSlide
    }

})();

nfest.ux.uxLauncher();