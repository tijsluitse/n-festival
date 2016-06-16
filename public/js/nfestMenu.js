  /* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for UX usable on most of the pages */

nfest.menu = (function () {

    var menuLauncher = function () {
        nfest.menu.menuScrollTop();
        nfest.menu.menuFunctions();
        console.log("hoi")
    }; 

    var nLogo = document.getElementById('nLogo');

    var menuFunctions = function () {
        nLogo.removeAttribute('href');
    };

    var menuScrollTop = function () {

        var scrollToMenu =  function () {

            // code by: http://jsfiddle.net/62MTU/15/
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
                t /= d/1;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            };  

            scrollTo(document.body, 1000, 1000);  

        }

        var scrollToAbout =  function () {

            // code by: http://jsfiddle.net/62MTU/15/
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

            scrollTo(document.body, 0, 1000);  

        }

        nLogo.addEventListener('click', function(){
            scrollToAbout();
        });

        if (document.cookie.indexOf("visited") >= 0) { // Second Time            
            scrollTo(document.body, 1500, 0);            
        } else { // First Time    
            scrollToMenu(); 
            document.cookie = "visited=yes; expires=Fri, 17 Jun 2016 12:00:00 UTC;";                       
        }

    };

    return {
        menuLauncher: menuLauncher,
        menuFunctions: menuFunctions,
        menuScrollTop: menuScrollTop
    }

})();

nfest.menu.menuLauncher();