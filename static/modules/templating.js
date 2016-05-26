var templating = (function () {

    var init = function () {
        var showEvents = document.getElementById('showEvents').innerHTML,
            data = JSON.parse(localStorage.getItem('allEventsData'));

        document.getElementById('showEvents').innerHTML = Mustache.render(showEvents, {
            data: data
        });

    }

    return {
        init: init
    }
})();