var featureDetect = (function () {
    
    var launcher = function(){
        featureDetect.storage();
        featureDetect.ifMap();
    };

    var storage = function () {
//        // Feature detect + local reference bron: https://mathiasbynens.be/notes/localstorage-pattern
//        var hasStorage = (function () {
//            var uid = new Date;
//            var result;
//            try {
//                localStorage.setItem(uid, uid);
//                result = localStorage.getItem(uid) == uid;
//                localStorage.removeItem(uid);
//                return result && localStorage;
//            } catch (exception) {}
//        }());
//
//        if (hasStorage) {
//            console.log('localStorage supported');
//        } else {
//            // wat als local storage niet is ondersteund? server?
//        }
//        
//        if (document.getElementById('locationMapHolder')!=null){
//            allEvents.getData(hasStorage);
//        }
    };
     
    var ifMap = function(){
        // Check if location map is on page, if this is the case run the following code
        if (document.getElementById('locationMapHolder')!=null){
            
            ux.noJsReset();
//            geolocation.currentPositionMarker();
            
            console.log('aanwezig');
        }
    };

    return {
        launcher: launcher,
        storage: storage,
        ifMap: ifMap
    }
})();