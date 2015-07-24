DEMO.App.factory("profileService", ["$http", function ($http) {

    "use strict";

    var me = function () {
        return $http({
            url: "../_api/SP.UserProfiles.PeopleManager/GetMyProperties",
            params: {
                "$select": "DisplayName,AccountName"
            },
            method: "GET",
            headers: {
                "accept": "application/json"
            }
        });
    };

    return {
        me: me
    };

}]);