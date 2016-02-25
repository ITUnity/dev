

var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    $scope.firstName = "Dave";
    $scope.lastName = "Feldman";
	$scope.twitter = "@bostonmusicdave";
	
	$scope.askabout = function () {
		
		
		if ($scope.twitter == "@bostonmusicdave") {
				
			return "AngularJS and Office 365";
		}
		else {
			return $scope.firstName + " " + $scope.lastName + "'s skills and interests";
		}
	}
});
