jQuery(function () {

    //authorization context
    var resource = 'https://[your tenancy].sharepoint.com';
    var endpoint = 'https://[your genancy].sharepoint.com/_api/web';

    var authContext = new AuthenticationContext({
        instance: 'https://login.microsoftonline.com/',
        tenant: '[your tenancy].onmicrosoft.com',
        clientId: '[your client id]',
        postLogoutRedirectUri: window.location.origin,
        cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
    });

    //sign in and out
    jQuery("#signInLink").click(function () {
        authContext.login();
    });
    jQuery("#signOutLink").click(function () {
        authContext.logOut();
    });

    //save tokens if this is a return from AAD
    authContext.handleWindowCallback();

    var user = authContext.getCachedUser();
    if (user) {  //successfully logged in

        //welcome user
        jQuery("#loginMessage").text("Welcome, " + user.userName);
        jQuery("#signInLink").hide();
        jQuery("#signOutLink").show();

        //call rest endpoint
        authContext.acquireToken(resource, function (error, token) {

            if (error || !token) {
                jQuery("#loginMessage").text('ADAL Error Occurred: ' + error);
                return;
            }

            $.ajax({
                type: 'GET',
                url: endpoint,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            }).done(function (data) {
                jQuery("#loginMessage").text('The name of the SharePoint site is: ' + data.Title);
            }).fail(function (err) {
                jQuery("#loginMessage").text('Error calling REST endpoint: ' + err.statusText);
            }).always(function () {
            });
        });

    }
    else if (authContext.getLoginError()) { //error logging in
        jQuery("#signInLink").show();
        jQuery("#signOutLink").hide();
        jQuery("#loginMessage").text(authContext.getLoginError());
    }
    else { //not logged in
        jQuery("#signInLink").show();
        jQuery("#signOutLink").hide();
        jQuery("#loginMessage").text("You are not logged in.");
    }

});

