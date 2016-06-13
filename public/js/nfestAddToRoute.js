/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

nfest.addToRoute = (function () {

    var allSavedEvents = [];

    var buttonToggle = function () {
        var add = document.querySelectorAll(".buttonAddToRoute");

        for (var i = add.length - 1; i >= 0; i--) {
            add[i].onclick = function (evt) {
                evt.currentTarget.classList.toggle("addedToRoute");
                if (nfest.helpers.hasClass(this, 'addedToRoute')) {
                    addToMyTimetable(this);
                } else {
                    removeFromTimetable(this);
                }
            }
        }
    }

    var addToMyTimetable = function(clickedObject) {
 
        var oldItems = JSON.parse(localStorage.getItem('myRouteEvents')) || [];
        var newItem = clickedObject.id;

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
            i = myRouteElements.indexOf(removeItem);      
            document.getElementById(removeItem).classList.add('hide');  

        if (i != -1) {
            myRouteElements.splice(i, 1);
            localStorage.setItem('myRouteEvents', JSON.stringify(myRouteElements));
        }
        
        counter.innerHTML = myRouteElements.length;
    }
    
    return {        
        buttonToggle: buttonToggle,
        addToMyTimetable: addToMyTimetable,
        removeFromTimetable: removeFromTimetable
    }

})();

nfest.addToRoute.buttonToggle();