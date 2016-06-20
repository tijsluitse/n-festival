/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

nfest.detail = (function () {

    var detailLauncher = function () {
        nfest.detail.recommendations();
    }

    var recommendations = function () {

        var eventList = document.querySelectorAll('.eventObj'),
            currentEvent = document.querySelector('.eventInfo').id,
            currentTheme = document.querySelector('.eventInfo').dataset.theme,
            eventArray = [].slice.call(document.querySelectorAll('.eventObj')),
            reload = document.querySelector('.reloadRecommendations'),
            listLength = eventList.length - 1,
            recNum = 3,
            allItems = [];

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
                var str = '#' + allItems[numbers[i]];
                document.querySelector(str).classList.remove('hide');
            }  

        }   
        

        reload.addEventListener('click', function() {
            var eventList = document.querySelectorAll('.eventObj');

            var reloadButton = document.querySelector(".reloadIcon");
            reloadButton.classList.add("reloadAnimation");
            reloadButton.addEventListener("animationend", function() {
                reloadButton.classList.remove("reloadAnimation");
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