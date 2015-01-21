using System;
using System.Web;
using System.Web.Mvc;
using Microsoft.SharePoint.Client;

namespace SharePointPermissionFiltersWeb
{
    public class SharePointPermissions : SharePointPermissionsProvider
    {
        public SharePointPermissions(HttpContextBase httpContext)
        {
            var spContext = SharePointContextProvider.Current.GetSharePointContext(httpContext);

            User user = null;

            using (var clientContext = spContext.CreateUserClientContextForSPAppWeb())
            {
                user = clientContext.Web.CurrentUser;
                clientContext.Load(user, u => u.Title, u => u.LoginName);
                clientContext.ExecuteQuery();
            }

            using (var appContext = spContext.CreateAppOnlyClientContextForSPHost())
            {
                if (appContext != null)
                {
                    Web web = appContext.Web;
                    appContext.Load(web, w => w.Title, w => w.Url);
                    appContext.ExecuteQuery();

                    ClientResult<BasePermissions> perms = appContext.Web.GetUserEffectivePermissions(user.LoginName);
                    appContext.ExecuteQuery();

                    this._userLogin = user.LoginName;
                    this._userTitle = user.Title;
                    this._webUrl = web.Url;
                    this._webTitle = web.Title;
                    this._permViewListItems = perms.Value.Has(PermissionKind.ViewListItems);
                    this._permAddListItems = perms.Value.Has(PermissionKind.AddListItems);
                    this._permEditListItems = perms.Value.Has(PermissionKind.EditListItems);
                    this._permDeleteListItems = perms.Value.Has(PermissionKind.DeleteListItems);
                    this._permApproveItems = perms.Value.Has(PermissionKind.ApproveItems);
                    this._permOpenItems = perms.Value.Has(PermissionKind.OpenItems);
                    this._permViewVersions = perms.Value.Has(PermissionKind.ViewVersions);
                    this._permDeleteVersions = perms.Value.Has(PermissionKind.DeleteVersions);
                    this._permCancelCheckout = perms.Value.Has(PermissionKind.CancelCheckout);
                    this._permManagePersonalViews = perms.Value.Has(PermissionKind.ManagePersonalViews);
                    this._permManageLists = perms.Value.Has(PermissionKind.ManageLists);
                    this._permViewFormPages = perms.Value.Has(PermissionKind.ViewFormPages);
                    this._permAnonymousSearchAccessList = perms.Value.Has(PermissionKind.AnonymousSearchAccessList);
                    this._permOpen = perms.Value.Has(PermissionKind.Open);
                    this._permViewPages = perms.Value.Has(PermissionKind.ViewPages);
                    this._permAddAndCustomizePages = perms.Value.Has(PermissionKind.AddAndCustomizePages);
                    this._permApplyThemeAndBorder = perms.Value.Has(PermissionKind.ApplyThemeAndBorder);
                    this._permApplyStyleSheets = perms.Value.Has(PermissionKind.ApplyStyleSheets);
                    this._permViewUsageData = perms.Value.Has(PermissionKind.ViewUsageData);
                    this._permCreateSSCSite = perms.Value.Has(PermissionKind.CreateSSCSite);
                    this._permManageSubwebs = perms.Value.Has(PermissionKind.ManageSubwebs);
                    this._permCreateGroups = perms.Value.Has(PermissionKind.CreateGroups);
                    this._permManagePermissions = perms.Value.Has(PermissionKind.ManagePermissions);
                    this._permBrowseDirectories = perms.Value.Has(PermissionKind.BrowseDirectories);
                    this._permBrowseUserInfo = perms.Value.Has(PermissionKind.BrowseUserInfo);
                    this._permAddDelPrivateWebParts = perms.Value.Has(PermissionKind.AddDelPrivateWebParts);
                    this._permUpdatePersonalWebParts = perms.Value.Has(PermissionKind.UpdatePersonalWebParts);
                    this._permManageWeb = perms.Value.Has(PermissionKind.ManageWeb);
                    this._permAnonymousSearchAccessWebLists = perms.Value.Has(PermissionKind.AnonymousSearchAccessWebLists);
                    this._permUseClientIntegration = perms.Value.Has(PermissionKind.UseClientIntegration);
                    this._permUseRemoteAPIs = perms.Value.Has(PermissionKind.UseRemoteAPIs);
                    this._permManageAlerts = perms.Value.Has(PermissionKind.ManageAlerts);
                    this._permCreateAlerts = perms.Value.Has(PermissionKind.CreateAlerts);
                    this._permEditMyUserInfo = perms.Value.Has(PermissionKind.EditMyUserInfo);
                    this._permEnumeratePermissions = perms.Value.Has(PermissionKind.EnumeratePermissions);
                }
            }
        }
        private string _userTitle;
        private string _userLogin;
        private string _webTitle;
        private string _webUrl;
        private bool _permViewListItems;
        private bool _permAddListItems;
        private bool _permEditListItems;
        private bool _permDeleteListItems;
        private bool _permApproveItems;
        private bool _permOpenItems;
        private bool _permViewVersions;
        private bool _permDeleteVersions;
        private bool _permCancelCheckout;
        private bool _permManagePersonalViews;
        private bool _permManageLists;
        private bool _permViewFormPages;
        private bool _permAnonymousSearchAccessList;
        private bool _permOpen;
        private bool _permViewPages;
        private bool _permAddAndCustomizePages;
        private bool _permApplyThemeAndBorder;
        private bool _permApplyStyleSheets;
        private bool _permViewUsageData;
        private bool _permCreateSSCSite;
        private bool _permManageSubwebs;
        private bool _permCreateGroups;
        private bool _permManagePermissions;
        private bool _permBrowseDirectories;
        private bool _permBrowseUserInfo;
        private bool _permAddDelPrivateWebParts;
        private bool _permUpdatePersonalWebParts;
        private bool _permManageWeb;
        private bool _permAnonymousSearchAccessWebLists;
        private bool _permUseClientIntegration;
        private bool _permUseRemoteAPIs;
        private bool _permManageAlerts;
        private bool _permCreateAlerts;
        private bool _permEditMyUserInfo;
        private bool _permEnumeratePermissions;

