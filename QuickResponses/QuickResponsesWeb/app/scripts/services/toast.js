myapp.factory("toastService", [function () {

    "use strict";

    var info = function (message) {
        toastr.options = { "positionClass": "toast-bottom-right" };
        toastr.info(message);
    };

    var success = function (message) {
        toastr.options = { "positionClass": "toast-bottom-right" };
        toastr.success(message);
    };

    var error = function (message) {
        toastr.options = { "positionClass": "toast-bottom-right" };
        toastr.error(message);
    };

    return {
        info: info,
        success: success,
        error: error
    };

}]);