myApp.controller("homeCtrl", ["$scope", "adalAuthenticationService",
    function homeCtrl($scope, adalAuthenticationService) {

        "use strict";
        angular.element("title").text("Home");

        if (adalAuthenticationService.userInfo.isAuthenticated) {
            $scope.message = "Welcome. You are logged in as " + adalAuthenticationService.userInfo.userName;
        }
        else {
            $scope.message = "Welcome. You are not logged in.";
        }

    }
]);