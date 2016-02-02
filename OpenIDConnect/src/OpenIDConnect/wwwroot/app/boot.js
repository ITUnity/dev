System.register(['angular2/platform/browser', './app.component', 'angular2/http', './validation.service', './hash.service'], function(exports_1) {
    var browser_1, app_component_1, http_1, validation_service_1, hash_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            },
            function (hash_service_1_1) {
                hash_service_1 = hash_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, validation_service_1.ValidationService, hash_service_1.HashService]);
        }
    }
});
//# sourceMappingURL=boot.js.map