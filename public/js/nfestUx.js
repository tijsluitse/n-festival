/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for UX usable on most of the pages */

nfest.ux = (function () {

    var uxLauncher = function () {
        // directly launch ux modules for every page
        // nfest.ux.menuSlide();
        nfest.ux.backButton();
        nfest.ux.resetJs();
    };

    var resetJs = function() {
        var myRouteButton = document.querySelector('.topHeader .myRoute'),
            allDistances = document.querySelectorAll('.eventDistance');
            allAddToRouteButtons = document.querySelectorAll('.addToRouteMail');
            myRouteButton.classList.remove('hidden');
            
            allDistances.forEach(function(distance){
                distance.classList.remove('hidden');
            })
            allAddToRouteButtons.forEach(function(button) {
                button.removeAttribute('href');
            })

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

    var backButton = function () {
        var eventUrl = window.location.pathname;
        eventUrl = eventUrl.split('/');
        var page = eventUrl[1];
        var detailPage = eventUrl[2];
        if (window.location.pathname == "/" + page + "/" + detailPage) {
            document.querySelector(".menuIcon").classList.add("hide");
            var backButton = document.querySelector(".backButton");
            backButton.classList.remove("hide");
            backButton.onclick = function(){
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
        backButton: backButton
//        detailSlide: detailSlide
    }

})();

nfest.ux.uxLauncher();