/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Function for adding events to "my route" */

nfest.addToRoute = (function () {

    var allSavedEvents = [];

    var buttonToggle = function () {
        var add = document.querySelectorAll('.buttonAddToRoute');
            counter = document.getElementById('myRouteCounter');

        for (var i = add.length - 1; i >= 0; i--) {
            add[i].onclick = function (evt) {

                var myRouteCounter = document.getElementById('myRouteCounter');
                    myRouteCounter.classList.add('myRouteAdded');
                    myRouteCounter.addEventListener('animationend', function() {
                    myRouteCounter.classList.remove('myRouteAdded'); 
                });                
                
                evt.currentTarget.classList.toggle('addedToRoute');
                if (nfest.helpers.hasClass(this, 'addedToRoute')) {
                    counter.classList.remove('hide');
                    addToMyTimetable(this);                    
                } else {                    
                    removeFromTimetable(this);
                }

            }
        }
    }

    var addToMyTimetable = function(clickedObject) {
        var oldItems = JSON.parse(localStorage.getItem('myRouteEvents')) || [],
            newItem = clickedObject.id;

        function checkAvailability(arr, val) {
            return arr.some(function(arrVal) {
                return val === arrVal;
            });
        } 

        if (checkAvailability(oldItems, newItem)) {    
        } else {
            oldItems.push(newItem);
            localStorage.setItem('myRouteEvents', JSON.stringify(oldItems));
        }

        var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
            counter = document.getElementById('myRouteCounter');
            counter.innerHTML = myRouteElements.length;
    }

    var removeFromTimetable = function(clickedObject) {
        var myRouteElements = JSON.parse(localStorage.getItem('myRouteEvents')),
            counter = document.getElementById('myRouteCounter'), 
            removeItem = clickedObject.id,
            i = myRouteElements.indexOf(removeItem),
            body = document.querySelector('body');

        if (nfest.helpers.hasClass(body, 'myTimetable')) {
            document.getElementById(removeItem).classList.add('hide');
        }

        if (i != -1) {
            myRouteElements.splice(i, 1);
            localStorage.setItem('myRouteEvents', JSON.stringify(myRouteElements));
        }
        
        if (localStorage.getItem('myRouteEvents') === null || myRouteElements.length === 0) {
            counter.classList.add('hide');
        } else {
            counter.innerHTML = myRouteElements.length;
        }
        
    }
    
    return {        
        buttonToggle: buttonToggle,
        addToMyTimetable: addToMyTimetable,
        removeFromTimetable: removeFromTimetable
    }

})();

nfest.addToRoute.buttonToggle();