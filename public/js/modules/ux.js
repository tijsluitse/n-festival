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
    
    return {
        menuSlide: menuSlide
    }
})();