var allEvents = (function () {

    var getData = function (hasStorage) {

        var xhr = new XMLHttpRequest();
        var url = "data/data.json";

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);

                // sort by born date
                // use slice() to copy the array and not just make a reference
//                var dataByTime = data.slice(0);
//
//                for (i = 0; i < data.length; i++) {
//                    data[i].info.starttime = parseFloat(data[i].info.starttime);
//                    data[i].info.endtime = parseFloat(data[i].info.endtime);
//                }
//
//                dataByTime.sort(function(a,b) {
//                    return a.info.starttime - b.info.starttime;
//                });                        

                geocoder.getCoordinates(data);
                geolocation.getUserPosition();

                if (hasStorage) {
                    localStorage.setItem('allEventsData', JSON.stringify(data));
                }
                else {
                    // wat als local storage niet is ondersteund?
                }
                
            }
        };
        xhr.open("GET", url, true);
        xhr.send();

    }

    return {
        getData: getData
    }

})();