/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

nfest.addToRoute = (function () {

    var buttonToggle = function () {
        var add = document.querySelectorAll(".buttonAddToRoute");

        for (var i = add.length - 1; i >= 0; i--) {
            add[i].onclick = function (evt) {
                evt.currentTarget.classList.toggle("addedToRoute");
                addToMyTimetable(this);
            }
        }
    }

    var addToMyTimetable = function(clickedObject) {
        if (nfest.helpers.hasClass(clickedObject, 'buttonAddToRoute')) {
            console.log("toegevoegd");
        } else {
            console.log("weg");
        }
    }
    
    return {        
        buttonToggle: buttonToggle,
        addToMyTimetable: addToMyTimetable
    }

})();

nfest.addToRoute.buttonToggle();