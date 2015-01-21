using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Office365.Discovery;
using Microsoft.Office365.OutlookServices;
using O365SharePointAppWeb.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace O365SharePointAppWeb.Controllers
{

    public class MyEventsController : Controller
    {
        [SharePointContextFilter]
        public ActionResult Index()
        {
            List<MyEvent> eventList = GetFromCache("Events") as List<MyEvent>;
            if (eventList == null)
            {
                //Redirect to app web for authentication
                return Redirect(SharePointContextProvider.Current.GetSharePointContext(HttpContext).SPAppWebUrl.ToString());
            }
            else
            {
                //Show contacts
                return View(eventList);
            }

        }

        private void SaveInCache(string name, object value)
        {
            System.Web.HttpContext.Current.Session[name] = value;
        }
        private object GetFromCache(string name)
        {
            return System.Web.HttpContext.Current.Session[name];
        }
        private void RemoveFromCache(string name)
        {
            System.Web.HttpContext.Current.Session.Remove(name);
        }
    }
}
