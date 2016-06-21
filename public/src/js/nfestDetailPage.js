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