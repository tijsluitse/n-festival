var ux = (function () {

    var menuSlide = function() {

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

        function popupDetail(e) {

            if (e.target.nodeName === 'A') {
                console.log(e.target.href);
            } else {
                console.log(e.target.offsetParent.firstElementChild.href);
            }
            
            console.log(e.target);
            

            e.preventDefault();
        };

        if (detailTarget.addEventListener) {
            detailTarget.addEventListener('click', popupDetail, false);
        }
        else{
            detailTarget.attachEvent('onclick', popupDetail);
        }
    };

    var myRoute = function() {
        var myRouteButton = document.querySelector('.buttonAddToRoute').onclick = function() {
            var heart = document.querySelector('.eventHeartIcon').classList.toggle('eventAdded');
        }
    };

    return {
        menuSlide: menuSlide,
        detailPage: detailPage,
        myRoute: myRoute
    }
})();