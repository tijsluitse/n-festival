var templating = (function () {

    var init = function (hasStorage) {

        if (hasStorage) {
            var data = JSON.parse(localStorage.getItem('allEventsData'));
        }
        else{
            console.log("There is no localStorage detected.");
        }
    }

    return {
        init: init
    }

})();