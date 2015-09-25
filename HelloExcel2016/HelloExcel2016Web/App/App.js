//define ng app
var myapp = angular.module("HelloExcel2016", [])

    .controller("mainCtrl", ["$scope", "$q", "excelService",
        function mainCtrl($scope, $q, excelService) {

            "use strict";

            $scope.cells = [];

            $scope.getCells = function () {
                excelService.getRangeValues("A1:B2").then(function (rows) {
                    $scope.cells = [];
                    var cells = [];
                    for (var r = 0; r < rows.length; r++) {
                        for (var c = 0; c < rows[r].length; c++) {
                            cells.push({
                                row: r + 1,
                                col: $scope.getColumnLetter(c),
                                value: (rows[r][c].length > 0) ? rows[r][c] : 'empty'
                            });
                        }
                    }
                    $scope.cells = cells;
                }).catch(function (err) {
                    console.log(err);
                }).finally(function () {
                    console.log("done");
                });

            };

            $scope.copyCells = function () {
                excelService.getRangeValues("A1:B2").then(function (rows) {
                    return excelService.setRangeValues("A4:B5", rows);
                }).then(function (data) {
                    console.log("success");
                }).catch(function (err) {
                    console.log(err);
                }).finally(function () {
                    console.log("done");
                });

            };

            $scope.getColumnLetter = function (n) {
                switch (n) {
                    case 0:
                        return "A";
                    case 1:
                        return "B";
                    case 2:
                        return "C";
                    case 3:
                        return "D";
                    default:
                        return n;
                }
            };
        }])

.factory("excelService", ["$q", function ($q) {

    "use strict";

    return {
        getRangeValues: function (selector) {
            var deferred = $q.defer();
            var data = null;
            Excel.run(function (ctx) {
                var range = ctx.workbook.worksheets.getActiveWorksheet().getRange(selector);
                range.load("address, values, range/format");
                return ctx.sync().then(function () {
                    data = range.values;
                });
            }).then(function () {
                deferred.resolve(data);
            }).catch(function (error) {
                deferrred.reject(error.message);
            });
            return deferred.promise
        },
        setRangeValues: function (selector, data) {
            var deferred = $q.defer();
            Excel.run(function (ctx) {
                var range = ctx.workbook.worksheets.getActiveWorksheet().getRange(selector);
                range.load("address, values, range/format");
                return ctx.sync().then(function () {
                    range.values = data;
                });
            }).then(function () {
                deferred.resolve(data);
            }).catch(function (error) {
                deferrred.reject(error.message);
            });
            return deferred.promise
        }
    };

}]);

//manually initialize ng app when office.js is ready
Office.initialize = function (reason) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ["HelloExcel2016"]);
    });
};






