var Jslink = window.Jslink || {};
Jslink.App = angular.module('jsLink', []);

Jslink.Helpers = function () {

    "use strict";

    var isSiteAdmin = function () {
        var deferred = $.Deferred();
        var ctx = new SP.ClientContext.get_current();
        this.user = ctx.get_web().get_currentUser();
        ctx.load(this.user, 'IsSiteAdmin');
        ctx.executeQueryAsync(
            Function.createDelegate(this,
                function () { deferred.resolve(this.user.get_isSiteAdmin()); }),
            Function.createDelegate(this,
                function (sender, args) { deferred.reject(args.get_message()); })
        );
        return deferred.promise();

    };

    var getAppWebServerRelativeUrl = function () {
        var deferred = $.Deferred();
        var ctx = new SP.ClientContext.get_current();
        this.web = ctx.get_web();
        ctx.load(this.web, 'ServerRelativeUrl');
        ctx.executeQueryAsync(
            Function.createDelegate(this,
                function () { deferred.resolve(this.web.get_serverRelativeUrl()); }),
            Function.createDelegate(this,
                function (sender, args) { deferred.reject(args.get_message()); })
        );
        return deferred.promise();

    };

    var readFile = function (filename) {
        var deferred = $.Deferred();
        jQuery.ajax({
            url: filename,
            dataType: "script",
            success: function (data) {
                deferred.resolve(data);
            },
            error: function (err) {
                if (err.status === 200) {
                    deferred.reject("Error parsing JavaScript file " + filename);
                }
                else {
                    deferred.reject("Error reading JSLink file. " + err.responseText);
                }
            }
        });
        return deferred.promise();
    };

    var upload = function (appWebServerRelativeUrl, filename, contents) {
        var deferred = $.Deferred();
        var ctx = new SP.ClientContext.get_current();
        var createInfo = new SP.FileCreationInformation();
        createInfo.set_content(contents);
        createInfo.set_overwrite(true);
        createInfo.set_url(filename);
        this.files = ctx.get_web().getFolderByServerRelativeUrl(appWebServerRelativeUrl + "/_catalogs/masterpage").get_files();
        ctx.load(this.files);
        this.files.add(createInfo);
        ctx.executeQueryAsync(
            Function.createDelegate(this,
                function () { deferred.resolve(); }),
            Function.createDelegate(this,
                function (sender, args) { deferred.reject("Error uploading JSLink file to gallery. " + args.get_message()); })
        );
        return deferred.promise();
    };

    var get_list = function (listName) {
        var deferred = $.Deferred();
        var ctx = new SP.ClientContext.get_current();
        this.list = ctx.get_web().get_lists().getByTitle(listName);
        ctx.load(this.list, 'DefaultEditFormUrl', 'DefaultNewFormUrl', 'DefaultDisplayFormUrl', 'DefaultViewUrl');
        ctx.executeQueryAsync(
            Function.createDelegate(this,
                function () { deferred.resolve(this.list); }),
            Function.createDelegate(this,
                function (sender, args) { deferred.reject("Error getting list form URLs. " + args.get_message()); })
         );

        return deferred.promise();
    };

    var get_file = function (serverRelativeUrl) {
        var deferred = $.Deferred();
        var ctx = new SP.ClientContext.get_current();
        this.file = ctx.get_web().getFileByServerRelativeUrl(serverRelativeUrl);
        ctx.executeQueryAsync(
            Function.createDelegate(this,
                function () { deferred.resolve(this.file); }),
            Function.createDelegate(this,
                function (sender, args) { deferred.reject("Error getting list form files. " + args.get_message()); })
         );
        return deferred.promise();
    };

    var get_webParts = function (file) {
        var deferred = $.Deferred();
        var ctx = new SP.ClientContext.get_current();
        this.manager = file.getLimitedWebPartManager(1);
        this.webParts = this.manager.get_webParts();
        ctx.load(this.webParts);
        ctx.executeQueryAsync(
            Function.createDelegate(this,
                function () { deferred.resolve(this.webParts); }),
            Function.createDelegate(this,
                function (sender, args) { deferred.reject("Error getting web parts on list form page. " + args.get_message()); })
         );
        return deferred.promise();
    };

    var get_properties = function (webPartDef) {
        var deferred = $.Deferred();
        var ctx = new SP.ClientContext.get_current();
        this.webPartDef = webPartDef;
        this.props = this.webPartDef.get_webPart().get_properties();
        ctx.load(this.props);
        ctx.executeQueryAsync(
            Function.createDelegate(this,
                function () { deferred.resolve(this.webPartDef, this.props); }),
            Function.createDelegate(this,
                function (sender, args) { deferred.reject("Error getting web part properties. " + args.get_message()); })
         );
        return deferred.promise();
    };

    var set_property = function (webPartDef, properties, key, value) {
        var deferred = $.Deferred();
        var ctx = new SP.ClientContext.get_current();
        properties.set_item(key, value);
        webPartDef.saveWebPartChanges();
        ctx.executeQueryAsync(
            Function.createDelegate(this,
                function () { deferred.resolve(); }),
            Function.createDelegate(this,
                function (sender, args) { deferred.reject("Error setting JSLink property on web part. " + args.get_message()); })
         );
        return deferred.promise();
    };

    return {
        isSiteAdmin: isSiteAdmin,
        getAppWebServerRelativeUrl: getAppWebServerRelativeUrl,
        readFile: readFile,
        upload: upload,
        get_list: get_list,
        get_file: get_file,
        get_webParts: get_webParts,
        get_properties: get_properties,
        set_property: set_property
    };

}();

