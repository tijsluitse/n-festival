var ux = (function () {

    var menuSlide = function () {

        var menu = document.getElementById('menu');
        menu.classList.add('displayNone');
        
        var menuButton = document.getElementById('menuButton').onclick = function() {
            menu.classList.toggle('displayNone');

            document.getElementById("menubar1").classList.toggle("animateBar1");
            document.getElementById("menubar2").classList.toggle("animateBar2");
            document.getElementById("menubar3").classList.toggle("animateBar3");
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
    
    return {
        menuSlide: menuSlide,
        filterSlide: filterSlide
    }
})();