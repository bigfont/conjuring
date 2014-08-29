using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ConjuringClub.ViewModels;

namespace ConjuringClub.Controllers
{
    public class YouTubeController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<YouTubeVideoViewModel> Get()
        {
            List<YouTubeVideoViewModel> videos = new List<YouTubeVideoViewModel>();
            return videos;
        }
    }
}
