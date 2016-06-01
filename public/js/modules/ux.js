var ux = (function () {

    var launcher = function() {

        ux.noJsReset();
        ux.menuSlide();
        ux.fullScreenMap();
        ux.detailPage();
        ux.myRoute();
        ux.filterSlide();

    };

    var noJsReset = function() {
        var locationMap = document.getElementById('locationMap');
        locationMap.classList.remove('hide');
    };

    var menuSlide = function () {

        var menu = document.getElementById('menu');
        menu.classList.add('displayNone');

        var menuButton = document.getElementById('menuButton').onclick = function () {
            menu.classList.toggle('displayNone');

            document.getElementById('menubar1').classList.toggle('animateBar1');
            document.getElementById('menubar2').classList.toggle('animateBar2');
            document.getElementById('menubar3').classList.toggle('animateBar3');
        }

    };

    var filterSlide = function() {
        var filter = document.querySelector('.filter');
        filter.classList.add('filterToRight');

        var filterButton = document.querySelector('.filterButton').onclick = function() {
            filter.classList.add('filterToggle');
        }

        var filterCloseButton = document.querySelector('.filterCloseButton').onclick = function() {
            filter.classList.remove('filterToggle');
        }

    }
    
    var fullScreenMap = function() {

        // var fullMap = document.getElementById('showFullMap');
        // var locationMap = document.getElementById('locationMap');

        // fullMap.onclick = function() {
        //     locationMap.classList.toggle('fullscreen');
        // };

    };

    var detailPage = function () {
        var detailTarget = document.querySelector(".discoverEvents");

        function getURL(e) {

            if (e.target.nodeName !== 'UL' && e.target.classList[0] !== 'eventHeartIcon' && e.target.classList[0] !== 'st0') {

                if (e.target.nodeName === 'A') {
                    popupDetail(e.target.href);
                } else {
                    popupDetail(e.target.offsetParent.firstElementChild.href);
                }

                function popupDetail(href) {

                    var xhr = new XMLHttpRequest();
                    var url = href + '?js=false';

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var response = xhr.responseText;

                            var detailInfo = document.getElementById('detailInfo');
                            detailInfo.innerHTML = response;

                            window.location = '#showDetail';
                        }
                    };
                    xhr.open("GET", url, true);
                    xhr.send();

                }
                e.preventDefault();
            }

        };

        if (detailTarget.addEventListener) {
            detailTarget.addEventListener('click', getURL, false);
        } else {
            detailTarget.attachEvent('onclick', getURL);
        }
    };

    var myRoute = function () {
        var myRouteButton = document.querySelector('.buttonAddToRoute').onclick = function () {
            var heart = document.querySelector('.eventHeartIcon').classList.toggle('eventAdded');
        }
    };
        
    return {

        launcher: launcher,
        noJsReset: noJsReset,
        menuSlide: menuSlide,
        fullScreenMap: fullScreenMap,
        detailPage: detailPage,
        myRoute: myRoute,
        filterSlide: filterSlide

    }
})();