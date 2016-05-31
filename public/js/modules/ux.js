var ux = (function () {

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

                            var dialog = document.getElementById('dialog');
                            dialog.innerHTML = response;

                            window.location = '#dialog';
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
        menuSlide: menuSlide,
        detailPage: detailPage,
        myRoute: myRoute
    }
})();