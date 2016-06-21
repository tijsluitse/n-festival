/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for menu usable on most of the pages */

nfest.menu = (function () {

    /* Global variables */
    var nLogo = document.getElementById('nLogo'),
        toMenu = document.querySelector('.aboutBackButton');

    /* Launcher function */
    var menuLauncher = function () {
        console.log('hoit');
        nfest.menu.menuScrollTop();
        nfest.menu.menuFunctions();
    }; 

    /* Remove link from logo for new eventlistener */
    var menuFunctions = function () {
        nLogo.removeAttribute('href');
    };

    var menuScrollTop = function () {

        /* Scroll to top with code by: http://jsfiddle.net/62MTU/15/ */
        function scrollTo(element, to, duration) {                    
            var start = element.scrollTop,
                change = to - start,
                currentTime = 0,
                increment = 40;
            
            /* Scroll animation */            
            var animateScroll = function(){        
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime, start, change, duration);
                element.scrollTop = val;
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };

            /* Launch scroll animation */
            animateScroll();
        }

        /* t = current time, b = start value, c = change in value, d = duration */
        Math.easeInOutQuad = function (t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };
    
        /* Body height and about section */
        var size = document.body.offsetHeight,
            aboutSection = document.querySelector('.aboutArticle'),
            introPage = document.querySelector('.introPage'); 

        /* New logo event listener to go to about */
        nLogo.addEventListener('click', function(){  
            console.log('hoi')         
            size = size/2;            
            scrollTo(document.body, -size, 1250, 'click');
            /* Add click event for showing introduction animation again */
            setTimeout(function() {
                console.log('hoi');
                nLogo.onclick = function () {
                    console.log('click')
                    introPage.classList.remove('hide');
                    introPage.addEventListener('animationend', function(){
                        setTimeout(function(){ 
                            introPage.classList.add('hide');
                        }, 1500);
                    });                   
                }
            }, 1250);
        });

        /* Back to menu event listener */
        toMenu.addEventListener('click', function() {
            size = 1250;            
            scrollTo(document.body, size, 1250, 'click');
            /* Remove introduction animation onclick event */
            nLogo.onclick = function () { 
                size = size/2;            
                scrollTo(document.body, -size, 1250, 'click');
            }
        }); 

        /* Fallback when user scrolls down without clicking */
        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                nLogo.onclick = function () { 
                    size = size/2;            
                    scrollTo(document.body, -size, 1250, 'click');
                } 
            }
        };

    }

    return {
        menuLauncher: menuLauncher,
        menuFunctions: menuFunctions,
        menuScrollTop: menuScrollTop
    }

})();

/* Launcher */
nfest.menu.menuLauncher();