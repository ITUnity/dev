using System;
using System.Web;
using System.Web.Mvc;
using Microsoft.SharePoint.Client;

//Must be in the same namespace as SharePointContextFilterAttribute
namespace SharePointPermissionFiltersWeb
{
    public class SharePointEffectivePermissionsFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext == null)
            {
                throw new ArgumentNullException("filterContext");
            }

            if (SharePointPermissionsProvider.Current == null)
            {
                SharePointPermissionsProvider.NewProvider(filterContext.HttpContext);
            }

        }
    }

}