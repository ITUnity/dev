var myApp = angular.module("MyApp", ["ngRoute", "AdalAngular"]);


myApp.config(["$routeProvider", "$httpProvider", "adalAuthenticationServiceProvider",
    function ($routeProvider, $httpProvider, adalProvider) {

        'use strict';

        //Initialize ADAL
        adalProvider.init({
            tenant: "[tenancy].onmicrosoft.com",
            clientId: "[clientid]",
            cacheLocation: "localStorage",
            endpoints: {
                'https://[tenancy].sharepoint.com/_api/': 'https://[tenancy].sharepoint.com',
                'https://[tenancy]-my.sharepoint.com/_api/v1.0/me': 'https://[tenancy]-my.sharepoint.com'
             }
        }, $httpProvider);

        //Configure routes
        $routeProvider.when("/", {
            controller: 'homeCtrl',
            templateUrl: 'Views/home.html',
            requireADLogin: true
        });
        $routeProvider.when("/documents", {
            controller: 'docsCtrl',
            templateUrl: 'Views/docs.html',
            requireADLogin: true
        });
        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }
]);

