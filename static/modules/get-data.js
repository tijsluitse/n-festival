var allEvents = (function () {

    var getData = function () {
        
        var xhr = new XMLHttpRequest();
        var url = "data/data.json";

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);               
                console.log(data);
                localStorage.setItem('allEventsData', JSON.stringify(data));
				var allEvents = localStorage.getItem('allEventsData');
            }
        };
        xhr.open("GET", url, true);
        xhr.send();

    }

    return {
        getData
    }

})();