using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ConjuringClub.ViewModels
{
    public class MemberViewModel
    {
        public string HeadshotSrc { get; set; }
        public string About { get; set; }
        public string FirstName { get; set; }

        public MemberViewModel(string headshotSrc, string firstName, string about)
        {
            this.HeadshotSrc = headshotSrc;
            this.FirstName = firstName;
            this.About = about;
        }
    }
}