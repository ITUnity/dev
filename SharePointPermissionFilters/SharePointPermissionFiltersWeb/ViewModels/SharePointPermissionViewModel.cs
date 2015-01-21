using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SharePointPermissionFiltersWeb.ViewModels
{
    public class SharePointPermissionViewModel
    {
        public string userTitle { get; set; }
        public string userLogin { get; set; }
        public string webTitle { get; set; }
        public string webUrl { get; set; }
        public bool hasViewListItems { get; set; }
        public bool hasAddListItems { get; set; }
        public bool hasEditListItems { get; set; }
        public bool hasDeleteListItems { get; set; }
        public bool hasApproveItems { get; set; }
        public bool hasOpenItems { get; set; }
        public bool hasViewVersions { get; set; }
        public bool hasDeleteVersions { get; set; }
        public bool hasCancelCheckout { get; set; }
        public bool hasManagePersonalViews { get; set; }
        public bool hasManageLists { get; set; }
        public bool hasViewFormPages { get; set; }
        public bool hasAnonymousSearchAccessList { get; set; }
        public bool hasOpen { get; set; }
        public bool hasViewPages { get; set; }
        public bool hasAddAndCustomizePages { get; set; }
        public bool hasApplyThemeAndBorder { get; set; }
        public bool hasApplyStyleSheets { get; set; }
        public bool hasViewUsageData { get; set; }
        public bool hasCreateSSCSite { get; set; }
        public bool hasManageSubwebs { get; set; }
        public bool hasCreateGroups { get; set; }
        public bool hasManagePermissions { get; set; }
        public bool hasBrowseDirectories { get; set; }
        public bool hasBrowseUserInfo { get; set; }
        public bool hasAddDelPrivateWebParts { get; set; }
        public bool hasUpdatePersonalWebParts { get; set; }
        public bool hasManageWeb { get; set; }
        public bool hasAnonymousSearchAccessWebLists { get; set; }
        public bool hasUseClientIntegration { get; set; }
        public bool hasUseRemoteAPIs { get; set; }
        public bool hasManageAlerts { get; set; }
        public bool hasCreateAlerts { get; set; }
        public bool hasEditMyUserInfo { get; set; }
        public bool hasEnumeratePermissions { get; set; }
    }
}