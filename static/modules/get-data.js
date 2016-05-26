var allEvents = (function () {

    var getData = function () {

        var xhr = new XMLHttpRequest();
        var url = "data/data.json";

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                localStorage.setItem('allEventsData', JSON.stringify(data));

                templating.init();
            }
        };
        xhr.open("GET", url, true);
        xhr.send();

    }

    return {
        getData: getData
    }

})();