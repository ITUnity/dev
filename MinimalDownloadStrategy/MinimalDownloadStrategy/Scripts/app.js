
var MDS = window.MDS || {};
MDS.Utility = function () {

    "use strict";
    var site;
    var init = function () {
        getMDS();
    };

    var getMDS = function () {
        var ctx = new SP.ClientContext.get_current();
        site = ctx.get_web();
        ctx.load(site)
        ctx.executeQueryAsync(
            function () {
                if (!site.get_enableMinimalDownload()) {
                    setMDS();
                }
            },
            function () {
                console.log(arguments[1].get_message());
            }
        );
    };

    var setMDS = function () {
        //mds
        var ctx = new SP.ClientContext.get_current();
        site = ctx.get_web();
        site.set_enableMinimalDownload(true);
        site.update();

        //wingtip library
        var script1 = "" +
            "Type.registerNamespace('wingtip');" +
            "(function $_global_wingtip() {" +
            "  console.log('$_global_wingtip called');" +
            "  wingtip = function () {" +
            "    'use strict';" +
            "    var init = function () {" +
            "      console.log('wingtip.init called');" +
            "      return 'MDS is enabled on this page!';" +
            "    };" +
            "    return {" +
            "      init: init" +
            "    };" +
            "  }();" +
            "}());";
        var userCustomActions = site.get_userCustomActions();
        var scriptLink1 = userCustomActions.add();
        scriptLink1.set_location("ScriptLink");
        scriptLink1.set_sequence(1);
        scriptLink1.set_title("wingtip library");
        scriptLink1.set_scriptBlock(script1);
        scriptLink1.update();

        //app
        var script2 = "" +
            "if(typeof(document.getElementById('message')) !== 'undefined' && document.getElementById('message')!==null){" +
            "    document.getElementById('message').innerText = wingtip.init();" +
            "}" +
            "else{" +
            "    console.log('MDS is not working on this page!')" +
            "}";
        var scriptLink2 = userCustomActions.add();
        scriptLink2.set_location("ScriptLink");
        scriptLink2.set_sequence(10);
        scriptLink2.set_title("app code");
        scriptLink2.set_scriptBlock(script2);
        scriptLink2.update();

        ctx.executeQueryAsync(
            function () {
                console.log("Script Link added and MDS enabled");
                document.getElementById("message").innerText = "Script Link added and MDS Enabled!";
                console.assert(typeof (wingtip) !== 'undefined', "wingtip is undefined");
            },
            function () {
                console.log(arguments[1].get_message());
            }
        );
    };


    return {
        init: init
    };

}();

(function () {
    MDS.Utility.init();
}());


//Notify script is loaded
console.log("app.js loaded");
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("app.js");
