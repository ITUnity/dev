myapp.controller("mainCtrl", ["$scope", "adalAuthenticationService", "responsesService", "toastService",
    function mainCtrl($scope, adalAuthenticationService, responsesService, toastService) {

        "use strict";

        $scope.responses = [];
        $scope.message = "";
        $scope.workingOnIt = true;

        //set title
        angular.element("title").text("Home");

        //check log in status
        if (adalAuthenticationService.userInfo.isAuthenticated) {
            $scope.message = "Welcome. You are logged in as " + adalAuthenticationService.userInfo.userName;
        }
        else {
            $scope.message = "Welcome. You are not logged in.";
        }

        //get quick responses from SharePoint
        responsesService.getQuickResponses().then(function (results) {
            $scope.responses = results.data.value;
        }).catch(function (err) {
            toastService.error("There was a problem retrieving quick responses.");
        }).finally(function () {
            $scope.workingOnIt = false;
        });

        //insert into mail body
        $scope.insertResponse = function (text) {
            Office.context.mailbox.item.body.setSelectedDataAsync(text);
        };
    }
]);
