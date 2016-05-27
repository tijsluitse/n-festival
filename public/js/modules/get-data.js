var allEvents = (function () {

    var getData = function (hasStorage) {

        var xhr = new XMLHttpRequest();
        var url = "data/data.json";

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);

                if (hasStorage) {
                    localStorage.setItem('allEventsData', JSON.stringify(data));
                    console.log(data);
                }
                else{
                    // wat als local storage niet is ondersteund?
                }

                templating.init(hasStorage);
            }
        };
        xhr.open("GET", url, true);
        xhr.send();

    }

    return {
        getData: getData
    }

})();