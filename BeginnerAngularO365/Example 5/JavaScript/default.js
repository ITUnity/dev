
angular.module('myApp', []).controller('citiesController', function($scope) {
    $scope.names = [
        {city:'Boston',state:'MA'},
        {city:'Watertown',state:'MA'},
        {city:'Burlington',state:'MA'},
        {city:'Warwick',state:'RI'},
        {city:'Nashua',state:'NH'}
    ];
});