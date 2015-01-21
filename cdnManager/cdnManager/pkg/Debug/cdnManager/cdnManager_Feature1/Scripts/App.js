
(function () {
    "use strict";

    var customActions;
    var scripts;

    jQuery(function () {

       ko.applyBindings(cdnViewModel(),document.getElementById("resultsTable"));

        //Manage CDNs
        jQuery("#manageButton").click(function () {
            window.location = "../Lists/CDNs";
            return false;

        });

        //Inject CDNs
        jQuery("#injectButton").click(function () {

            //Clear dashboard
            ko.utils.arrayForEach(window.cdnEntries(), function (cdnEntry) {
                cdnEntry.Installed(false);
            })

            getUserCustomActions().then(
                function (data) {
                    //Retrieve all existing custom actions
                    customActions = data.value;
                    return getCDNList();
                }
            ).then(
                function (data) {
                    scripts = [];
                    var libraries = data.value;
                    for (var i = 0; i < libraries.length; i++) {

                        //Remove CDN if added previously
                        for (var x = 0; x < customActions.length; x++) {
                            if (customActions[x].Description === libraries[i].Title) {
                                removeCustomFunction(customActions[x].Id)
                            }
                        }

                        //Create the CDN code if active
                        if (libraries[i].Active === true) {

                            scripts[scripts.length] = {
                                "sequence": libraries[i].Sequence,
                                "description": libraries[i].Title,
                                "scriptBlock": "document.write(unescape(\"%3Cscript src='" + libraries[i].Url + "' type='text/javascript'%3E%3C/script%3E\"));"
                            }

                        }
                    }
                }
            ).done(
                function () {
                    //Add all of the active CDNs
                    var deferred = jQuery.Deferred();
                    deferred.resolve();
                    scripts.reduce(addUserCustomAction, deferred.promise());
                    SP.UI.Notify.addNotification("CDNs added to host web");
                }
            ).fail(
                function (err) {
                    alert(err);
                }
            )


            return false;

        });

        //Remove CDNs
        jQuery("#removeButton").click(function () {

            //Clear dashboard
            ko.utils.arrayForEach(window.cdnEntries(), function (cdnEntry) {
                cdnEntry.Installed(false);
            })

            getUserCustomActions().then(
                function (data) {
                    //Retrieve all existing custom actions
                    customActions = data.value;
                    return getCDNList();
                }
            ).then(
                function (data) {
                    //Remove all CDN references
                    var libraries = data.value;
                    for (var i = 0; i < libraries.length; i++) {

                        for (var x = 0; x < customActions.length; x++) {
                            if (customActions[x].Description === libraries[i].Title) {
                                removeCustomFunction(customActions[x].Id)
                            }
                        }

                    }
                }
            ).done(
                function () {
                    SP.UI.Notify.addNotification("CDNs removed from host web");
                }
            ).fail(
                function (err) {
                    alert(err);
                }
            )


            return false;

        });

    });

    function getCDNList() {
        return jQuery.ajax({
            url: "../_api/web/lists/getByTitle('CDNs')/items?$select=Id,Title,Url,Active,Sequence&$orderby=Sequence",
            headers: { "accept": "application/json" }
        });
    }

    function testCDN(cdnEntry) {

        //Try to download the JS file as JSONP
        //This will fail, but we can still tell if the file was actually at the specified endpoint
        jQuery.ajax({
            url: cdnEntry.Url,
            dataType: 'jsonp',
            success: function (data) {
                cdnEntry.Validated(true);
            },
            error: function (err) {
                if (err.status === 200) {
                    cdnEntry.Validated(true);
                }
                else {
                    cdnEntry.Validated(false);
                }
            }
        });
    }

    function getUserCustomActions() {

        var hostWebUrl = getqueryStringValue("SPHostUrl");
        var appWebUrl = getqueryStringValue("SPAppWebUrl");
        var executor = new SP.RequestExecutor(appWebUrl);
        var deferred = jQuery.Deferred();

        executor.executeAsync({
            url: "../_api/SP.AppContextSite(@target)/web/usercustomactions?$select=Id,Description&$filter=Location%20eq%20'ScriptLink'" +
                "&@target='" + hostWebUrl + "'",
            method: "GET",
            headers: { "accept": "application/json" },
            success: function (data) {
                deferred.resolve(JSON.parse(data.body));
            },
            error: function (err) {
                deferred.reject(JSON.parse(err.body)['odata.error'].message.value);
            }
        });

        return deferred.promise();
    }

    function addUserCustomAction(promise, script) {

        return promise.then(function (data) {
            var hostWebUrl = getqueryStringValue("SPHostUrl");
            var appWebUrl = getqueryStringValue("SPAppWebUrl");
            var executor = new SP.RequestExecutor(appWebUrl);
            var deferred = jQuery.Deferred();

            //Update UI
            ko.utils.arrayForEach(window.cdnEntries(), function (cdnEntry) {
                if (cdnEntry.Title === script.description) {
                    cdnEntry.Installed(true);
                }
            })

            //Add CDN to host web
            executor.executeAsync({
                url: "../_api/SP.AppContextSite(@target)/web/usercustomactions" +
                     "?@target='" + hostWebUrl + "'",
                method: "POST",
                body: JSON.stringify({
                    'Sequence': script.sequence,
                    'Description': script.description,
                    'Location': 'ScriptLink',
                    'ScriptBlock': script.scriptBlock
                }),
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    deferred.resolve(JSON.parse(data.body));
                },
                error: function (err) {
                    deferred.reject(JSON.parse(err.body)['odata.error'].message.value);
                }
            })

            return deferred.promise();
        });

    }

    function removeCustomFunction(Id) {
        var hostWebUrl = getqueryStringValue("SPHostUrl");
        var appWebUrl = getqueryStringValue("SPAppWebUrl");
        var executor = new SP.RequestExecutor(appWebUrl);

        executor.executeAsync({
            url: "../_api/SP.AppContextSite(@target)/web/usercustomactions(guid'" + Id + "')" +
                 "?@target='" + hostWebUrl + "'",
            method: "DELETE",
            headers: {
                "If-Match": "*",
                "accept": "application/json",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            }
        })

    }

    function getqueryStringValue (name) {
        try {
            var args = window.location.search.substring(1).split("&");
            var r = "";
            for (var i = 0; i < args.length; i++) {
                var n = args[i].split("=");
                if (n[0] == name)
                    r = decodeURIComponent(n[1]);
            }
            return r;
        }
        catch (err) {
            return undefined;
        }
    }

    function cdnViewModel() {

        window.cdnEntries = ko.observableArray();

        jQuery.when(getUserCustomActions(), getCDNList()).done(
            function (x1, x2) {
                var customActions = x1.value;
                var libraries = x2[0].value;
                for (var i = 0; i < libraries.length; i++) {
                    var installed = false;
                    for (var x = 0; x < customActions.length; x++) {
                        if (customActions[x].Description === libraries[i].Title) {
                            installed = true;
                        }
                    }

                    var cdnEntry = {
                        "Id": libraries[i].Id,
                        "Title": libraries[i].Title,
                        "Url": libraries[i].Url,
                        "Active": libraries[i].Active,
                        "Installed": ko.observable(installed),
                        "Validated": ko.observable(false),
                        "Sequence": libraries[i].Sequence

                    }
                    window.cdnEntries.push(cdnEntry);
                }

                ko.utils.arrayForEach(window.cdnEntries(), function (cdnEntry) {
                    testCDN(cdnEntry);
                })
            }
        );
    }

}());