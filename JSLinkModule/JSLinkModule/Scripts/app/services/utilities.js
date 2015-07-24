DEMO.App.factory("utilitiesService", ["$http", function ($http) {

    "use strict";

    var getQueryStringValue = function (name) {
        try {
            var args = window.location.search.substring(1).split("&");
            var r = "";
            for (var i = 0; i < args.length; i++) {
                var n = args[i].split("=");
                if (n[0] == name)
                    r = decodeURIComponent(n[1]);
            }
            return r;
        }
        catch (err) {
            return 'undefined';
        }
    };

    return {
        getQueryStringValue: getQueryStringValue
    };

}]);