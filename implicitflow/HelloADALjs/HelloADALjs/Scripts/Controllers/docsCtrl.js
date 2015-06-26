myApp.controller("docsCtrl", ["$scope", "$location", "$http", "adalAuthenticationService",
    function docsCtrl($scope, $location, $http, adalAuthenticationService) {

        "use strict";

        angular.element("title").text("Documents");

        if (adalAuthenticationService.userInfo.isAuthenticated) {
            $scope.message = "Welcome. You are logged in as " + adalAuthenticationService.userInfo.userName;
        }
        else{
            $location.path("/");
        }


        $http({
            url: "https://[tenancy]-my.sharepoint.com/_api/v1.0/me/files",
            params: {
                "$select": "id,name,lastModifiedBy,size,webUrl"
            },
            method: "GET",
            headers: {
                "accept": "application/json",
            }
        }).success(function (data) {

            var docs = new Array();
            var files = data.value;
            for (var count = 0; count < files.length; count++) {
                var item = files[count];

                docs.push({
                    name: item.name,
                    size: item.size,
                    link: item.webUrl,
                    lastModifiedBy: item.lastModifiedBy.user.displayName.split(',')[0]
                });
            }
            $scope.documents = docs;
            $scope.message = "Returned " + docs.length + " document(s).";

        }).error(function (data) {
            $scope.message = JSON.stringify(data);
        });

    }
]);