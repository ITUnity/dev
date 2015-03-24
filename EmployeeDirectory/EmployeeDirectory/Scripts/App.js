//namespaces
window.EmployeeDirectory = window.EmployeeDirectory || {}
window.EmployeeDirectory.ViewModels = window.EmployeeDirectory.ViewModels || {}

$(document).ready(function () {
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () { startApp(); });
});

function startApp() {

    //Draw tabs
    ko.applyBindings(EmployeeDirectory.ViewModels.Tab, $get("toolbarRow"));
    ko.applyBindings(EmployeeDirectory.ViewModels.Contact, $get("resultsTable"));

    //Bind tab events
    EmployeeDirectory.ViewModels.Tab.bind_controls();

    //Hide Loading image
    $("#resultsLoading").hide();
}

