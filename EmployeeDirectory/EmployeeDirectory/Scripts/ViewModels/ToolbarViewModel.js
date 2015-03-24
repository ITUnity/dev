window.EmployeeDirectory = window.EmployeeDirectory || {}
window.EmployeeDirectory.ViewModels = window.EmployeeDirectory.ViewModels || {}

window.EmployeeDirectory.Tab = function (t) {

    //private members
    var title = 'undefined',
        set_title = function (v) { title = v; },
        get_title = function () { return title; };

    //Constructor
    title = t;

    //public interface
    return {
        set_title: set_title,
        get_title: get_title
    };

};

window.EmployeeDirectory.ViewModels.Tab = function () {

    //private members
    //TODO : Demo 1. Create the Tabs
    tabs = [
        new EmployeeDirectory.Tab("A"),
        new EmployeeDirectory.Tab("B"),
        new EmployeeDirectory.Tab("C"),
        new EmployeeDirectory.Tab("D"),
        new EmployeeDirectory.Tab("E"),
        new EmployeeDirectory.Tab("F"),
        new EmployeeDirectory.Tab("G"),
        new EmployeeDirectory.Tab("H"),
        new EmployeeDirectory.Tab("I"),
        new EmployeeDirectory.Tab("J"),
        new EmployeeDirectory.Tab("K"),
        new EmployeeDirectory.Tab("L"),
        new EmployeeDirectory.Tab("M"),
        new EmployeeDirectory.Tab("N"),
        new EmployeeDirectory.Tab("O"),
        new EmployeeDirectory.Tab("P"),
        new EmployeeDirectory.Tab("Q"),
        new EmployeeDirectory.Tab("R"),
        new EmployeeDirectory.Tab("S"),
        new EmployeeDirectory.Tab("T"),
        new EmployeeDirectory.Tab("U"),
        new EmployeeDirectory.Tab("V"),
        new EmployeeDirectory.Tab("W"),
        new EmployeeDirectory.Tab("X"),
        new EmployeeDirectory.Tab("Y"),
        new EmployeeDirectory.Tab("Z")
    ],
    get_tabs = function () { return tabs; },
    bind_controls = function () {

        //click event for the tabs
        $(".tab").bind("click", function (e) {

            $("#resultsTable").hide();
            $("#resultsLoading").show();

            //Update style for selected tab
            $(".tab-tableCellSelected").addClass("tab-tableCellUnselected").removeClass("tab-tableCellSelected");
            $(e.target).parent().parent().addClass("tab-tableCellSelected").removeClass("tab-tableCellUnselected");

            //TODO : 2. Bind the view model
            EmployeeDirectory.ViewModels.Contact.set_query($(e.target).text());
            EmployeeDirectory.ViewModels.Contact.load();

            //Set the actions bar
            
            //$(".srch-action").hide();
            
            //$("div.srch-result").live("click", function () {
            //    if ($(this).children("div.srch-action").is(":hidden")) {
            //        $(this).children("div.srch-action").show("slow");
            //    } else {
            //        $(this).children("div.srch-action").slideUp();
            //    }
            //});




            $("#resultsLoading").hide();
            $("#resultsTable").show();
            
        });
    };

    //public interface
    return {
        get_tabs: get_tabs,
        bind_controls: bind_controls
    };
        
}();