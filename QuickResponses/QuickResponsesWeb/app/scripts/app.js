var myapp = angular.module("QuickResponses", ["ngRoute", "AdalAngular"])
.config(["$routeProvider", "$httpProvider", "adalAuthenticationServiceProvider",
        function ($routeProvider, $httpProvider, adalProvider) {

            'use strict';

            Office.initialize = function (reason) {
                //this must be called within 5 seconds
            };

            adalProvider.init({
                tenant: "shillier.onmicrosoft.com",
                clientId: "f15c9c8f-73f8-4766-adb9-785f5d081390",
                cacheLocation: "sessionStorage",
                endpoints: {
                    "https://shillier.sharepoint.com/sites/appdev/_api": "https://shillier.sharepoint.com"
                }
            }, $httpProvider);

            //Configure routes
            $routeProvider.when("/", {
                controller: 'mainCtrl',
                templateUrl: 'views/main.html',
                requireADLogin: true
            });
            $routeProvider.otherwise({
                redirectTo: "/"
            });
        }
]);




