///* Namespacing nfest to avoid conflicts with other code like libraries */
//var nfest = nfest || {};
//'use strict';
//
//nfest.detailEvents = (function () {
//
//    var getDetailUrl = function () {
//        var detailTarget = document.querySelector(".discoverEvents");
//
//        nfest.helpers.onclick(detailTarget, function (e) {
//
//            if (e.target.nodeName !== 'UL' && e.target.classList[0] !== 'buttonAddToRoute' && e.target.classList[0] !== 'st0' && e.target.classList[0] !== 'addToRouteSvg') {
//
//                if (e.target.nodeName === 'A') {
//                    popupDetail(e.target.href);
//                } else {
//                    popupDetail(e.target.offsetParent.firstElementChild.href);
//                }
//
//                function popupDetail(href) {
//                    var url = href + '?js=false';
//
//                    nfest.helpers.getData(url, function (response) {
//                        var detailInfo = document.getElementById('detailInfo');
//                        detailInfo.innerHTML = response;
//
//                        nfest.ux.detailSlide();
//
//                    });
//
//                }
//                e.preventDefault();
//            }
//
//        });
//    }
//    
//    return{
//        getDetailUrl: getDetailUrl
//    }
//
//})();
//
//nfest.detailEvents.getDetailUrl();