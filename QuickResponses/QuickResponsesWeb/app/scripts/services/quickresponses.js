myapp.factory("responsesService", ["$http", function ($http) {

    "use strict";

    return {
        getQuickResponses: function () {
            return $http({
                url: "https://shillier.sharepoint.com/sites/appdev/_api/web/lists/getbyTitle('Quick%20Responses')/items",
                params: {
                    "$select": "Title"
                },
                method: "GET",
                headers: {
                    "accept": "application/json;odata=nometadata"
                }
            });
        }
    };

}]);