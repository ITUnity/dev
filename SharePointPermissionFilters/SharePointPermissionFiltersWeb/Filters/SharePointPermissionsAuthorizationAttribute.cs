using System;
using System.Web;
using System.Web.Mvc;
using Microsoft.SharePoint.Client;

namespace SharePointPermissionFiltersWeb
{
    public class SharePointPermissionsAuthorizationAttribute : AuthorizeAttribute
    {
        private readonly PermissionKind[] _permissions;

        public SharePointPermissionsAuthorizationAttribute(params PermissionKind[] permissions)
        {
            _permissions = permissions;
        }
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (SharePointPermissionsProvider.Current == null)
            {
                SharePointPermissionsProvider.NewProvider(filterContext.HttpContext);
            }
           
            if (_permissions.Length == 0)
                filterContext.Result = new ViewResult { ViewName = "Unauthorized" };

            foreach(PermissionKind permission in _permissions)
            {
                switch (permission)
                {
                    case PermissionKind.ViewListItems:
                        if (!SharePointPermissions.Current.hasViewListItems) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.AddListItems:
                        if (!SharePointPermissions.Current.hasAddListItems) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.EditListItems:
                        if (!SharePointPermissions.Current.hasEditListItems) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.DeleteListItems:
                        if (!SharePointPermissions.Current.hasDeleteListItems) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ApproveItems:
                        if (!SharePointPermissions.Current.hasApproveItems) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.OpenItems:
                        if (!SharePointPermissions.Current.hasOpenItems) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ViewVersions:
                        if (!SharePointPermissions.Current.hasViewVersions) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.CancelCheckout:
                        if (!SharePointPermissions.Current.hasCancelCheckout) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ManagePersonalViews:
                        if (!SharePointPermissions.Current.hasManagePersonalViews) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ManageLists:
                        if (!SharePointPermissions.Current.hasManageLists) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ViewFormPages:
                        if (!SharePointPermissions.Current.hasViewFormPages) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.AnonymousSearchAccessList:
                        if (!SharePointPermissions.Current.hasAnonymousSearchAccessList) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.Open:
                        if (!SharePointPermissions.Current.hasOpen) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ViewPages:
                        if (!SharePointPermissions.Current.hasViewPages) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.AddAndCustomizePages:
                        if (!SharePointPermissions.Current.hasAddAndCustomizePages) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ApplyThemeAndBorder:
                        if (!SharePointPermissions.Current.hasApplyThemeAndBorder) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ApplyStyleSheets:
                        if (!SharePointPermissions.Current.hasApplyStyleSheets) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ViewUsageData:
                        if (!SharePointPermissions.Current.hasViewUsageData) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.CreateSSCSite:
                        if (!SharePointPermissions.Current.hasCreateSSCSite) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ManageSubwebs:
                        if (!SharePointPermissions.Current.hasManageSubwebs) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.CreateGroups:
                        if (!SharePointPermissions.Current.hasCreateGroups) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ManagePermissions:
                        if (!SharePointPermissions.Current.hasManagePermissions) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.BrowseDirectories:
                        if (!SharePointPermissions.Current.hasBrowseDirectories) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.BrowseUserInfo:
                        if (!SharePointPermissions.Current.hasBrowseUserInfo) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.AddDelPrivateWebParts:
                        if (!SharePointPermissions.Current.hasAddDelPrivateWebParts) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.UpdatePersonalWebParts:
                        if (!SharePointPermissions.Current.hasUpdatePersonalWebParts) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ManageWeb:
                        if (!SharePointPermissions.Current.hasManageWeb) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.AnonymousSearchAccessWebLists:
                        if (!SharePointPermissions.Current.hasAnonymousSearchAccessWebLists) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.UseClientIntegration:
                        if (!SharePointPermissions.Current.hasUseClientIntegration) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.UseRemoteAPIs:
                        if (!SharePointPermissions.Current.hasUseRemoteAPIs) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.ManageAlerts:
                        if (!SharePointPermissions.Current.hasManageAlerts) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.CreateAlerts:
                        if (!SharePointPermissions.Current.hasCreateAlerts) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.EditMyUserInfo:
                        if (!SharePointPermissions.Current.hasEditMyUserInfo) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    case PermissionKind.EnumeratePermissions:
                        if (!SharePointPermissions.Current.hasEnumeratePermissions) { filterContext.Result = new ViewResult { ViewName = "Unauthorized" }; }
                        break;
                    default:
                        filterContext.Result = new ViewResult { ViewName = "Unauthorized" };
                        break;

                }
            }
        }
    }
}