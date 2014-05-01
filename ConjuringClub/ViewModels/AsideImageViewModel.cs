using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ConjuringClub.ViewModels
{
    public class AsideImageViewModel
    {
        public string Src { get; set; }
        public string FigCaption { get; set; }
        public AsideImageViewModel(string src, string figCaption)
        {
            this.Src = src;
            this.FigCaption = figCaption;
        }
    }
}