using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Mvc;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ConjuringClub.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult YouTubeAuth()
        {            
            // implement this myself, with WebHttpRequests, or something like those.
            // see https://developers.google.com/youtube/v3/guides/authentication?hl=de
            // avoid using the .NET client libraries, because they don't work!

            return RedirectToAction("Index", "Home");
        }
    }
}
