var ux = (function () {

    var launcher = function () {

        ux.menuSlide();
        ux.noJsReset();
        ux.fullScreenMap();
        ux.detailPage();
        ux.myRoute();
        ux.filterSlide();

    };

    var noJsReset = function () {
        var locationMap = document.getElementById('locationMap');
        locationMap.classList.remove('hide');
    };

    var menuSlide = function () {

        var menu = document.getElementById('menu');
        menu.classList.add('hide');
        menu.classList.add('menuSlide');

        var menuButton = document.getElementById('menuButton').onclick = function () {
            menu.classList.toggle('hide');

            document.getElementById('menubar1').classList.toggle('animateBar1');
            document.getElementById('menubar2').classList.toggle('animateBar2');
            document.getElementById('menubar3').classList.toggle('animateBar3');
        }

    };

    var filterSlide = function () {
        var filter = document.querySelector('.filter');
        filter.classList.add('filterToRight');

        var filterButton = document.querySelector('.filterButton').onclick = function () {
            filter.classList.add('filterToggle');
        }

        var filterCloseButton = document.querySelector('.filterCloseButton').onclick = function () {
            filter.classList.remove('filterToggle');
        }
        var filterCloseButtonBar = document.querySelector('.exitBlock').onclick = function () {
            filter.classList.remove('filterToggle');
        }

    }

    var fullScreenMap = function () {

        // var fullMap = document.getElementById('showFullMap');
        // var locationMap = document.getElementById('locationMap');

        // fullMap.onclick = function() {            
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
                            
                            ux.detailSlide();
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

    var detailSlide = function () {
        var detail = document.querySelector('.detailContainer'),
            detailExit = document.querySelector('.detailExit'),
            showDetail = document.getElementById('showDetail');


        showDetail.classList.remove('hide');

        setTimeout(function () {
            detail.classList.add('detailToggle');
            detailExit.classList.add('detailToggle');
        }, 20);

        detailExit.onclick = function () {
            detail.classList.remove('detailToggle');
            detailExit.classList.remove('detailToggle');
            showDetail.classList.add('hide');
        };

        document.querySelector('.closeDetailButton').onclick = function () {
            detail.classList.remove('detailToggle');
            detailExit.classList.remove('detailToggle');
            showDetail.classList.add('hide');

        };
    };

    var myRoute = function () {
        // var myRouteButton = document.querySelector('.buttonAddToRoute').onclick = function () {
        //     var heart = document.querySelector('.eventHeartIcon').classList.toggle('eventAdded');
        // }
    };

    return {
        menuSlide: menuSlide,
        launcher: launcher,
        noJsReset: noJsReset,
        fullScreenMap: fullScreenMap,
        detailPage: detailPage,
        detailSlide: detailSlide,
        myRoute: myRoute,
        filterSlide: filterSlide
    }

})();