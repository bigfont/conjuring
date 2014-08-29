using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyConjuringDbApi.ViewModels
{
    public class BookDetailsViewModel
    {
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Publisher { get; set; }
        public int PublishYear { get; set; }
        public string PublishLocation { get; set; }

    }
}