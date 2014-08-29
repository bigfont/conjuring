using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ConjuringClub.ViewModels
{
    public class YouTubeVideoViewModel
    {
        public YouTubeVideoViewModel(string videoId, string videoTitle)
        {
            this.VideoId = videoId;
            this.VideoTitle = videoTitle;
        }
        public string VideoId { get; set; }
        public string VideoTitle { get; set; }
    }
}