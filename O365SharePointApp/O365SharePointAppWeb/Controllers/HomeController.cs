using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Office365.Discovery;
using Microsoft.Office365.OutlookServices;
using Microsoft.SharePoint.Client;
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
    public class HomeController : Controller
    {
        private const string spSite = "https://[tenancy].sharepoint.com";
        private const string discoResource = "https://api.office.com/discovery/";
        private const string discoEndpoint = "https://api.office.com/discovery/v1.0/me/";

        public async Task<ActionResult> Index(string code)
        {
            List<MyEvent> eventList = new List<MyEvent>();

            AuthenticationContext authContext = new AuthenticationContext(
               ConfigurationManager.AppSettings["ida:AuthorizationUri"] + "/common",
               true);

            ClientCredential creds = new ClientCredential(
                ConfigurationManager.AppSettings["ida:ClientID"],
                ConfigurationManager.AppSettings["ida:Password"]);

            DiscoveryClient disco = GetFromCache("DiscoveryClient") as DiscoveryClient;
            CapabilityDiscoveryResult eventsDisco =GetFromCache("EventsDiscovery") as CapabilityDiscoveryResult;

            //Redirect to login page if we do not have an 
            //authorization code for the Discovery service
            if (disco == null && code == null)
            {
                Uri redirectUri = authContext.GetAuthorizationRequestURL(
                    discoResource,
                    creds.ClientId,
                    new Uri(Request.Url.AbsoluteUri.Split('?')[0]),
                    UserIdentifier.AnyUser,
                    string.Empty);

                return Redirect(redirectUri.ToString());
            }

            //Create a DiscoveryClient using the authorization code
            if (disco == null && code != null)
            {

                disco = new DiscoveryClient(new Uri(discoEndpoint), async () =>
                {

                    var authResult = await authContext.AcquireTokenByAuthorizationCodeAsync(
                        code,
                        new Uri(Request.Url.AbsoluteUri.Split('?')[0]),
                        creds);

                    return authResult.AccessToken;
                });

            }

            if (disco != null && code != null & eventsDisco == null)
            {

                //Discover required capabilities
                eventsDisco = await disco.DiscoverCapabilityAsync("Calendar");
                SaveInCache("EventsDiscovery", eventsDisco);

                code = null;

                //Get authorization code for the calendar
                Uri redirectUri = authContext.GetAuthorizationRequestURL(
                    eventsDisco.ServiceResourceId,
                    creds.ClientId,
                    new Uri(Request.Url.AbsoluteUri.Split('?')[0]),
                    UserIdentifier.AnyUser,
                    string.Empty);

                return Redirect(redirectUri.ToString());
            }

            //Get the calendar events
            if (disco != null && code != null & eventsDisco != null)
            {
                OutlookServicesClient outlookClient = new OutlookServicesClient(eventsDisco.ServiceEndpointUri, async () =>
                {

                    var authResult = await authContext.AcquireTokenByAuthorizationCodeAsync(
                        code,
                        new Uri(Request.Url.AbsoluteUri.Split('?')[0]),
                        creds);

                    return authResult.AccessToken;
                });

                //Get the events for the next 8 hours
                var eventResults = await (from i in outlookClient.Me.Events
                                          where i.End >= DateTimeOffset.UtcNow && i.End <= DateTimeOffset.UtcNow.AddHours(8)
                                          select i).Take(5).ExecuteAsync();
                var events = eventResults.CurrentPage.OrderBy(e => e.Start);

                foreach (var e in events)
                {
                    eventList.Add(new MyEvent
                    {
                        Id = e.Id,
                        Body = e.Body == null ? string.Empty : e.Body.Content,
                        End = e.End,
                        Location = e.Location == null ? string.Empty : e.Location.DisplayName,
                        Start = e.Start,
                        Subject = e.Subject == null ? string.Empty : e.Subject

                    });
                }

                //cache the events
                SaveInCache("Events", eventList);
            }

            return View();

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
