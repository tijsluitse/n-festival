/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

nfest.addToRoute = (function () {

    var buttonToggle = function () {
        var add = document.querySelectorAll(".buttonAddToRoute");

        for (var i = add.length - 1; i >= 0; i--) {

            add[i].onclick = function (evt) {
                evt.currentTarget.classList.toggle("addedToRoute");

                document.querySelector(".myRouteCounter").classList.toggle("myRouteAdded");
            }
        }

        // add.onclick = function() {
        //     document.querySelector(".myRouteCounter").classList.add("myRouteAdded");
        //     console.log('click')
        // }
    }

    
    return{
        buttonToggle: buttonToggle
    }

})();

nfest.addToRoute.buttonToggle();