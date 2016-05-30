var templating = (function () {

    var init = function (hasStorage) {
<<<<<<< HEAD
//        var showEvents = document.getElementById('showEvents').innerHTML
//
//        if (hasStorage) {
//            var data = JSON.parse(localStorage.getItem('allEventsData'));
//        }
//        else{
//            console.log("There is no localStorage detected.");
//        }
//
//        document.getElementById('showEvents').innerHTML = Mustache.render(showEvents, {
//            data: data
//        });
=======
        var showEvents = document.getElementById('showEvents').innerHTML;

        if (hasStorage) {
            var data = JSON.parse(localStorage.getItem('allEventsData'));
        }
        else{
            console.log("There is no localStorage detected.");
        }

        document.getElementById('showEvents').innerHTML = Mustache.render(showEvents, {
            data: data
        });
>>>>>>> locations-map

    }

    return {
        init: init
    }
})();