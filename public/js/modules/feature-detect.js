var featureDetect = (function () {

    var storage = function () {
        // Feature detect + local reference bron: https://mathiasbynens.be/notes/localstorage-pattern
        var hasStorage = (function () {
            var uid = new Date;
            var result;
            try {
                localStorage.setItem(uid, uid);
                result = localStorage.getItem(uid) == uid;
                localStorage.removeItem(uid);
                return result && localStorage;
            } catch (exception) {}
        }());

        if (hasStorage) {
            console.log('localStorage supported');
        } else {
            // wat als local storage niet is ondersteund? server?
        }
        
         allEvents.getData(hasStorage);
    };

    return {
        storage: storage
    }
})();