        public string userTitle { get { return this._userTitle; } }
        public string userLogin { get { return this._userLogin; } }
        public string webTitle { get { return this._webTitle; } }
        public string webUrl { get { return this._webUrl; } }
        public bool hasViewListItems { get { return this._permViewListItems; } }
        public bool hasAddListItems { get { return this._permAddListItems; } }
        public bool hasEditListItems { get { return this._permEditListItems; } }
        public bool hasDeleteListItems { get { return this._permDeleteListItems; } }
        public bool hasApproveItems { get { return this._permApproveItems; } }
        public bool hasOpenItems { get { return this._permOpenItems; } }
        public bool hasViewVersions { get { return this._permViewVersions; } }
        public bool hasDeleteVersions { get { return this._permDeleteVersions; } }
        public bool hasCancelCheckout { get { return this._permCancelCheckout; } }
        public bool hasManagePersonalViews { get { return this._permManagePersonalViews; } }
        public bool hasManageLists { get { return this._permManageLists; } }
        public bool hasViewFormPages { get { return this._permViewFormPages; } }
        public bool hasAnonymousSearchAccessList { get { return this._permAnonymousSearchAccessList; } }
        public bool hasOpen { get { return this._permOpen; } }
        public bool hasViewPages { get { return this._permViewPages; } }
        public bool hasAddAndCustomizePages { get { return this._permAddAndCustomizePages; } }
        public bool hasApplyThemeAndBorder { get { return this._permApplyThemeAndBorder; } }
        public bool hasApplyStyleSheets { get { return this._permApplyStyleSheets; } }
        public bool hasViewUsageData { get { return this._permViewUsageData; } }
        public bool hasCreateSSCSite { get { return this._permCreateSSCSite; } }
        public bool hasManageSubwebs { get { return this._permManageSubwebs; } }
        public bool hasCreateGroups { get { return this._permCreateGroups; } }
        public bool hasManagePermissions { get { return this._permManagePermissions; } }
        public bool hasBrowseDirectories { get { return this._permBrowseDirectories; } }
        public bool hasBrowseUserInfo { get { return this._permBrowseUserInfo; } }
        public bool hasAddDelPrivateWebParts { get { return this._permAddDelPrivateWebParts; } }
        public bool hasUpdatePersonalWebParts { get { return this._permUpdatePersonalWebParts; } }
        public bool hasManageWeb { get { return this._permManageWeb; } }
        public bool hasAnonymousSearchAccessWebLists { get { return this._permAnonymousSearchAccessWebLists; } }
        public bool hasUseClientIntegration { get { return this._permUseClientIntegration; } }
        public bool hasUseRemoteAPIs { get { return this._permUseRemoteAPIs; } }
        public bool hasManageAlerts { get { return this._permManageAlerts; } }
        public bool hasCreateAlerts { get { return this._permCreateAlerts; } }
        public bool hasEditMyUserInfo { get { return this._permEditMyUserInfo; } }
        public bool hasEnumeratePermissions { get { return this._permEnumeratePermissions; } }
    }

    public abstract class SharePointPermissionsProvider
    {
        private static SharePointPermissionsProvider current;

        public static SharePointPermissions Current
        {
            get { return SharePointPermissionsProvider.current as SharePointPermissions; }
        }

        public static SharePointPermissionsProvider NewProvider(HttpContextBase httpContext)
        {
            SharePointPermissionsProvider.current = new SharePointPermissions(httpContext);
            return SharePointPermissionsProvider.current;
        }
    }

}