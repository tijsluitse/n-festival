// var nfest=nfest||{};nfest.addToRoute=function(){var e=function(){nfest.addToRoute.buttonToggle()},t=function(){var e=document.querySelectorAll(".buttonAddToRoute");counter=document.getElementById("myRouteCounter");for(var t=e.length-1;t>=0;t--)e[t].onclick=function(e){var t=document.getElementById("myRouteCounter");t.classList.add("myRouteAdded"),t.addEventListener("animationend",function(){t.classList.remove("myRouteAdded")}),e.currentTarget.classList.toggle("addedToRoute"),nfest.helpers.hasClass(this,"addedToRoute")?(counter.classList.remove("hide"),o(this)):n(this)}},o=function(e){function t(e,t){return e.some(function(e){return t===e})}var o=JSON.parse(localStorage.getItem("myRouteEvents"))||[],n=e.id;t(o,n)||(o.push(n),localStorage.setItem("myRouteEvents",JSON.stringify(o)));var u=JSON.parse(localStorage.getItem("myRouteEvents")),d=document.getElementById("myRouteCounter");d.innerHTML=u.length},n=function(e){var t=JSON.parse(localStorage.getItem("myRouteEvents")),o=document.getElementById("myRouteCounter"),n=e.id,u=t.indexOf(n),d=document.querySelector("body");nfest.helpers.hasClass(d,"myTimetable")&&document.getElementById(n).classList.add("hide"),-1!=u&&(t.splice(u,1),localStorage.setItem("myRouteEvents",JSON.stringify(t))),null===localStorage.getItem("myRouteEvents")||0===t.length?o.classList.add("hide"):o.innerHTML=t.length};return{addToRouteLauncher:e,buttonToggle:t,addToMyRoute:o,removeFromMyRoute:n}}(),nfest.addToRoute.addToRouteLauncher();

/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Function for adding events to "my route" */

nfest.addToRoute = (function () {

    /* Global variables */
    var allSavedEvents = [];

    /* Launcher function */
    var addToRouteLauncher = function () {
        nfest.addToRoute.buttonToggle();
    };

    /* Add to my route button with add and remove from my route */
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
                    addToMyRoute(this);                    
                } else {                    
                    removeFromMyRoute(this);
                }

            }
        }
    }

    /* Add reference to old my route elements in Local Storage array */
    var addToMyRoute = function(clickedObject) {
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

    /* Search and remove my route element from Local Storage array */
    var removeFromMyRoute = function(clickedObject) {
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
            console.log(counter);
        } else {
            counter.innerHTML = myRouteElements.length;
        }
        
    }
    
    return {       
        addToRouteLauncher: addToRouteLauncher, 
        buttonToggle: buttonToggle,
        addToMyRoute: addToMyRoute,
        removeFromMyRoute: removeFromMyRoute
    }

})();

/* Launcher */
nfest.addToRoute.addToRouteLauncher();