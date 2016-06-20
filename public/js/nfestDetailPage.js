/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Page for detailpage */

nfest.detail = (function () {

    var detailLauncher = function () {
        nfest.detail.recommendations();
    }

    var recommendations = function () {

        var eventList = document.querySelectorAll('.recObj'),
            currentEvent = document.querySelector('.eventInfo').id,
            currentTheme = document.querySelector('.eventInfo').dataset.theme,
            eventArray = [].slice.call(document.querySelectorAll('.recObj')),
            reload = document.querySelector('.reloadRecommendations'),
            listLength = eventList.length - 1,
            recNum = 3,
            allItems = [];

        console.log(currentTheme);

        for (var i = 0; i < eventArray.length; i++) {
            allItems.push(eventArray[i].id);
        }

        var removeItem = allItems.indexOf(currentEvent);
        
        allItems.splice(removeItem, 1);

        var generate = function () { 

            var numbers = [];   

            while(numbers.length < recNum){
                var randomnumber = Math.floor(Math.random() * allItems.length)
                var found = false;
                for(var i = 0; i < numbers.length; i++){
                    if(numbers[i] == randomnumber){                    
                        found = true;
                        break
                    }
                }
                if(!found)numbers[numbers.length] = randomnumber;            
            }

            for (var i = 0; i < numbers.length; i++) {
                console.log(allItems[numbers[i]])
                var str = '#' + allItems[numbers[i]];
                document.querySelector(str).classList.remove('hide');
            }  

        }   
        

        reload.addEventListener('click', function() {
            var eventList = document.querySelectorAll('.recObj');

            var reloadButton = document.querySelector('.reloadIcon');
            reloadButton.classList.add('reloadAnimation');
            reloadButton.addEventListener('animationend', function() {
                reloadButton.classList.remove('reloadAnimation');
            })
                
                eventList.forEach(function(event){
                    event.classList.add('hide');
                });
            generate();
        }); 

        generate();  

    }

    return {
        detailLauncher: detailLauncher,   
        recommendations: recommendations     
    }

})();

nfest.detail.detailLauncher();