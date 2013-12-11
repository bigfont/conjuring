using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyConjuringDbApi.Models
{
    public class Book
    {
        public int ID { get; set; }
        public int PublishYear { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public int AuthorID { get; set; }
        public int PublisherID { get; set; }
    }
}