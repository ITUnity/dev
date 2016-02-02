System.register([], function(exports_1) {
    var HashService;
    return {
        setters:[],
        execute: function() {
            HashService = (function () {
                function HashService() {
                }
                HashService.prototype.getValueFromHash = function (key) {
                    try {
                        var args = window.location.hash.substring(1).split("&");
                        var r = null;
                        for (var i = 0; i < args.length; i++) {
                            var n = args[i].split("=");
                            if (n[0] == key)
                                r = decodeURIComponent(n[1]);
                        }
                        return r;
                    }
                    catch (err) {
                        return null;
                    }
                };
                return HashService;
            })();
            exports_1("HashService", HashService);
        }
    }
});
//# sourceMappingURL=hash.service.js.map