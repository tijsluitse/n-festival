var ux = (function () {

    var launcher = function() {

        ux.noJsReset();
        ux.menuSlide();
        ux.fullScreenMap();

    };

    var noJsReset = function() {
        var locationMap = document.getElementById('locationMap');
        locationMap.classList.remove('hide');
    };

    var menuSlide = function () {

        var menu = document.getElementById('menu');
        menu.classList.add('displayNone');
        
        var menuButton = document.getElementById('menuButton').onclick = function() {
            menu.classList.toggle('displayNone');

            document.getElementById('menubar1').classList.toggle('animateBar1');
            document.getElementById('menubar2').classList.toggle('animateBar2');
            document.getElementById('menubar3').classList.toggle('animateBar3');
        }

    };
    
    var fullScreenMap = function() {

        // var fullMap = document.getElementById('showFullMap');
        // var locationMap = document.getElementById('locationMap');

        // fullMap.onclick = function() {
        //     locationMap.classList.toggle('fullscreen');
        // };

    };

    return {
        noJsReset: noJsReset,
        launcher: launcher,
        menuSlide: menuSlide,
        fullScreenMap: fullScreenMap
    }
})();