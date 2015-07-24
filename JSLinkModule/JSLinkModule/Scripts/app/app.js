var DEMO = window.Subs || {};
DEMO.App = angular.module('myApp', ['jsLink', 'ngRoute']);

DEMO.App.config(["$routeProvider", "jsLinkServiceProvider",
    function ($routeProvider, jsLinkProvider) {

        "use strict";

        //routes
        $routeProvider.when("/", {
            controller: 'homeCtrl',
            templateUrl: 'home.html'
        });
        $routeProvider.otherwise({
            redirectTo: "/"
        });

        //jslink
        jsLinkProvider.isSiteAdmin().then(function (admin) {
            if (admin === true) {
                jsLinkProvider.set_jsLink("Tasks", "VIEW", "../scripts/app/jslink/progressbar.js").then(
                    function () {
                        toastr.options = { "positionClass": "toast-bottom-right" };
                        toastr.info("JS Link file set!");
                    },
                    function (message) {
                        toastr.options = { "positionClass": "toast-bottom-right" };
                        toastr.error(message);
                    }
                );
            };
        });
    }]);

