var templating = (function () {

    var init = function (hasStorage) {
        var showEvents = document.getElementById('showEvents').innerHTML

        if (hasStorage) {
            var data = JSON.parse(localStorage.getItem('allEventsData'));
        }
        else{
            // wat als local storage niet is ondersteund?
        }

        document.getElementById('showEvents').innerHTML = Mustache.render(showEvents, {
            data: data
        });

    }

    return {
        init: init
    }
})();