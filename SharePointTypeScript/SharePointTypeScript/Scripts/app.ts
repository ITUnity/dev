/// <reference path="typings/SharePoint/SharePoint.d.ts"/>
/// <reference path="typings/jQuery/jquery.d.ts"/>
/// <reference path="typings/knockout/knockout.d.ts"/>

module Wingtip { //Namespace

    interface WelcomeData {
        pictureUrl: string;
        displayName: string;
    }

    export class Welcome {

        //Private members
        private static displayName: string = "";
        private static pictureUrl: string = "";

        //Public methods
        public static get_viewModel(): WelcomeData {
            return {
                "pictureUrl": Welcome.pictureUrl,
                "displayName": Welcome.displayName
            };
        }

        public static init(): JQueryXHR {

            return jQuery.ajax(
                {
                    url: "../_api/SP.UserProfiles.PeopleManager/GetMyProperties",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                    },
                    success: (data: any, status: string, jqXHR: JQueryXHR) => {
                        Welcome.displayName = data.d.DisplayName;
                        Welcome.pictureUrl = data.d.PictureUrl;
                    }
                }
                );
        }

    }
}

//knockout binding
jQuery(function () {
    Wingtip.Welcome.init().then(
        (data: any) => {
            ko.applyBindings(Wingtip.Welcome.get_viewModel());
        },
        (jqXHR: JQueryXHR, status: string, message: string) => {
            alert(message);
        }
        );
});
