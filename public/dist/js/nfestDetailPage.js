// var nfest=nfest||{};nfest.detail=function(){var e=function(){nfest.detail.recommendations()},t=function(){for(var e=document.querySelectorAll(".recObj"),t=document.querySelector(".eventInfo").id,n=(document.querySelector(".eventInfo").dataset.theme,[].slice.call(document.querySelectorAll(".recObj"))),r=document.querySelector(".reloadRecommendations"),o=(e.length-1,3),a=[],c=0;c<n.length;c++)a.push(n[c].id);var l=a.indexOf(t);a.splice(l,1);var i=function(){for(var e=[];e.length<o;){for(var t=Math.floor(Math.random()*a.length),n=!1,r=0;r<e.length;r++)if(e[r]==t){n=!0;break}n||(e[e.length]=t)}for(var r=0;r<e.length;r++){var c="#"+a[e[r]];document.querySelector(c).classList.remove("hide")}};r.onclick=function(){var e=document.querySelectorAll(".recObj"),t=document.querySelector(".reloadIcon");t.classList.add("reloadAnimation"),t.addEventListener("animationend",function(){t.classList.remove("reloadAnimation")}),Array.prototype.forEach.call(e,function(e){e.classList.add("hide")}),i()},i()};return{detailLauncher:e,recommendations:t}}(),nfest.detail.detailLauncher();

/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for detailpage */

nfest.detail = (function () {

    /* Launcher function */
    var detailLauncher = function () {
        nfest.detail.recommendations();
    }

    /* Add 3 recommendations to detail page */
    var recommendations = function () {

        var eventList = document.querySelectorAll('.recObj'),
            currentEvent = document.querySelector('.eventInfo').id,
            currentTheme = document.querySelector('.eventInfo').dataset.theme,
            eventArray = [].slice.call(document.querySelectorAll('.recObj')),
            reload = document.querySelector('.reloadRecommendations'),
            listLength = eventList.length - 1,
            recNum = 3,
            allItems = [];

        for (var i = 0; i < eventArray.length; i++) {
            allItems.push(eventArray[i].id);
        }

        var removeItem = allItems.indexOf(currentEvent);
        
        allItems.splice(removeItem, 1);

        /* Generate 3 random numbers, code by http://tinyurl.com/ztnfdje */
        var generate = function () { 
            var numbers = [];   
            
            while(numbers.length < recNum){
                var randomnumber = Math.floor(Math.random() * allItems.length),
                    found = false;

                for (var i = 0; i < numbers.length; i++){
                    if(numbers[i] == randomnumber){                    
                        found = true;
                        break
                    }
                }
                if(!found)numbers[numbers.length] = randomnumber;            
            }

            for (var i = 0; i < numbers.length; i++) {                
                var str = '#' + allItems[numbers[i]];
                document.querySelector(str).classList.remove('hide');
            }  

        }   
        
        /* Reload recommendations on click function */
        reload.onclick = function() {            
            var eventList = document.querySelectorAll('.recObj'),
                reloadButton = document.querySelector('.reloadIcon');
            
            reloadButton.classList.add('reloadAnimation');
            reloadButton.addEventListener('animationend', function() {
                reloadButton.classList.remove('reloadAnimation');
            })
                
            Array.prototype.forEach.call(eventList, function (event) {
                event.classList.add('hide');
            });

            generate();  
        }

        generate();  

    }

    return {
        detailLauncher: detailLauncher,   
        recommendations: recommendations     
    }

})();

/* Launcher */
nfest.detail.detailLauncher();