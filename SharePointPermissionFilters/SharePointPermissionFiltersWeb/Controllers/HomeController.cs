using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SharePointPermissionFiltersWeb.ViewModels;

namespace SharePointPermissionFiltersWeb.Controllers
{

    [SharePointContextFilter]
    public class HomeController : Controller
    {
        [SharePointEffectivePermissionsFilter]
        public ActionResult Index()
        {
            SharePointPermissionViewModel viewModel = new SharePointPermissionViewModel();
            viewModel.userLogin = SharePointPermissionsProvider.Current.userLogin;
            viewModel.userTitle = SharePointPermissionsProvider.Current.userTitle;
            viewModel.webUrl = SharePointPermissionsProvider.Current.webUrl;
            viewModel.webTitle = SharePointPermissionsProvider.Current.webTitle;
            viewModel.hasViewListItems = SharePointPermissionsProvider.Current.hasViewListItems;
            viewModel.hasAddListItems = SharePointPermissionsProvider.Current.hasAddListItems;
            viewModel.hasEditListItems = SharePointPermissionsProvider.Current.hasEditListItems;
            viewModel.hasDeleteListItems = SharePointPermissionsProvider.Current.hasDeleteListItems;
            viewModel.hasApproveItems = SharePointPermissionsProvider.Current.hasApproveItems;
            viewModel.hasOpenItems = SharePointPermissionsProvider.Current.hasOpenItems;
            viewModel.hasViewVersions = SharePointPermissionsProvider.Current.hasViewVersions;
            viewModel.hasDeleteVersions = SharePointPermissionsProvider.Current.hasDeleteVersions;
            viewModel.hasCancelCheckout = SharePointPermissionsProvider.Current.hasCancelCheckout;
            viewModel.hasManagePersonalViews = SharePointPermissionsProvider.Current.hasManagePersonalViews;
            viewModel.hasManageLists = SharePointPermissionsProvider.Current.hasManageLists;
            viewModel.hasViewFormPages = SharePointPermissionsProvider.Current.hasViewFormPages;
            viewModel.hasAnonymousSearchAccessList = SharePointPermissionsProvider.Current.hasAnonymousSearchAccessList;
            viewModel.hasOpen = SharePointPermissionsProvider.Current.hasOpen;
            viewModel.hasViewPages = SharePointPermissionsProvider.Current.hasViewPages;
            viewModel.hasAddAndCustomizePages = SharePointPermissionsProvider.Current.hasAddAndCustomizePages;
            viewModel.hasApplyThemeAndBorder = SharePointPermissionsProvider.Current.hasApplyThemeAndBorder;
            viewModel.hasApplyStyleSheets = SharePointPermissionsProvider.Current.hasApplyStyleSheets;
            viewModel.hasViewUsageData = SharePointPermissionsProvider.Current.hasViewUsageData;
            viewModel.hasCreateSSCSite = SharePointPermissionsProvider.Current.hasCreateSSCSite;
            viewModel.hasManageSubwebs = SharePointPermissionsProvider.Current.hasManageSubwebs;
            viewModel.hasCreateGroups = SharePointPermissionsProvider.Current.hasCreateGroups;
            viewModel.hasManagePermissions = SharePointPermissionsProvider.Current.hasManagePermissions;
            viewModel.hasBrowseDirectories = SharePointPermissionsProvider.Current.hasBrowseDirectories;
            viewModel.hasBrowseUserInfo = SharePointPermissionsProvider.Current.hasBrowseUserInfo;
            viewModel.hasAddDelPrivateWebParts = SharePointPermissionsProvider.Current.hasAddDelPrivateWebParts;
            viewModel.hasUpdatePersonalWebParts = SharePointPermissionsProvider.Current.hasUpdatePersonalWebParts;
            viewModel.hasManageWeb = SharePointPermissionsProvider.Current.hasManageWeb;
            viewModel.hasAnonymousSearchAccessWebLists = SharePointPermissionsProvider.Current.hasAnonymousSearchAccessWebLists;
            viewModel.hasUseClientIntegration = SharePointPermissionsProvider.Current.hasUseClientIntegration;
            viewModel.hasUseRemoteAPIs = SharePointPermissionsProvider.Current.hasUseRemoteAPIs;
            viewModel.hasManageAlerts = SharePointPermissionsProvider.Current.hasManageAlerts;
            viewModel.hasCreateAlerts = SharePointPermissionsProvider.Current.hasCreateAlerts;
            viewModel.hasEditMyUserInfo = SharePointPermissionsProvider.Current.hasEditMyUserInfo;
            viewModel.hasEnumeratePermissions = SharePointPermissionsProvider.Current.hasEnumeratePermissions;

            return View(viewModel);
        }

        [SharePointPermissionsAuthorization(PermissionKind.ManageLists)]
        public ActionResult ManageLists()
        {
            List<SharePointListCollectionModel> listModels = new List<SharePointListCollectionModel>();

            var spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext);

            using (var clientContext = spContext.CreateUserClientContextForSPHost())
            {
                if (clientContext != null)
                {
                    clientContext.Load(clientContext.Web, w => w.Lists.Include(l => l.Title, l => l.DefaultViewUrl).Where(l => l.Hidden == false));
                    clientContext.ExecuteQuery();

                    foreach (List list in clientContext.Web.Lists)
                    {
                        SharePointListCollectionModel listModel = new SharePointListCollectionModel();
                        listModel.Title = list.Title;
                        listModel.Url = list.DefaultViewUrl;
                        listModels.Add(listModel);
                    }
                }
            }
            ViewBag.ListModels = listModels;
            return View();

        }

    }
}
