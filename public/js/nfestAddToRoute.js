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
                document.querySelector(".myRouteCounter").classList.toggle("myRouteAdded");

                addToMyTimetable(this);

            }
        }

        // add.onclick = function() {
        //     document.querySelector(".myRouteCounter").classList.add("myRouteAdded");
        //     console.log('click')
        // }
    }

        var addToMyTimetable = function (clickedObject) {
            var oldItems = JSON.parse(localStorage.getItem('myRouteEvents')) || [];
            var newItem = clickedObject.id;
            oldItems.push(newItem);
            localStorage.setItem('myRouteEvents', JSON.stringify(oldItems));
        }

    return {
        buttonToggle: buttonToggle,
        addToMyTimetable: addToMyTimetable
    }

})();

nfest.addToRoute.buttonToggle();