Jslink.App.provider("jsLinkService", {

    isSiteAdmin: function () {

        "use strict";

        var deferred = $.Deferred();

        Jslink.Helpers.isSiteAdmin().then(
            function (flag) {
                deferred.resolve(flag);
            },
            function (err) {
                deferred.reject(err);
            }
        );

        return deferred.promise();

    },

    set_jsLink: function (listName, formType, filePath, skipUpload) {

        "use strict";

        var deferred = $.Deferred();
        var getAppWebServerRelativeUrl = "";
        var filename = filePath.split('/')[filePath.split('/').length - 1];
        if (typeof (skipUpload) === 'undefined') {
            skipUpload = false;
        }

        Jslink.Helpers.getAppWebServerRelativeUrl().then(function (serverRelativeUrl) {

            getAppWebServerRelativeUrl = serverRelativeUrl;

            if (!skipUpload) {
                return Jslink.Helpers.readFile(filePath);
            }
            else {
                return Jslink.Helpers.getAppWebServerRelativeUrl();
            }
        }).then(function (data) {

            if (!skipUpload) {
                var contents = new SP.Base64EncodedByteArray();

                var buffer = [];
                for (var i = 0; i < data.length; ++i) {
                    buffer.push(data.charCodeAt(i));
                }
                var bytes = new Uint8Array(buffer);
                for (var b = 0; b < bytes.length; b++) {
                    contents.append(bytes[b]);
                }

                return Jslink.Helpers.upload(getAppWebServerRelativeUrl, filename, contents);
            }
            else {
                return Jslink.Helpers.getAppWebServerRelativeUrl();
            }

        }).then(function () {
            return Jslink.Helpers.get_list(listName);
        }).then(function (list) {
            var formUrl = "";
            switch (formType) {
                case "EDIT":
                    formUrl = list.get_defaultEditFormUrl();
                    break;
                case "NEW":
                    formUrl = list.get_defaultNewFormUrl();
                    break;
                case "DISPLAY":
                    formUrl = list.get_defaultDisplayFormUrl();
                    break;
                case "VIEW":
                    formUrl = list.get_defaultViewUrl();
                    break;
            }
            return Jslink.Helpers.get_file(formUrl);
        }).then(function (file) {
            return Jslink.Helpers.get_webParts(file);
        }).then(function (webParts) {
            return Jslink.Helpers.get_properties(webParts.itemAt(0));
        }).then(function (webPartDef, props) {
            return Jslink.Helpers.set_property(webPartDef, props, "JSLink", "~site/_catalogs/masterpage/" + filename);
        }).fail(function (message) {
            deferred.reject(message);
        }).done(function () {
            deferred.resolve();
        });

        return deferred.promise();
    },

    $get: function () {
        return false;
    }
});

