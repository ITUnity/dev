DEMO.App.controller("homeCtrl", ["$scope", "profileService", "utilitiesService",
     function homeCtrl($scope, profileService, utilitiesService) {

         "use strict";
         angular.element("title").text("Home");

         //view model
         $scope.user = {
             displayName: "",
             accountName: "",
             pictureUrl: ""
         };


         profileService.me().then(function (data) {
             $scope.user.displayName = data.data.DisplayName;
             $scope.user.accountName = data.data.AccountName.split('|')[2];
             $scope.user.pictureUrl = utilitiesService.getQueryStringValue("SPHostUrl") + "/_layouts/15/userphoto.aspx?accountname=" + $scope.user.accountName
         }).catch(function (err) {
             toastr.options = { "positionClass": "toast-bottom-right" };
             toastr.error(err.statusText);
         });
     }
]);

