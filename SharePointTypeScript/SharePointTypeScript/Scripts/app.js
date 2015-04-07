/// <reference path="typings/SharePoint/SharePoint.d.ts"/>
/// <reference path="typings/jQuery/jquery.d.ts"/>
/// <reference path="typings/knockout/knockout.d.ts"/>
var Wingtip;
(function (Wingtip) {
    var Welcome = (function () {
        function Welcome() {
        }
        //Public methods
        Welcome.get_viewModel = function () {
            return {
                "pictureUrl": Welcome.pictureUrl,
                "displayName": Welcome.displayName
            };
        };
        Welcome.init = function () {
            return jQuery.ajax({
                url: "../_api/SP.UserProfiles.PeopleManager/GetMyProperties",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                },
                success: function (data, status, jqXHR) {
                    Welcome.displayName = data.d.DisplayName;
                    Welcome.pictureUrl = data.d.PictureUrl;
                }
            });
        };
        //Private members
        Welcome.displayName = "";
        Welcome.pictureUrl = "";
        return Welcome;
    })();
    Wingtip.Welcome = Welcome;
})(Wingtip || (Wingtip = {}));
//knockout binding
jQuery(function () {
    Wingtip.Welcome.init().then(function (data) {
        ko.applyBindings(Wingtip.Welcome.get_viewModel());
    }, function (jqXHR, status, message) {
        alert(message);
    });
});
